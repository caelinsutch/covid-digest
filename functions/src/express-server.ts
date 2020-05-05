import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as twilio from 'twilio';
import getCovidData, { CovidFacts } from './covid-facts';
import {sendUserStory} from './story.service';

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.auth_token;
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+19388370892'


const app = express();
app.use(cors({origin: true}));

/**
 * Send a text message
 * @param body {string}
 * @param to {string} E164 phone number
 */
export async function sendMessage(body: string, to: string) {
  return twilioClient.messages.create({
    body: body,
    from: twilioPhoneNumber,
    to: to,
  })
}

/**
 * Unsubscribe a user and delete all their data
 * @param userPhoneNumber
 */
function unsubscribeUser(userPhoneNumber: string) {
  sendMessage("You\'ve been unsubscribed!", userPhoneNumber)
    .then(() => {
      admin.auth().getUserByPhoneNumber(userPhoneNumber).then((user) => {
        admin.auth().deleteUser(user.uid).then(() => {
          console.log("User " + user.uid + " deleted in FireAuth!");
          admin.firestore().collection('users').doc(user.uid).delete().then(() => {
            console.log("User " + user.uid + " deleted in database!");
          })
        }).catch(e => {
          console.error(e);
        })
      }).catch(e => {
        console.error(e);
      })
    })
}

const helpMessage = `Commands:
"story": Get a random story
"stats": Get the most recent stats on COVID19

Questions? Contact us at https://covid-digest.com
`

/**
 * Handle incoming message post event
 */
app.post('/incoming-message', (req: any, res) => {
  const from: string = req.body.From;
  switch (req.body.Body.toLowerCase().trim()) {
    case "commands":
      sendMessage(helpMessage, from).then(() => res.end());
      break;
    case "cancel":
      unsubscribeUser(from);
      break;
    case "hello":
      sendMessage("Hello!", from).then(() => res.end());
      break;
    case "story":
      sendUserStory(from).then(() => res.end());
      break;
    case "stats":
    case "facts":
      getCovidData().then((data: CovidFacts) => {
        sendMessage(`Current Global COVID stats: 
😷 ${data.activeCases} - Active Cases 
☠ ${data.deaths} - Deaths 
🙂 ${data.recovered} - Recovered 
Last Updated ${data.lastUpdate} 
https://covid-digest.com`, from).then(() => res.end())
      })
      break;
    default:
      sendMessage("Command not found, type commands to see valid commands", from).then(() => res.end())
  }
})

export default app;

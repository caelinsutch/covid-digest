import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as twilio from 'twilio';
import getCovidData, { CovidFacts } from './covid-facts';

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.auth_token;
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+19388370892'


const app = express();
app.use(cors({origin: true}));

async function sendMessage(body: string, to: string) {
  return twilioClient.messages.create({
    body: body,
    from: twilioPhoneNumber,
    to: to,
  })
}

function unsubscribeUser(from: string) {
  sendMessage("You\'ve been unsubscribed!", from)
    .then(() => {
      admin.auth().getUserByPhoneNumber(from).then((user) => {
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

app.post('/incoming-message', (req: any, res) => {
  const from: string = req.body.From;
  switch (req.body.Body.toLowerCase()) {
    case "cancel":
      unsubscribeUser(from);
      break;
    case "hello":
      sendMessage("Hello!", from);
    case "stats":
    case "facts":
      getCovidData().then((data: CovidFacts) => {
        sendMessage(`Current Global COVID stats: \n😷 ${data.activeCases} - Active Cases \n☠ ${data.deaths} - Deaths \n🙂 ${data.recovered} - Recovered \nLast Updated ${data.lastUpdate} \nhttps://covid-digest.com`, from)
      })
  }
  res.end();
})

export default app;

import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as twilio from 'twilio';

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.auth_token;
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+19388370892'


const app = express();
app.use(cors({ origin: true }));

app.post('/incoming-message', (req, res) => {
  if (req.body.Body === "UNSUBSCRIBE") {
    twilioClient.messages.create({
      body: 'You\'ve been unsubscribed!',
      from: twilioPhoneNumber,
      to: req.body.From,
    })
      .then(() => {
        admin.auth().getUserByPhoneNumber(req.body.from).then((user) => {
          admin.auth().deleteUser(user.uid);
          console.log("User " + user.uid + " deleted in FireAuth!");
          admin.firestore().collection('users').doc(user.uid).delete().then(v => {
            console.log("User " + user.uid + " deleted in database!");
          })
        })
      })
  }
})

export default app;

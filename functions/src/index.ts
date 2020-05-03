import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as twilio from 'twilio';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { EventContext } from 'firebase-functions';
import getAllStories, { Story } from './scraper';

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.auth_token;
const client = twilio(accountSid, authToken);
admin.initializeApp();

// Validate E164 format
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function validE164(num: string): boolean {
  return /^\+?[1-9]\d{1,14}$/.test(num);
}

exports.sendWelcomeText = functions.firestore
  .document('users/{docId}')
  .onCreate((snap: DocumentSnapshot, context: EventContext) => {
    const newUser: any = snap.data();
    const phoneNumber: string = newUser.phoneNumber;
    if (validE164(phoneNumber)) {
      client.messages
        .create({
          body:
            'This is the ship that made the Kessel Run in fourteen parsecs?',
          from: '+19388370892',
          to: phoneNumber,
        })
        .then((message) => {
          snap.ref.update({
            welcomeMessageSent: true,
          });
        })
        .catch((e) => console.error(e));
    }
  });

exports.updateBBCStoriesList = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
  console.log("Compiling stories");
  return getAllStories().then((stories: Story[] )=> {
    admin.firestore().collection('news-stories').doc('bbc').set({
      stories: stories
    })
    return true;
  })
})

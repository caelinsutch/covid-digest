// @ts-ignore
import * as functions from 'firebase-functions';

import * as twilio from 'twilio';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.authToken;
const client = twilio(accountSid, authToken);


// Validate E164 format
// @ts-ignore
function validE164(num: string) {
  return /^\+?[1-9]\d{1,14}$/.test(num)
}

exports.sendWelcomeText = functions.firestore
  .document('users/{docId}')
  .onCreate((snap: DocumentSnapshot, context: EventContext) => {
    const newUser: any = snap.data();
    const phoneNumber: string = newUser.phoneNumber;
    if (validE164(phoneNumber)) {
      client.messages
        .create({
          body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
          from: '+19388370892',
          to: phoneNumber
        })
        .then(message => {
          snap.ref.update({
            welcomeMessageSent: true,
          })
        })
        .catch(e => console.error(e));
    }
  })


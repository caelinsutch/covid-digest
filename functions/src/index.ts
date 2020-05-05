import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as twilio from 'twilio';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import getAllStories, { Story } from './scraper';
import app from './express-server';
import {sendAllUsersStory} from './story.service';

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.auth_token;
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+19388370892'

admin.initializeApp();

// Validate E164 format
// @ts-ignore
function validE164(num: string): boolean {
  return /^\+?[1-9]\d{1,14}$/.test(num);
}

/**
 * Welcome new users with a text
 */
exports.sendWelcomeText = functions.firestore
  .document('users/{docId}')
  .onCreate((snap: DocumentSnapshot) => {
    const newUser: any = snap.data();
    const phoneNumber: string = newUser.phoneNumber;
    if (validE164(phoneNumber)) {
      return twilioClient.messages
        .create({
          body:
            '😷 Welcome to COVID19 News Updates 😷 \n' +
            'Updates are delivered every few days, if you would like to unsubscribe type UNSUBSCRIBE. View commands by typing commands',
          from: twilioPhoneNumber,
          to: phoneNumber,
        })
        .then(() => {
          snap.ref.update({
            welcomeMessageSent: true,
          });
          return true;
        })
        .catch((e) => console.error(e));
    } else {
      return null;
    }
  });

/**
 * Scrape the BBC website for new stories to update in the databaseonce a day
 */
exports.updateBBCStoriesList = functions.pubsub.schedule('every 24 hours').onRun(() => {
  return getAllStories().then((stories: Story[] )=> {
    // Parse object to remove nulls so Firebase doesn't complian
    const storiesParsed = JSON.parse( JSON.stringify(stories ) )
    admin.firestore().collection('news-stories').doc('bbc').set({
      stories: storiesParsed
    })
    return true;
  })
})

/**
 * Send a daily story to all users on chron schedule
 */
exports.sendDailyStory = functions.pubsub.schedule('every day 12:00').onRun(() => {
  return sendAllUsersStory();
})

exports.server = functions.https.onRequest(app)

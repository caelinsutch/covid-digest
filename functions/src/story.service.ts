import * as admin from 'firebase-admin';
import {Story} from './scraper';
import {sendMessage} from './express-server';
import * as functions from 'firebase-functions'
import * as twilio from 'twilio';
import getCovidData, {CovidFacts} from './covid-facts';

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.auth_token;
const twilioClient = twilio(accountSid, authToken);
const service = twilioClient.notify.services(functions.config().twilio.notify_service_id);

export interface User {
  name: string;
  phoneNumber: string;
  welcomeMessageSent: boolean;
  sentStories: string[]; // Array of story links the user has read
}

/**
 * Send a user an individual story
 * @param phoneNumberToSend phone number of the user that this is being sent too
 * @param extraText Any additional information that should be appended on top
 */
export async function sendUserStory(phoneNumberToSend: string, extraText = '') {
  // Get the user
  const user = await admin.auth().getUserByPhoneNumber(phoneNumberToSend);
  // User Document Reference
  const userDocRef = admin.firestore().collection('users').doc(user.uid)
  let storiesAlreadySent: string[];
  // Get the user doc
  const userDoc = await userDocRef.get();
  // Access the user
  const userData: User = userDoc.data() as User;
  // Get the stories that have already been sent
  storiesAlreadySent = userData.sentStories;
  // Get the stories document
  const collection = await admin.firestore().collection('news-stories').get();
  const docs = collection.docs
  const docsNotSent = docs.filter(doc => !storiesAlreadySent.includes(doc.id));
  const stories: Story[] = docsNotSent.map(doc => doc.data()) as Story[];
  // Filter out the ones the user has already seen

  if (stories.length !== 0) {
    // Get a random story phoneNumberToSend the stories that haven't been sent
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    // Update the userdoc with the story that they've read
    await admin.firestore().collection('users').doc(user.uid).update({
      sentStories: admin.firestore.FieldValue.arrayUnion(randomStory.link)
    });

    // Send the story to the user
    await sendMessage(summaryText(randomStory.title, getStorySummary(randomStory), randomStory.link, extraText), phoneNumberToSend)

  } else {
    await sendMessage("We have no more stories for you :(. Check back later", phoneNumberToSend)
  }

}

/**
 * Choose which summary (inline or generated)
 * @param story {Story}
 */
function getStorySummary(story: Story): string {
  if (story.inlineSummary === '') {
    return story.generatedSummary;
  } else {
    return story.inlineSummary;
  }}

/**
 * Generate the text that goes in a text message for a summary
 * @param title of the article
 * @param summary of the text
 * @param link to the original article
 * @param extraText anything extra
 */
function summaryText(title: string, summary: string, link: string, extraText = ''): string {
  return `${extraText}${title} from BBC News

Summary:
${summary}

Read Full Article: ${link}

More information: https://covid-digest.com
`
}

/**
 * Generate the text that goes in a text message for a summary
 * @param title of the article
 * @param summary of the text
 * @param link to the original article
 * @param fact
 * @param extraText anything extra
 */
function summaryTextWithFact(title: string, summary: string, link: string, fact: CovidFacts, extraText = ''): string {
return `Current Global COVID stats: 
😷 ${fact.activeCases} - Active Cases 
☠ ${fact.deaths} - Deaths 
🙂 ${fact.recovered} - Recovered 
Last Updated ${fact.lastUpdate}

Your Daily Story:
${extraText}${title} from BBC News

Summary:
${summary}

Read Full Article: ${link}

More information: https://covid-digest.com
`
}

/**
 * Send all users a random story and add that story to the sent stories list
 */
export async function sendAllUsersStory() {
  const users = await admin.firestore().collection('users').get();
  const bindings = users.docs.map(doc => JSON.stringify({binding_type: 'sms', address: doc.data().phoneNumber}));

  const collections = await admin.firestore().collection('news-stories').get();
  const stories: Story[] = collections.docs.map(doc => doc.data() as Story).filter(story => !story.sent);
  // Choose a random story
  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  const covidFacts = await getCovidData();

  service.notifications
    .create({
      toBinding: bindings,
      body: summaryTextWithFact(randomStory.title, getStorySummary(randomStory), randomStory.link, covidFacts, "Your daily story 😷 \n")
    })
    .then(() => {
      // Update users with the seen story
      admin.firestore().collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Go through each user and add the sent story link to their list of sent stories
          doc.ref.update({
            sentStories: admin.firestore.FieldValue.arrayUnion(randomStory.link)
          }).catch(e => console.log(e));
          // Aded to globally sent stories
          admin.firestore().collection('news-stories').where('link', '==', randomStory.link).get().then(() => {
            querySnapshot.forEach(d => {
              admin.firestore().collection('news-stories').doc(d.id).update({ sent: true}).catch(e => console.log(e));
            })
          }).catch(e => console.log(e));
        })
      }).catch(e => console.log(e));
    })
    .catch(err => {
      console.error(err);
    });
}

import * as admin from 'firebase-admin';
import {Story} from './scraper';
import {sendMessage} from './express-server';
import * as functions from 'firebase-functions'
import * as twilio from 'twilio';

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

export async function sendUserStory(from: string, extraText = '') {
  // Get the user
  const user = await admin.auth().getUserByPhoneNumber(from);
  // User Document Reference
  const userDocRef = admin.firestore().collection('users').doc(user.uid)
  let storiesAlreadySent: string[];
  // Get the user doc
  const userDoc = await userDocRef.get();
  // Access the user
  const userData: User = userDoc.data() as User;
  // Get the stories that have already been sent
  storiesAlreadySent = userData.sentStories;
  console.log(storiesAlreadySent);
  // Get the stories document
  const document = await admin.firestore().collection('news-stories').doc('bbc').get();
  // Array of all the stories
  const stories: Story[] = document.data()?.stories as Story[];
  // Filter out the ones the user has already seen
  const storiesNotSent = stories.filter(story => !storiesAlreadySent?.includes(story.link))

  if (storiesNotSent.length !== 0) {
    // Get a random story from the stories that haven't been sent
    const randomStory = storiesNotSent[Math.floor(Math.random() * storiesNotSent.length)];
    console.log(randomStory);
    // Update the userdoc with the story that they've read
    await admin.firestore().collection('users').doc(user.uid).update({
      sentStories: admin.firestore.FieldValue.arrayUnion(randomStory.link)
    });

    // Send the story to the user
    await sendMessage(summaryText(randomStory.title, getStorySummary(randomStory), randomStory.link, extraText), from)

  } else {
    await sendMessage("We have no more stories for you :(. Check back later", from)
  }

}

function getStorySummary(story: Story): string {
  if (story.inlineSummary === '') {
    return story.generatedSummary;
  } else {
    return story.inlineSummary;
  }}

function summaryText(title: string, summary: string, link: string, extraText = ''): string {
  return `${extraText}${title} from BBC News

Summary:
${summary}

Read Full Article: ${link}

More information: https://covid-digest.com
`
}

export async function sendAllUsersStory() {
  const users = await admin.firestore().collection('users').get();
  const bindings = users.docs.map(doc => JSON.stringify({binding_type: 'sms', address: doc.data().phoneNumber}));

  const sentStoriesDoc = await admin.firestore().collection('news-stories').doc('sent').get();
  // @ts-ignore
  const alreadySentStories: string[] = sentStoriesDoc.data().sentStories;
  const document = await admin.firestore().collection('news-stories').doc('bbc').get();
  // Array of all the stories that haven't been sent yet
  const stories: Story[] = document.data()?.stories.filter((story: Story) => !(alreadySentStories.includes(story.link))) as Story[];
  console.log('Unsent Stories ', stories);

  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  console.log('Sending Story ', randomStory);

  console.log(randomStory)
  service.notifications
    .create({
      toBinding: bindings,
      body: summaryText(randomStory.title, getStorySummary(randomStory), randomStory.link, "Your daily story 😷 \n")
    })
    .then(notification => {
      // Update users with the seen story
      admin.firestore().collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            sentStories: admin.firestore.FieldValue.arrayUnion(randomStory.link)
          })
          admin.firestore().collection('news-stories').doc('sent').update({
            sentStories: admin.firestore.FieldValue.arrayUnion(randomStory.link)
          })
        })
      })
    })
    .catch(err => {
      console.error(err);
    });
}

import * as admin from 'firebase-admin';
import {Story} from './scraper';
import {sendMessage} from './express-server';

export interface User {
  name: string;
  phoneNumber: string;
  welcomeMessageSent: boolean;
  sentStories: string[]; // Array of story links the user has read
}

async function getStories(from: string) {
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

    let summary: string;
    if (randomStory.inlineSummary === '') {
      summary = randomStory.generatedSummary;
    } else {
      summary = randomStory.inlineSummary;
    }
    // Send the story to the user
    await sendMessage(`${randomStory.title} from BBC News

Summary:
${summary}

Read Full Article: ${randomStory.link}

More information: https://covid-digest.com
`, from)

  } else {
    await sendMessage("We have no more stories for you :(. Check back later", from)
  }

}

export default getStories;

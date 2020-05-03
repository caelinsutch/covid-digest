import axios from 'axios';
import * as cheerio from 'cheerio';
let SummarizerManager = require("node-summarizer").SummarizerManager;

// URL that is being scanned
const url = 'https://www.bbc.com/news/coronavirus';

// Represents a story
export interface Story {
  title: string; // TItle
  link: string; // Link to original article
  inlineSummary: string; // Inline Summary
  datePublished: string;
  generatedSummary: string;
  sent: boolean;
}

let stories: Array<Story> = new Array<Story>();

/**
 * Get all the titles of stories on the BBC COVID front page
 * @param $ - Cheerio object with the loaded webpage
 */
function getStoryTitles($: any) {
  $('.gs-c-promo-heading ').each((i: number, e: CheerioElement) => {
    const $1 = cheerio.load(e);
    $1('h3').contents().each((index, element) => {
      if (element.type === 'text') {
        let link: string = element.parent.parent.attribs.href;
        if (!link.includes('https://')) {
          link = 'https://bbc.com' + link;
        }
        stories.push({
          title: element.data as string,
          link: link,
          inlineSummary: '',
          generatedSummary: '',
          datePublished: '',
          sent: false,
        });
      }
    })
  })
}

/**
 * Get the inline summaries on the BBC Covid page
 * @param $ - Cheerio object with the loaded webpage
 */
function getStoryInlineSummaries($: any) {
  let storiesIndex = 0;

  $('.gs-c-promo-summary').each((i: number, e: CheerioElement) => {
    const $1 = cheerio.load(e);
    $1('p').contents().each((index, element) => {
      if (element.type === 'text') {
        stories[storiesIndex].inlineSummary = element.data as string;
        storiesIndex ++;
      }
    })
  })
}

function getStoryDate($: any): any {
  $('.date').each((index: any, e: any) => {
    if (e.name === 'div') {
      return e.children[0].data;
    }
  })
}

async function getStorySource(storyUrl: string) {
  const res = await axios.get(storyUrl);
  return cheerio.load(res.data);
}

/**
 * Summarize a BBC Story
 * @returns {Promise<string | null>} String of the summary or null if an error is encountered
 * Possible errors include not enough text to summarize, error getting URL, etc.
 * @param $
 */
async function summarizeStory($: any): Promise<string | null> {

  let storyText: string = '';

  // Get the body of the story
  $('.story-body__inner').each((index: any, element: any) => {
    // Load the body in cheerio
    const $1 = cheerio.load(element);

    // Get all the story text
    $1('p, h1, h2, h3, h4, h5, a').contents().each((index1, element1) => {
      // A tags we have to treat separately (access children)
      if (element1.name === 'a') {
        const tempText = element1.children[0].data as string;
        storyText += (tempText + ' ');
      } else {
        const tempText = element1.data as string;
        storyText += tempText;
      }
    })
  })


  // Summarise the story
  try {
    const Summarizer = new SummarizerManager(storyText,2);
    const summary: string = Summarizer.getSummaryByFrequency().summary;
    if (summary && !summary.includes('undefined') && !summary.includes('\n')) {
      return summary.replace("[,.!?;:]", "$0 ");
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

// Util for running async functiosn in for each format
async function asyncForEach(array: Array<any>, callback: (val: any, i: number, arr: Array<any>) => any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Get all stories with summaries from BBC in the Story format
 */
async function getAllStories(): Promise<Array<Story>> {

  const res = await axios.get(url);

  const $ = cheerio.load(res.data);

  getStoryTitles($);

  getStoryInlineSummaries($);

  await asyncForEach(stories, async (story, i) => {
    if (story.inlineSummary === '' && story.link !== '') {
      const $1 = await getStorySource(story.link)
      const summary = await summarizeStory($1);
      const date: string = await getStoryDate($1);
      if (summary) {
        stories[i].generatedSummary = summary;
        stories[i].datePublished = date;
      }
    }
  })

  const storiesWithSummaries = stories.filter(story => (story.generatedSummary !== '' || story.inlineSummary !== ''));
  return storiesWithSummaries;

}



export default getAllStories;

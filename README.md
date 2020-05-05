# Covid Digest

[![GitHub contributors](https://img.shields.io/github/contributors/Naereen/StrapDown.js.svg)](https://GitHub.com/caelinsutch/covid-digest/graphs/contributors/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
![React](https://aleen42.github.io/badges/src/react.svg)
![Eslint](https://aleen42.github.io/badges/src/eslint.svg)

[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com)


Master: ![CD](https://github.com/caelinsutch/covid-digest/workflows/CD/badge.svg?branch=master)

Development: ![CD](https://github.com/caelinsutch/covid-digest/workflows/CD/badge.svg?branch=development)

Summarized News stories and COVID facts delivered by text weekly. Made with ReactJS, Firebase Functions, and Twilio SMS

### How Summarizing Works
First, we comb the BBC COVID stories webpage for articles, take the title of each link and article, then comb each individual article to get the article words.
Each article is passed through a Frequency based summarization algorithm from [node-summarizer](https://www.npmjs.com/package/node-summarizer#desc), described as 

>This type of summary works best for text that is not too complicated.Split the given text into sentences.
 Preprocess the sentences by removing all punctuation and making all letters lowercase.
 Make a list of all the words that occur in the text and find the frequency of the words.
 Take the calculated frequencies of the words and calculate the total weight of the original sentences.

and then stored in a database. Every day, we sent out a summarized article using the Twilio API to all the users who have signed up.

### Contributing

We'd love to have you contribute! Feel free to take a look at the issues list to see what stuff there is to work on, we're looking forward to your assistance!

## Overview of Stack



### Frontend
React site using AntDesign and React Bootstrap

### Backend
Firebase Cloud functions hooked up to Cloud Firestore and FireAuth for phoen authentication. Twilio is used for SMS delivery.
Web Scrapping is used to comb the BBC Coronavirius coverage and pull the stories into a database, where they're sent out to users.

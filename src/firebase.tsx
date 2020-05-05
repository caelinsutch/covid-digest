import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB39x2WEDnWHxUb_TXaPoDh72dnUFWTD2Y',
  authDomain: 'covid-digest.firebaseapp.com',
  databaseURL: 'https://covid-digest.firebaseio.com',
  projectId: 'covid-digest',
  storageBucket: 'covid-digest.appspot.com',
  messagingSenderId: '740953347752',
  appId: '1:740953347752:web:f3455676b98f87de17949d',
  measurementId: 'G-MHVT56HLB8',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const auth = firebase.auth;
export const db = firebase.firestore();

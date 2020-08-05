import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDrm9J37P66c-oBXUN0LZ3dNMWKroAfe3w',
  authDomain: 'traveling-hanoi-706b7.firebaseapp.com',
  databaseURL: 'https://traveling-hanoi-706b7.firebaseio.com',
  projectId: 'traveling-hanoi-706b7',
  storageBucket: 'traveling-hanoi-706b7.appspot.com',
  messagingSenderId: '208612649035',
  appId: '1:208612649035:web:dca390435a23ac094345ce',
  measurementId: 'G-XTG7MG2HWP',
};
export const firebaseApp = firebase.initializeApp(config);

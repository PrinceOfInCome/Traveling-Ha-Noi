import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA_MFZPwiubKsfQon4LfiKS4xsb5wghRv8',
  databaseURL: 'https://traveling-hanoi-706b7.firebaseio.com/',
  projectId: 'traveling-hanoi-706b7',
  appId: '1:208612649035:android:bfb6427087cf98ec4345ce',
};

export default Firebase.initializeApp(firebaseConfig);

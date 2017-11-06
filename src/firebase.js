import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDF_KB3grBlke2N7GPUuHelmW6yeYVBZUc",
  authDomain: "timepiece-7fec5.firebaseapp.com",
  databaseURL: "https://timepiece-7fec5.firebaseio.com",
  projectId: "timepiece-7fec5",
  storageBucket: "timepiece-7fec5.appspot.com",
  messagingSenderId: "976852170213"
};
firebase.initializeApp(config);

export default firebase;
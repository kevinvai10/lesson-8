import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCtoQLvSMtu08wiu6pCIj63T-lxwR6AFI8",
  authDomain: "crwn-db-41c35.firebaseapp.com",
  databaseURL: "https://crwn-db-41c35.firebaseio.com",
  projectId: "crwn-db-41c35",
  storageBucket: "",
  messagingSenderId: "880002823064",
  appId: "1:880002823064:web:aeac6b518a30f4cf92b1ed"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

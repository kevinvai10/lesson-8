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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //user auth returns object from user trying to login through google
  if(!userAuth) return;
  //All CRUD operations are made to the reference not the snapshot
  const userRef = firestore.doc(`users/${userAuth.uid}`); //reference only has information about the document weather it exists or not
  //snapshot holds information about the actual data stored in that document
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
      console.log('error creating user' , error.message);
    }
  }

  return userRef;
}  

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

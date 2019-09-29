import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { encode } from 'punycode';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  //create collection using the key
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef)

  const batch = firestore.batch();
  objectsToAdd.forEach(object => {
    const newDocRef = collectionRef.doc(); //create a new document reference object with unique key
    batch.set(newDocRef, object)
  })

  return await batch.commit()
}

//get whole snapshot
export const convertCollectionsSnapshotToMap = (collections) => {
  //transform doc object = array
  const transfromedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return { 
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  //return object with all the keys hats, jackets, etc.
  /*
    hats: {
      ...items
    }
  */
  return transfromedCollection.reduce((accum, collection) => {
    accum[collection.title.toLowerCase()] = collection;
    return accum;
  }, {})
  //return obj with routing properties
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

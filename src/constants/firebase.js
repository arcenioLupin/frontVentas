import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDsXleFXUQjX0HC5wxhSQ4u1hPW1m80wm4",
  authDomain: "dive-archivos-solcre.firebaseapp.com",
  databaseURL: "https://dive-archivos-solcre.firebaseio.com",
  projectId: "dive-archivos-solcre",
  storageBucket: "dive-archivos-solcre.appspot.com",
  messagingSenderId: "739826235033"
};
firebase.initializeApp(config);

export const auth = firebase.auth().signInAnonymously();
export const storageRef = firebase.storage().ref();

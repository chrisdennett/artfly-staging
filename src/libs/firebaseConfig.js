import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDlCRPX8Hf1w0tssjgxT7O05SY6aRIZWxY",
    authDomain: "art-blam.firebaseapp.com",
    projectId: "art-blam",
    databaseURL: "https://art-blam.firebaseio.com",
    storageBucket: "art-blam.appspot.com",
    messagingSenderId: "156669954952"
};

firebase.initializeApp(config);

if (1 === 2) console.log("firestore: ", firestore);

firebase.firestore().enablePersistence()
    .then(function () {
        // Initialize Cloud Firestore through firebase
        console.log("persistence granted");
    })
    .catch(function (err) {
        if (err.code === 'failed-precondition') {
            console.log("Multiple tabs open, persistence can only be enabled in one tab at a time", err.code);
        }
        else if (err.code === 'unimplemented') {
            console.log(" The current browser does not support all of the features required to enable persistence", err.code);
        }
        console.log("firebase config err: ", err);
    });

// const firestoreDb = firebase.firestore();

export const storageEvents = firebase.storage.TaskEvent;

export const storageRef = firebase.storage().ref();

export const firestoreDb = firebase.firestore();

export default firebase;

// const database = libs.database();
// const auth = libs.auth();
/*const stagingOnlyConfig = {
    apiKey: "AIzaSyBw4JO9UT1KXpDpnb6gvF2DfkIrXXQ4Vac",
    authDomain: "artfly-staging.firebaseapp.com",
    databaseURL: "https://artfly-staging.firebaseio.com",
    storageBucket: "artfly-staging.appspot.com",
    messagingSenderId: "133898795032"
};
const artflyFirebase = firebase.initializeApp(stagingOnlyConfig);*/


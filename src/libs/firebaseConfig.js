import firebase from 'firebase/app';
import * as storage2 from 'firebase/storage';
import * as auth2 from 'firebase/auth';
import firestore from 'firebase/firestore';
// constants
import {IN_STAGING} from '../components/global/GLOBAL_CONSTANTS';

// FOR STAGING
const stagingOnlyConfig = {
    apiKey: "AIzaSyBw4JO9UT1KXpDpnb6gvF2DfkIrXXQ4Vac",
    authDomain: "artfly-staging.firebaseapp.com",
    databaseURL: "https://artfly-staging.firebaseio.com",
    projectId: "artfly-staging",
    storageBucket: "artfly-staging.appspot.com",
    messagingSenderId: "133898795032"
};

// FOR PRODUCTION
const productionConfig = {
    apiKey: "AIzaSyDlCRPX8Hf1w0tssjgxT7O05SY6aRIZWxY",
    authDomain: "art-blam.firebaseapp.com",
    projectId: "art-blam",
    databaseURL: "https://art-blam.firebaseio.com",
    storageBucket: "art-blam.appspot.com",
    messagingSenderId: "156669954952"
};

const config = IN_STAGING ? stagingOnlyConfig : productionConfig;
firebase.initializeApp(config);

if(1===2) {
    console.log("fs: ", firestore);
    console.log("storage2: ", storage2);
    console.log("auth2: ", auth2);
} //just prevents annoying not used console warning


/*firebase.firestore().enablePersistence()
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
    });*/

export const storage = firebase.storage();
export const storageEvent = firebase.storage.TaskEvent;
export const storageRef = firebase.storage().ref();
export const firestoreDb = firebase.firestore();
export const auth = firebase.auth();


const settings = {timestampsInSnapshots: true};
firestoreDb.settings(settings);

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


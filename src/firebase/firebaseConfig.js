import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDlCRPX8Hf1w0tssjgxT7O05SY6aRIZWxY",
    authDomain: "art-blam.firebaseapp.com",
    databaseURL: "https://art-blam.firebaseio.com",
    storageBucket: "art-blam.appspot.com",
    messagingSenderId: "156669954952"
};

const artflyFirebase = firebase.initializeApp(config);
// const database = firebase.database();
// const auth = firebase.auth();

export default artflyFirebase;

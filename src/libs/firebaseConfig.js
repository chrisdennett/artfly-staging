import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDlCRPX8Hf1w0tssjgxT7O05SY6aRIZWxY",
    authDomain: "art-blam.firebaseapp.com",
    databaseURL: "https://art-blam.firebaseio.com",
    storageBucket: "art-blam.appspot.com",
    messagingSenderId: "156669954952"
};

/*const stagingOnlyConfig = {
    apiKey: "AIzaSyBw4JO9UT1KXpDpnb6gvF2DfkIrXXQ4Vac",
    authDomain: "artfly-staging.firebaseapp.com",
    databaseURL: "https://artfly-staging.firebaseio.com",
    storageBucket: "artfly-staging.appspot.com",
    messagingSenderId: "133898795032"
};
const artflyFirebase = libs.initializeApp(stagingOnlyConfig);*/

const artflyFirebase = firebase.initializeApp(config);


// const database = libs.database();
// const auth = libs.auth();

export default artflyFirebase;

import firebase, { auth, firestoreDb as db } from "../libs/firebaseConfig";

export const DELETE_USER = "deleteUser";
export const DELETE_USER_AUTH = "deleteUserAuth";

export function deleteUser() {
    return dispatch => {
        const { uid } = auth.currentUser;

        db.collection('users')
            .doc(uid)
            .delete()
            .then(() => {
                dispatch({
                    type: DELETE_USER,
                    payload: "success"
                })
            })
            .catch(function (error) {
                console.log('delete user failed: ', error);
            });
    }
}

export function deleteUserAuth() {
    return dispatch => {

        const currentUser = auth.currentUser;

        // take the first one because not currently allowing multiple sign in
        // methods for the same account
        const providerId = currentUser.providerData[0].providerId;

        let provider;
        if (providerId === 'twitter.com') provider = new firebase.auth.TwitterAuthProvider();
        if (providerId === 'google.com') provider = new firebase.auth.GoogleAuthProvider();
        if (providerId === 'facebook.com') provider = new firebase.auth.FacebookAuthProvider();

        // get users to sign in again
        auth
            .signInWithPopup(provider)
            .then(result => {
                currentUser
                    .reauthenticateAndRetrieveDataWithCredential(result.credential)
                    .then(() => {
                        currentUser
                            .delete()
                            .then(() => {
                                dispatch({
                                    type: DELETE_USER_AUTH,
                                    payload: "success"
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log("error: ", error);
                    })
            })
            .catch(error => {
                console.log("log in error: ", error);
            });
    }
}
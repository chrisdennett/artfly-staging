// ADD USER AUTH LISTENER
// const fbui = new firebaseui.auth.AuthUI(firebase.auth());

import { auth } from "../libs/firebaseConfig";

export const USER_SIGNED_IN = "userSignedIn";
export const USER_SIGNED_OUT = "userSignedOut";

// store listener and export function to stop it
let unregisterUserAuthListener;
export function stopListeningForUserAuthChanges(){
    if (unregisterUserAuthListener) unregisterUserAuthListener();
}

// LISTEN FOR USER DATA CHANGES
export function listenForUserAuthChanges() {
    // ensure only set up once
    if (unregisterUserAuthListener) return {};

    return (dispatch) => {
        unregisterUserAuthListener = auth
            .onAuthStateChanged(user => {
                /*
                * If a user is returned it means they've just logged in
                * Could use an else statement to send logged out dispatch
                * But using
                * */

                if (user) {
                    const { photoURL, displayName, email, emailVerified, uid, providerData } = user;
                    const { providerId } = providerData[0];
                    const authData = { providerId, photoURL, displayName, email, emailVerified, uid };

                    dispatch({
                        type: USER_SIGNED_IN,
                        payload: { ...authData }
                    });
                }
                else{
                    dispatch({
                        type: USER_SIGNED_OUT,
                        payload: { }
                    })
                }
            }, (error) => {
                console.log("auth error: ", error);
            });
    }
}

// SIGN OUT
export function signOutUser() {
    return dispatch => {
        auth
            .signOut()
            .then(() => {
                dispatch({
                    type: USER_SIGNED_OUT,
                    payload: { }
                })
            })
            .catch((error) => {
                console.log("sign out error: ", error);
            });
    }
}

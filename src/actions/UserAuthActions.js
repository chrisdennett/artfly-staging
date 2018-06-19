// ADD USER AUTH LISTENER
// const fbui = new firebaseui.auth.AuthUI(firebase.auth());

import { auth } from "../libs/firebaseConfig";

export const USER_REQUESTED = "userRequested";
export const USER_SIGNED_IN = "userSignedIn";
export const USER_SIGNED_OUT = "userSignedOut";

// store listener and export function to stop it
/*let unregisterUserAuthListener;
export function stopListeningForUserAuthChanges(){
    if (unregisterUserAuthListener) unregisterUserAuthListener();
    return{}
}*/

// LISTEN FOR USER DATA CHANGES
export function listenForUserAuthChanges() {

    return (dispatch) => {
        dispatch({
            type: USER_REQUESTED
        });

        auth.onAuthStateChanged(user => {
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
                        type: USER_SIGNED_OUT
                    })
                }
            }, (error) => {
                console.log("auth error: ", error);
            });
    }
}

// SIGN OUT
export function signOutUser( callback) {
    return dispatch => {
        auth
            .signOut()
            .then(() => {
                dispatch({
                    type: USER_SIGNED_OUT
                });

                if(callback) callback();
            })
            .catch((error) => {
                console.log("sign out error: ", error);
            });
    }
}

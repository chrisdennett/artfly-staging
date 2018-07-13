import { firestoreDb as db } from "../libs/firebaseConfig";

export const ACCOUNT_FETCHED = 'accountFetched';
export const ACCOUNT_UPDATED = 'accountUpdated';

function addUserAccount(userId, dispatch) {
    const newAccountData = {
        status: 'active',
        dateJoined: Date.now(),
        adminId: userId
    };

    const newAccountRef = db.collection('accounts').doc(userId);

    newAccountRef
        .set(newAccountData)
        .then(() => {
            const accountDataWithId = { ...newAccountData, accountId: userId, isNew: true };

            dispatch({
                type: ACCOUNT_FETCHED,
                payload: accountDataWithId
            });
        })
}

// Setting up an account if one doesn't exist feels a bit wrong.
export function listenForUserAccountChanges(userId) {
    return (dispatch) => {
        db.collection('accounts')
            .doc(userId)
            .onSnapshot(doc => {
                    if (doc.exists) {
                        const accountDataWithId = { ...doc.data(), accountId: doc.id };

                        dispatch({
                            type: ACCOUNT_FETCHED,
                            payload: accountDataWithId
                        });
                    }
                    // otherwise create a new account
                    else {
                        addUserAccount(userId, dispatch);
                    }
                },
                error => {
                    console.log("user accounts fetch error: ", error);
                })
    }
}

export function updateUserAccount(accountId, newAccountData) {
    return (dispatch) => {
        db.collection('accounts')
            .doc(accountId)
            .set(newAccountData, { merge: true })
            .then(() => {
                const accountDataWithId = { ...newAccountData, accountId: accountId };

                dispatch({
                    type: ACCOUNT_UPDATED,
                    payload: accountDataWithId
                });
            })
            .catch(function (error) {
                console.log('updateUserAccount failed: ', error);
            })
    }
}
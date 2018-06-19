import { firestoreDb as db } from "../libs/firebaseConfig";

export const ACCOUNT_FETCHED = 'accountFetched';
export const  ACCOUNT_UPDATED = 'accountUpdated';

function addUserAccount(userId, dispatch){
    const newAccountData = {
        status:'active',
        dateJoined: Date.now(),
        adminId: userId
    };

    const newAccountRef =  db.collection('accounts').doc();
    const newAccountId = newAccountRef.id;

    newAccountRef
        .set(newAccountData)
        .then(() => {
            const accountDataWithId = { ...newAccountData, accountId: newAccountId, isNew:true };

            dispatch({
                type: ACCOUNT_FETCHED,
                payload: accountDataWithId
            });
        })
}

export function fetchUserAccount(userId) {
    return (dispatch) => {
        db.collection('accounts')
            .where('adminId', '==', userId)
            .get()
            .then(querySnapshot => {
                    // If there's no user gallery yet return default data
                    if (querySnapshot.size === 0) {
                        addUserAccount(userId, dispatch);
                    }
                    // otherwise return the user gallery (may b
                    else {
                        querySnapshot.forEach(doc => {
                            const accountDataWithId = { ...doc.data(), accountId: doc.id };

                            dispatch({
                                type: ACCOUNT_FETCHED,
                                payload: accountDataWithId
                            });
                        });
                    }
                },
                error => {
                    console.log("user artworks listener error: ", error);
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
                console.log('Update artwork failed: ', error);
            })
    }
}
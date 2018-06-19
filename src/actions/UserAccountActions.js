import { firestoreDb as db } from "../libs/firebaseConfig";

const  ACCOUNT_FETCHED = 'accountFetched';

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
            const accountDataWithId = { ...newAccountData, accountId: newAccountId };

            dispatch({
                type: ACCOUNT_FETCHED,
                payload: { [newAccountId]: accountDataWithId }
            });
        })
}

export function fetchUserAccount(userId) {
    return (dispatch) => {
        db.collection('accounts')
            .where('adminId', '==', userId)
            .get()
            .then(querySnapshot => {
                console.log("querySnapshot: ", querySnapshot);
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
                                payload: { [doc.id]: accountDataWithId }
                            });
                        });
                    }
                },
                error => {
                    console.log("user artworks listener error: ", error);
                })
    }
}
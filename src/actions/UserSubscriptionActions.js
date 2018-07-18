// Set up membership listener to catch subscription changes from Paddle.
import { firestoreDb as db } from "../libs/firebaseConfig";
//
export const SUBSCRIPTION_FETCHED = 'subscriptionFetched';

export function listenForUserSubscriptionChanges(userId) {
    return (dispatch) => {
        db.collection('memberships')
            .doc(userId)
            .onSnapshot(doc => {
                    let subscriptionDataWithId;

                    if (doc.exists) {
                        subscriptionDataWithId = { ...doc.data().subscription, accountId: doc.id };
                    }
                    else{
                        subscriptionDataWithId = {status:'noSubscription', accountId: doc.id}
                    }

                    dispatch({
                        type: SUBSCRIPTION_FETCHED,
                        payload: subscriptionDataWithId
                    });
                },
                error => {
                    console.log("user accounts fetch error: ", error);
                })
    }
}

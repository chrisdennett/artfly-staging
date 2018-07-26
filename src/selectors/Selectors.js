import firebase from 'firebase/app';
import { createSelector } from 'reselect';
// TODO: move this to a data folder
import MEMBERSHIP_PLANS from '../app/global/MEMBERSHIP_PLANS';
import { getParams } from "../app/AppRouteSelector";

export const getUserId = (state) => {
    const { user } = state;
    if (!user) return null;

    return user.uid;
};

export const getDeleteAuthError = (state) => {
    const { errors } = state;
    if (!errors) return null;

    return errors.userAuthDeleteError;
};

export const getMaxArtworksAllowed = (state) => {
    const membershipPlan = getMembershipDetails(state);

    if (!membershipPlan) return null;

    return membershipPlan.maxArtworks;
};

export const getLatestUserArtwork = state => {
    const userArtworks = getUserArtworks(state);
    if (!userArtworks || userArtworks.length === 0) return null;
    return userArtworks[0];
};

export const getRecentUserArtworks = state => {
    const userArtworks = getUserArtworks(state);
    if (!userArtworks || userArtworks.length === 0) return null;

    return userArtworks.slice(0, 3);
};

const getCurrentParams = createSelector(
    state => state.routing,
    (route) => {
        if (!route || !route.pathname) return null;

        return getParams(route.pathname);
    }
);

const getCurrentGalleryIdParam = createSelector(
    state => getCurrentParams(state),
    (params) => {
        if (!params || !params.galleryId) return null;
        return params.galleryId;
    }
);

const getCurrentArtworkIdParam = createSelector(
    state => getCurrentParams(state),
    (params) => {
        if (!params || !params.artworkId) return null;
        return params.artworkId;
    }
);

export const getCurrentGalleryData = createSelector(
    state => state.user,
    state => state.galleries,
    state => state.artworks,
    state => getCurrentGalleryIdParam(state),
    (user, galleries, artworks, galleryId) => {
        if (!galleries || !galleryId) return [];

        const gallery = galleries[galleryId];
        if (!gallery) return [];

        const isEditable = user && user.uid === gallery.adminId;
        const galleryArtworks = getGalleryArtworks(gallery, artworks);
        const totalArtworks = galleryArtworks.length;
        const firstArtworkId = galleryArtworks.length > 0 ? galleryArtworks[0].artworkId : null;

        return { ...gallery, isEditable, galleryArtworks, totalArtworks, firstArtworkId };
    }
);

/*
* Get artworks based on gallery type.  If it's a user gallery
* the gallery key is the adminId.  Future gallery types
* may include artworks from all over.
* */
const getGalleryArtworks = (gallery, artworks) => {
    const { type, key } = gallery;

    let galleryArtworks = [];
    if (type === 'user') {
        galleryArtworks = getArtworksWithAdminId(artworks, key);
    }
    if (!galleryArtworks) return [];

    return getArtworksByDate(galleryArtworks);
};

export const getArtworksByDate = (artworks) => {
    // create array
    const arr = Object.keys(artworks).map(id => {
        return artworks[id];
    });

    // sort by last updated
    arr.sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
    });

    return arr;
};

export const getGalleryNavigation = createSelector(
    state => state.user,
    state => getCurrentGalleryData(state),
    state => getCurrentArtworkIdParam(state),
    (user, gallery, artworkId) => {
        if (!gallery) return null;
        let currentArtwork, nextArtwork, previousArtwork;
        const { galleryArtworks, totalArtworks } = gallery;

        for (let i = 0; i < totalArtworks; i++) {
            const artwork = galleryArtworks[i];
            if (artwork.artworkId === artworkId) {
                currentArtwork = artwork;

                if (i > 0) {
                    previousArtwork = galleryArtworks[i - 1];
                }

                if (i <= totalArtworks - 1) {
                    nextArtwork = galleryArtworks[i + 1]
                }

                break;
            }
        }

        const userId = user ? user.uid : '';
        const isEditable = !currentArtwork ? false : currentArtwork.adminId === userId;

        //http://localhost:3000/gallery/galleryId_dPFQjQdkX1bJBjYWtXQ5_galleryId/artworkId_sPdffDuVZToteQedU1bL_artworkId

        return { currentArtwork, isEditable, nextArtwork, previousArtwork };
    }
);

export const getUserGalleryId = (state) => {
    const { galleries, user } = state;
    if (!galleries || !user) return null;

    const userGalleryArr = Object.keys(galleries).filter(galleryId => galleries[galleryId].adminId === user.uid);

    if (userGalleryArr.length === 0) {
        return null;
    }
    else {
        return userGalleryArr[0];
    }
};

export const getUserGallery = (state) => {
    const { galleries } = state;
    const userGalleryId = getUserGalleryId(state);

    if (!userGalleryId) return null;

    return galleries[userGalleryId];

};

export const getSignInProvider = (state) => {
    const { user } = state;
    if (!user) return null;

    let label = '';

    switch (user.providerId) {
        case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
            label = 'GOOGLE';
            break;
        case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
            label = 'FACEBOOK';
            break;
        case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
            label = 'TWITTER';
            break;
        case firebase.auth.EmailAuthProvider.PROVIDER_ID:
            label = 'EMAIL / PASSWORD';
            break;

        default:
            return null;
    }

    return {
        label, id: user.providerId
    }
};

export const getArtwork = (state, props) => {
    const { artworks } = state;
    const { artworkId } = props;

    if (!artworks || !artworkId) return null;

    return artworks[artworkId];
};

/*
* Helper function to determine if a date is in the past
* used to determine the out-of-date-ness of subscription
* */
const dateIsInTheFuture = (date) => {
    const testDate = new Date(date);
    const now = Date.now();

    // a future date is bigger than now
    return testDate > now;
};

/*
* Helper function to determine if subscription exists
* and isn't out of date (i.e. has a cancellationEffectiveDate
* in the past)
* */
const hasInDateSubscription = (subscription) => {
    // no subscription
    if (subscription.status === 'noSubscription') {
        return false;
    }

    // subscription, but needs checking
    if (subscription.cancellationEffectiveDate) {
        // if set to be cancelled check the date against today
        // still valid if cancellation in the future
        return dateIsInTheFuture(subscription.cancellationEffectiveDate);
    }

    // valid if subscription, but no cancellation date
    return true;
};

/*
* Gets the current subscription data, and matches to the
* correct membership plan from local data.
* Also determines if subscription is cancelled and out of date
* If so it returns the free membership instead
* */
export const getUserMembership = createSelector(
    state => state.subscription,
    (subscription) => {
        if (!subscription) return null;

        let membershipPlan = {};
        const { planId } = subscription;
        const isValid = hasInDateSubscription(subscription);

        if (isValid) {
            membershipPlan = { ...MEMBERSHIP_PLANS[planId], ...subscription };
        }
        // if no valid subscription return the free plan
        else {
            membershipPlan = { ...MEMBERSHIP_PLANS['free'] };
        }

        return membershipPlan;
    }
);

/*
* Adds paddle local price and total artworks to membership details
* so the profile pages only need to call this one function rather
* than three
* */
export const getMembershipDetails = createSelector(
    state => state.account,
    state => state.paddle,
    state => getTotalUserArtworks(state),
    getUserMembership,
    (account, paddle, totalUserArtworks, membershipPlan) => {
        if (paddle) {
            membershipPlan.localPrice = paddle.localPrice;
        }

        membershipPlan.dateJoined = account.dateJoined ? account.dateJoined : '...';
        membershipPlan.totalUserArtworks = isNaN(totalUserArtworks) ? '...' : totalUserArtworks;

        return membershipPlan;
    }
);

/*
 * Retrieve all artworks with the given admin id
 * This is a separate function because it is shared
 * by the private getUserArtworks and the public
 * getGalleryArtworks which uses the adminId as an
 * identifier
  * */
const getArtworksWithAdminId = (artworks, adminId) => {
    return Object.keys(artworks)
        .filter(artworkId => {
            return artworks[artworkId].adminId === adminId;
        })
        .filter((artworkId) => {
            // check to see if it has a deleteAfter date in the past
            let includeArtwork = true;
            const { deleteAfter } = artworks[artworkId];
            if (deleteAfter) {
                // if so don't include it
                includeArtwork = dateIsInTheFuture(deleteAfter);
            }

            return includeArtwork;
        })
        .reduce((obj, key) => {
            obj[key] = artworks[key];
            return obj
        }, {});
};

export const getUserArtworks = createSelector(
    state => state.user,
    state => state.artworks,
    (user, artworks) => {
        if (!user.uid || !artworks) return null;

        const userArtworks = getArtworksWithAdminId(artworks, user.uid);

        if (!userArtworks) return null;

        if (userArtworks.length < 1) return userArtworks;

        return getArtworksByDate(userArtworks);
    }
);

export const getTotalUserArtworks = createSelector(
    state => getUserArtworks(state),
    (userArtworks) => {
        return userArtworks ? userArtworks.length : 0;
    }
);

export const getDeleteAfterDate = createSelector(
    state => getUserMembership(state),
    (membershipDetails) => {
        const { status, cancellationEffectiveDate } = membershipDetails;
        return status === 'deleted' ? cancellationEffectiveDate : null;
    }
);
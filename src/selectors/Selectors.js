import firebase from 'firebase/app';
import { createSelector } from 'reselect';
// TODO: move this to a data folder
import MEMBERSHIP_PLANS from '../app/global/MEMBERSHIP_PLANS';

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

export const getGallery = (state, props) => {
    const { galleries } = state;
    const { galleryId } = props;

    if (!galleries || !galleryId) return null;

    return galleries[galleryId];
};

export const getTotalUserArtworks = (state) => {
    const userArtworks = getUserArtworks(state);
    return userArtworks ? userArtworks.length : 0;
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

export const getCurrentGalleryData = (user, galleries, artworks, galleryId) => {
    const gallery = galleries[galleryId];
    if (!gallery) return {};

    const isEditable = user && user.uid === gallery.adminId;
    const galleryArtworks = getGalleryArtworks(gallery, artworks);

    const firstArtworkId = galleryArtworks.length > 0 ? galleryArtworks[0].artworkId : null;

    return { ...gallery, isEditable, galleryArtworks, firstArtworkId };
};

export const getGalleryArtworks = (gallery, artworks) => {
    const { type, key } = gallery;

    let galleryArtworks = [];
    if (type === 'user') {
        galleryArtworks = getArtworksWithAdminId(artworks, key);
    }
    if(!galleryArtworks) return [];

    return getArtworksByDate(galleryArtworks);
};

export const getArtworksByDate = (artworks) => {
    const arr = Object.keys(artworks).map(id => {
        return artworks[id];
    });

    arr.sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
    });

    return arr;
};

export const getGalleryNavigation = (artworks, artworkId, userId) => {
    const galleryArtworks = getArtworksByDate(artworks);
    const totalArtworks = galleryArtworks.length;
    let currentArtwork, nextArtwork, previousArtwork;

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

    const isEditable = !currentArtwork ? false : currentArtwork.adminId === userId;

    return { currentArtwork, isEditable, nextArtwork, previousArtwork };
};

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

const dateIsInTheFuture = (date) => {
    const testDate = new Date(date);
    const now = Date.now();

    // a future date is bigger than now
    return testDate > now;
};

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


export const getMembershipDetails = createSelector(
    state => state.account,
    state => state.paddle,
    getUserMembership,
    getTotalUserArtworks,
    (account, paddle, membershipPlan, totalUserArtworks) => {

        if (paddle) {
            membershipPlan.localPrice = paddle.localPrice;
        }

        membershipPlan.dateJoined = account.dateJoined ? account.dateJoined : '...';
        membershipPlan.totalUserArtworks = isNaN(totalUserArtworks) ? '...' : totalUserArtworks;

        return membershipPlan;
    }
);

export const getUserArtworksOld = (state) => {
    const { user, artworks } = state;

    if (!user || !artworks) return null;

    const { uid } = user;

    const userArtworks = Object.keys(artworks)
        .filter(artworkId => artworks[artworkId].adminId === uid)
        .reduce((obj, key) => {
            obj[key] = artworks[key];
            return obj
        }, {});

    return getArtworksByDate(userArtworks);
};


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
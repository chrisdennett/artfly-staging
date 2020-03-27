import firebase from 'firebase/app';
import { createSelector } from 'reselect';
// TODO: move this to a data folder
import MEMBERSHIP_PLANS from '../MEMBERSHIP_PLANS';
import { getQueryParameters } from "../AppRouteSelector";
import { getNewEditData } from "../editors/EditUtils";

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

/*
* Get user artists
*/
export const getUserArtists = createSelector(
    state => state.account,
    (account) => {
        if (!account) {
            return null;
        }

        return account.artists;
    }
);

/*
* Get Current params from routing
*/
const getCurrentParams = createSelector(
    state => state.routing,
    (route) => {
        if (!route || !route.pathname) return null;

        return getQueryParameters(route.pathname);
    }
);

export const getCurrentArtistParam = createSelector(
    state => getCurrentParams(state),
    (params) => {
        if (!params || !params.artistId) return null;

        return params.artistId.split('%20').join(' ');
    }
);

export const getCurrentGalleryIdParam = createSelector(
    state => getCurrentParams(state),
    (params) => {
        if (!params || !params.galleryId) return null;
        return params.galleryId;
    }
);

export const getCurrentArtworkIdParam = createSelector(
    state => getCurrentParams(state),
    (params) => {
        if (!params || !params.artworkId) return null;
        return params.artworkId;
    }
);

export const getNewArtworkParam = createSelector(
    state => getCurrentParams(state),
    (params) => {
        if (!params || !params.newArtworkId) return false;
        return params.newArtworkId;
    }
);

export const getCurrentArtwork = createSelector(
    state => state.artworks,
    state => getCurrentArtworkIdParam(state),
    (artworks, artworkId) => {
        if (!artworks || !artworkId) return null;
        return artworks[artworkId];
    }
);

const addMissingKeys = (edits) => {
    const ids = Object.keys(edits);
    const editsWithKeys = {};

    for (let id of ids) {
        const edit = edits[id];

        if (edit.key) {
            editsWithKeys[id] = { ...edit };
        }
        else {
            editsWithKeys[id] = { ...edit, key: id };
        }
    }

    return editsWithKeys;
};

const updateAnyLegacyEditData = ({ editData, edits, cropData, orientation, frameData }) => {
    /*
    Legacy data people may have no 'edits' data or if they added
    {
        1542800251854_mb4f:{
            cyanXPercent: 2,
            magentaXPercent: 6,
            order: 1,
            type: "colourSplitter",
            yellowXPercent: 10,
        },
        frame:{
            frameColour: { },
            frameThicknessDecimal: 0.04,
            key: "frame",
            mountColour: {       },
            mountThicknessDecimal: 0.06,
            type: "frame",
        },
        initialCrop:{
            cropData: {

            },
            key: "initialCrop",
            orientation: 1,
            type: "crop",
        }
    };
    */

    // if it has editData all is up to date as of 21 Nov 2018
    if (editData) {
        // just to reset current dev data.
        return editData;

        /*const {edits, editOrder } = {...editData};
        const updatedEdits = {};

        for(let id of editOrder){
            const edit = edits[id];
            if(edits[id].type === 'colourSplitter'){
                updatedEdits[id] = {...edit, name:'Colour Splitter'};
            }
            else{
                updatedEdits[id] = edit;
            }
        }

        return {...editData, edits:updatedEdits};*/
    }
    else {
        // convert old data to a framed artwork project
        // with the addition of a colourSplitter edit if
        // anyone has added one since last update.
        const editData = {};
        const updatedEdits = edits ? edits : {};

        if (!updatedEdits['imageAdd']) {
            const defaultData = getNewEditData('imageAdd', 'imageAdd');
            updatedEdits.imageAdd = { ...defaultData };
        }

        if (!updatedEdits['initialCrop']) {
            const defaultData = getNewEditData('crop', 'initialCrop');
            updatedEdits.initialCrop = { ...defaultData, cropData, orientation };
        }

        if (!updatedEdits['frame']) {
            const defaultData = getNewEditData('frame', 'frame');
            updatedEdits.frame = { ...defaultData, ...frameData };
        }

        editData.edits = addMissingKeys(updatedEdits);
        editData.editOrder = ['imageAdd', 'initialCrop'];
        const possColourSplitterEditId = Object.keys(updatedEdits).find(id => updatedEdits[id].type === 'colourSplitter');
        if (possColourSplitterEditId) {
            editData.editOrder.push(possColourSplitterEditId);
        }
        editData.editOrder.push('frame');

        return editData;
    }
};

export const getArtworkEdits = createSelector(
    state => getCurrentArtwork(state),
    (artwork) => {
        if (!artwork) return null;

        // convert any old edit data into the current format
        const editData = updateAnyLegacyEditData(artwork);

        return editData;
    }
);

/*
* Get Artist galleries
* - get artists
* - for each artist get latest picture
*/
export const getUserGalleries = createSelector(
    state => state.user,
    state => getUserArtists(state),
    state => state.artworks,
    (user, artists = [], artworks) => {

        const userArtworks = getArtworksWithAdminId(artworks, user.uid);
        const userArtworkIds = Object.keys(userArtworks);
        const totalArtworks = userArtworkIds.length;
        const firstUserArtworkId = userArtworkIds.length > 0 ? userArtworkIds[0] : null;
        const latestArtwork = firstUserArtworkId ? userArtworks[firstUserArtworkId] : null;

        const userGallery = {
            type: 'global',
            id: user.uid,
            galleryId: user.id,
            ...getGalleryTitle(null),
            totalArtworks,
            latestArtwork
        };

        let artistGalleries = [];
        // for each artist add an object with gallery info
        for (let artist of artists) {
            const artworks = getGalleryArtworks(user.uid, userArtworks, artist.name)

            artistGalleries.push(
                {
                    type: 'artist',
                    id: artist.name,
                    galleryId: user.id,
                    ...getGalleryTitle(artist.name),
                    totalArtworks: artworks.length,
                    latestArtwork: artworks[0],
                    artist: artist.name
                }
            )
        }

        return [userGallery, ...artistGalleries];
    }
);

const getGalleryTitle = (artist) => {
    if (artist) {
        return {
            title: artist,
        }
    }
    else {
        return {
            title: "All Artworks",
        }
    }
}

export const getCurrentGalleryData = createSelector(
    state => state.user,
    state => state.artworks,
    state => getCurrentGalleryIdParam(state),
    state => getCurrentArtistParam(state),
    (user, artworks, galleryId, artist) => {
        if (!galleryId) return [];
        const isEditable = user && user.uid === galleryId;

        const galleryArtworks = getGalleryArtworks(galleryId, artworks, artist);
        const totalArtworks = galleryArtworks.length;
        const firstArtworkId = galleryArtworks.length > 0 ? galleryArtworks[0].artworkId : null;

        const titleData = getGalleryTitle(artist);

        return {
            ...titleData,
            isEditable,
            galleryArtworks,
            totalArtworks,
            firstArtworkId,
            galleryId,
            artist: artist
        };
    }
);

/*
* Get artworks based on gallery type.  If it's a user gallery
* the gallery key is the adminId.  Future gallery types
* may include artworks from all over.
* */
const getGalleryArtworks = (adminId, artworks, artist) => {
    const galleryArtworks = getArtworksWithAdminId(artworks, adminId);

    if (artist) {
        const artistArtworkIds = Object.keys(galleryArtworks).filter(artworkId => artist === galleryArtworks[artworkId].artist);
        let artistArtworks = {};
        for (let id of artistArtworkIds) {
            artistArtworks[id] = galleryArtworks[id];
        }
        return getArtworksByDate(artistArtworks);
    }

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

        return { currentArtwork, isEditable, nextArtwork, previousArtwork };
    }
);

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
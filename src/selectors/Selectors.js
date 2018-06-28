import firebase from 'firebase/app';

export const getUserId = (state) => {
  const {user} = state;
  if(!user) return null;

  return user.uid;
};

export const getDeleteAuthError = (state) => {
    const {errors} = state;
    if(!errors) return null;

    return errors.userAuthDeleteError;
};

/*export const getUserAccountId = (state) => {
    const {user, account} = state;
    if(!user || !account) return null;

    if(account.adminId === user.uid){
        return account.accountId;
    }
    else{
        return null;
    }
};*/

export const getGallery = (state, props) => {
    const { galleries } = state;
    const { galleryId } = props;

    if (!galleries || !galleryId) return null;

    return galleries[galleryId];
};

export const getUserArtworks = (state) => {
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

export const getTotalUserArtworks = (state) => {
    const userArtworks = getUserArtworks(state);
    return userArtworks.length;
};

export const getMaxArtworksAllowed = (state) => {
    const {account} = state;
    if(!account) return null;

    if(account.type && account.type === 'family'){
        return 500;
    }
    else{
        return 7;
    }
};

export const getLatestUserArtwork = state => {
    const userArtworks = getUserArtworks(state);
    if (userArtworks.length === 0) return null;
    return userArtworks[0];
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
        galleryArtworks = Object.keys(artworks)
            .filter(artworkId => artworks[artworkId].adminId === key)
            .reduce((obj, key) => {
                obj[key] = artworks[key];
                return obj
            }, {});
    }
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

    if(userGalleryArr.length === 0){
        return null;
    }
    else{
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
            label = 'GOOGLE'; break;
        case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
            label = 'FACEBOOK'; break;
        case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
            label = 'TWITTER'; break;
        case firebase.auth.EmailAuthProvider.PROVIDER_ID:
            label = 'EMAIL / PASSWORD'; break;

        default:
            return null;
    }

    return {
        label, id:user.providerId
    }
};

export const getArtwork = (state, props) => {
    const {artworks} = state;
    const {artworkId} = props;

    if(!artworks || !artworkId) return null;

    return artworks[artworkId];
};

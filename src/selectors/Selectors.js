export const getUserArtworks = (userId, artworks) => {
    return Object.keys(artworks)
        .filter(artworkId => artworks[artworkId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = artworks[key];
            return obj
        }, {});
};

export const getGallery = (state, props) => {
    const {galleries} = state;
    const {galleryId} = props;

    if(!galleries || !galleryId) return null;

    return galleries[galleryId];
};

export const getTotalUserArtworks = (userId, artworks) => {
    return Object.keys(getUserArtworks(userId, artworks)).length;
};

export const getCurrentGalleryData = (user, galleries, artworks, galleryId) => {

    const gallery = galleries[galleryId];
    if (!gallery) return null;

    const isEditable = user && user.uid === gallery.adminId;
    const galleryArtworks = getGalleryArtworks(gallery, artworks);
    const firstArtworkId = galleryArtworks.length > 0 ? galleryArtworks[0].artworkId : null;

    return {...gallery, isEditable, galleryArtworks, firstArtworkId };
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

            if (i < totalArtworks - 1) {
                nextArtwork = galleryArtworks[i + 1]
            }

            break;
        }
    }

    const isEditable = !currentArtwork ? false : currentArtwork.adminId === userId;

    return { currentArtwork, isEditable, nextArtwork, previousArtwork };
};

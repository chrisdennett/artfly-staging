export const getUserArtworks = (userId, artworks) => {
    return Object.keys(artworks)
        .filter(artworkId => artworks[artworkId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = artworks[key];
            return obj
        }, {});
};

export const getUserResources = (userId, resources) => {
    return Object.keys(resources)
        .filter(resourceId => resources[resourceId].adminId === userId)
        .reduce((obj, key) => {
            obj[key] = resources[key];
            return obj
        }, {});
};

export const getTotalUserArtworks = (userId, artworks) => {
    return Object.keys(getUserArtworks(userId, artworks)).length;
};
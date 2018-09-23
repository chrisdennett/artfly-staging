export const ROUND_TO = (number, decimalPlaces) => {
    // e.g. to 3 decimal places time by 1000, round, then divide by 1000
    const multiplier = Math.pow(10,decimalPlaces);
    return Math.round(number * multiplier) /  multiplier;
};

export const GALLERY_PATH = (galleryId) => {
    return `/gallery/galleryId_${galleryId}_galleryId`;
};

export const ADD_ARTWORK_PATH = (galleryId) => {
    return `/artworkAdder/galleryId_${galleryId}_galleryId`;
};

export const ARTWORK_PATH = (galleryId, artworkId) => {
    return `/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`;
};

export const TO_DATE_TEXT = (dateNumber) => {
    const d = new Date(dateNumber);
    const date = d.getDate();
    if(isNaN(date)) return '...';

    const monthIndex = d.getMonth();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
    const year = d.getFullYear();

    return`${date} ${month} ${year}`;
};

// Used to generate unique image names
// used getTime and extra random digits to deal with 2 images
// created in the same ms.
// https://gist.github.com/gordonbrander/2230317
export function generateUID() {
    let d = new Date().getTime();
    return d + '_' + Math.random().toString(36).substr(2, 4);
}
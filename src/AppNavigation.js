import history from "./app/global/history";

/*function getRoutePrefix(){
    const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
    return urlEndsInSlash ? '' : '/';
}*/

const param = (key, value) => {
    return `${key}_${value}_${key}`
};

export function goHome(){
    history.push(`/`);
}

export function goToGallery(galleryId) {
    const gallery = param('galleryId', galleryId);

    history.push(`/gallery/${gallery}`);
}

export function goToArtwork(galleryId, artworkId) {
    const gallery = param('galleryId', galleryId);
    const artwork = param('artworkId', artworkId);

    history.push(`/gallery/${gallery}/${artwork}`);
}

export function goToArtworkAdder(galleryId) {
    const gallery = param('galleryId', galleryId);

    history.push(`/artworkAdder/${gallery}`);
}

export function goToArtworkEditor(galleryId, artworkId, editor) {
    const gallery = param('galleryId', galleryId);
    const artwork = param('artworkId', artworkId);
    const edit = param('editor', editor);

    history.push(`/artworkEditor/${gallery}/${artwork}/${edit}`);
}

export function goToGalleryEditor(galleryId) {
    const gallery = param('galleryId', galleryId);
    history.push(`/galleryEditor/${gallery}`);
}
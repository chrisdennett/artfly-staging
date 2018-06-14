import history from "./app/global/history";

// TODO: Move history logic here and remove separate history file.
/*function getRoutePrefix(){
    const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
    return urlEndsInSlash ? '' : '/';
}*/

export function goToGallery(galleryId){
    history.push(`/gallery/galleryId_${galleryId}_galleryId`);
}

export function goToArtwork(galleryId, artworkId){
    history.push(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`);
}

export function goToArtworkAdder(galleryId){
    history.push(`/artworkAdder/galleryId_${galleryId}_galleryId`);
}
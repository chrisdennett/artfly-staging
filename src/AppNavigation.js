import history from "./app/global/history";

function getRoutePrefix(){
    const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
    return urlEndsInSlash ? '' : '/';
}

export function goToGallery(galleryId){
    history.push(`/gallery/galleryId_${galleryId}_galleryId`);
}

export function goToArtwork(galleryId, artworkId){
    history.push(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`);
}
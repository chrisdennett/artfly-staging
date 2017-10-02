export const SET_GALLERY_HEIGHT = "setGalleryHeight";
export const GET_GALLERY_PARAMS = "getGalleryParams";
export const ALREADY_CACHED = "alreadyCached";

let currentGalleryArtworks = null;

export function setGalleryHeight(galleryHeight) {

    return dispatch => {
        dispatch({
            type: SET_GALLERY_HEIGHT,
            payload: galleryHeight
        })
    }
}

export function getGalleryParams(totalArtworks) {

    return dispatch => {
        if(currentGalleryArtworks === totalArtworks){
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        currentGalleryArtworks = totalArtworks;
        const hue = 185;
        const saturation = 34;
        const lightness = 61;

        const nameSectionHue = 290;

        const roofHeight = 364;
        const nameHeight = 422;
        const bottomHeight = 500;
        const windowHeight = 250;
        const verticalPadding = 60;
        const windowsPerFloor = 3;
        const floors = Math.ceil(totalArtworks / windowsPerFloor);

        const windowsHeight = (floors * windowHeight) + (verticalPadding * 2);

        const galleryHeight = roofHeight + nameHeight + windowsHeight + bottomHeight;
        const galleryWidth = 800;

        const galleryParams = {
            hue, saturation, lightness,nameSectionHue, roofHeight,
            nameHeight, windowsHeight, bottomHeight, galleryWidth, galleryHeight
        };

        dispatch({
            type: GET_GALLERY_PARAMS,
            payload: galleryParams
        })
    }
}
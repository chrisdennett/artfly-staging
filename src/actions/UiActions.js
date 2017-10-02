export const SET_GALLERY_HEIGHT = "setGalleryHeight";
export const GET_GALLERY_PARAMS = "getGalleryParams";
export const ALREADY_CACHED = "alreadyCached";

let currentGalleryArtworks = null;
let currentInMobileMode = null;

export function setGalleryHeight(galleryHeight) {

    return dispatch => {
        dispatch({
            type: SET_GALLERY_HEIGHT,
            payload: galleryHeight
        })
    }
}

export function getGalleryParams(totalArtworks, inMobileMode) {

    return dispatch => {
        if(inMobileMode === currentInMobileMode && currentGalleryArtworks === totalArtworks){
            dispatch({
                type: ALREADY_CACHED,
                payload: {}
            });
            return;
        }

        currentGalleryArtworks = totalArtworks;
        currentInMobileMode = inMobileMode;

        const hue = 185;
        const saturation = 34;
        const lightness = 61;

        const nameSectionHue = 290;

        const roofHeight = 364;
        const nameHeight = 422;
        const bottomHeight = 500;

        // Windows sections
        const windowsSectionPadding = {top:60, right:45, bottom:60, left:45};

        const windowsPerFloor = inMobileMode ? 2 : 3;
        const origWindowWidth = 190;
        const origWindowHeight = 206;

        const mobileScaleUp = 1.7;
        const windowFrameWidth = inMobileMode ? origWindowWidth*mobileScaleUp : origWindowWidth;
        const windowFrameHeight = inMobileMode ? origWindowHeight*mobileScaleUp : origWindowHeight;


        let windowPadding =  {top:5, right:23, bottom:25, left:23};
        if(inMobileMode){
            windowPadding =  {top:5, right:15, bottom:15, left:15};
        }

        const windowWidth = windowFrameWidth;
        const windowHeight = windowFrameHeight;
        const windowWidthWidthPadding = windowWidth + windowPadding.left + windowPadding.right;
        const windowHeightWidthPadding = windowHeight + windowPadding.top + windowPadding.bottom;

        const floors = Math.ceil(totalArtworks / windowsPerFloor);

        const windowsHeight = (floors * windowHeightWidthPadding) + (windowsSectionPadding.top + windowsSectionPadding.bottom);

        const galleryHeight = roofHeight + nameHeight + windowsHeight + bottomHeight;
        const galleryWidth = 800;

        const galleryParams = {
            hue, saturation, lightness, nameSectionHue, roofHeight, windowWidth, windowsSectionPadding,
            windowPadding, windowHeight, nameHeight, windowsHeight, bottomHeight, galleryWidth, galleryHeight
        };

        dispatch({
            type: GET_GALLERY_PARAMS,
            payload: galleryParams
        })
    }
}
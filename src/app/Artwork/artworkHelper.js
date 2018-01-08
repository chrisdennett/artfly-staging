//source:   3000x3000 (max)
//large:    960x960
//medium:   640x640
//thumb:    150x150
export const getAppropriateUrl = ({ imgWidth, imgHeight, url, url_large, url_med, thumb_url }) => {
    let artworkUrl;
    const largestImgEdge = imgWidth > imgHeight ? imgWidth : imgHeight;

    if (largestImgEdge <= 150 && thumb_url) {
        artworkUrl = thumb_url;
    }
    else if (largestImgEdge <= 640 && url_med) {
        artworkUrl = url_med;
    }
    else if (largestImgEdge <= 960 && url_large) {
        artworkUrl = url_large;
    }
    else {
        artworkUrl = url;
    }

    return artworkUrl;
}
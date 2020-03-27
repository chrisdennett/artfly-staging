export const GALLERY_PATH = (galleryId, artist) => {
    let galleryPath = `/gallery?gallery=${galleryId}`;

    if (artist) {
        galleryPath += `&artist=${artist}`;
    }

    return galleryPath;
};

export const ARTWORK_PATH = (artworkId, galleryId, artistId) => {
    let artworkPath = `/artwork?artwork=${artworkId}`;

    if (galleryId) {
        artworkPath += `&gallery=${galleryId}`;
    }

    if (artistId) {
        artworkPath += `&artist=${artistId}`;
    }

    return artworkPath;

    //return `/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`;
};

export const EDITOR_PATH = (galleryId, artworkId, artistId) => {
    let editorPath = '/artworkMaker';

    if (artworkId) {
        editorPath += `?artwork=${artworkId}`;
    }
    else {
        editorPath += `?newArtwork=true`;
    }

    if (galleryId) {
        editorPath += `&gallery=${galleryId}`;
    }

    if (artistId) {
        editorPath += `&artist=${artistId}`;
    }

    return editorPath;
};

export const TO_DATE_TEXT = (dateNumber) => {
    const d = new Date(dateNumber);
    const date = d.getDate();
    if (isNaN(date)) return '...';

    const monthIndex = d.getMonth();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
    const year = d.getFullYear();

    return `${date} ${month} ${year}`;
};

//
export const mmToPixels = (mms) => mms * 3.7795275591;

// Used to generate unique ids
// used getTime and extra random digits to deal with 2 images
// created in the same ms.
// https://gist.github.com/gordonbrander/2230317
export function generateUID() {
    let d = new Date().getTime();
    return d + '_' + Math.random().toString(36).substr(2, 4);
}

export const ROUND_TO = (number, decimalPlaces) => {
    // e.g. to 3 decimal places time by 1000, round, then divide by 1000
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(number * multiplier) / multiplier;
};

export const loadImage = (url, callback) => {
    let sourceImg = new Image();
    sourceImg.setAttribute('crossOrigin', 'anonymous'); //
    sourceImg.src = url;
    sourceImg.onload = () => {
        if (callback) callback(sourceImg);
    }
};

// Reads file as Array buffer to get camera orientation from exif data
function GetPhotoOrientation(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const view = new DataView(e.target.result);

        if (view.getUint16(0, false) !== 0xFFD8) return callback(-2);
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
            let marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xFFE1) {
                offset += 2;
                if (view.getUint32(offset, false) !== 0x45786966) return callback(-1);

                const little = view.getUint16(offset += 6, false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                const tags = view.getUint16(offset, little);
                offset += 2;
                for (let i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) === 0x0112)
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
            else if ((marker & 0xFF00) !== 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
}

export function getDimensionRatios(w, h) {
    const widthToHeightRatio = Math.round(100 * (h / w)) / 100;
    const heightToWidthRatio = Math.round(100 * (w / h)) / 100;

    return { widthToHeightRatio, heightToWidthRatio };
}

// Returns an image element given a file
export function GetImage(imgFile, callback) {
    GetPhotoOrientation(imgFile, (orientation) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgSrc = e.target.result;
            // Create a new image element
            let img = new Image();
            img.setAttribute('crossOrigin', 'anonymous'); //
            img.src = imgSrc;

            // wait for it to be loaded and then return
            img.onload = (e) => {
                const w = img.width;
                const h = img.height;

                // if portrait these need to be reversed
                const isPortrait = orientation > 4 && orientation < 9;
                let widthToHeightRatio, heightToWidthRatio;

                if (isPortrait) {
                    widthToHeightRatio = Math.round(100 * (w / h)) / 100;
                    heightToWidthRatio = Math.round(100 * (h / w)) / 100;
                }
                else {
                    widthToHeightRatio = Math.round(100 * (h / w)) / 100;
                    heightToWidthRatio = Math.round(100 * (w / h)) / 100;
                }

                callback(img, orientation, widthToHeightRatio, heightToWidthRatio);
            }
        };
        reader.readAsDataURL(imgFile);
    })
}

export function getImageBlob({ canvas, quality = 0.95 }, callback) {
    // quality is no longer used because I'm saving as png
    // TODO: considier using image/webp
    //  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
    //  https://developers.google.com/speed/webp/
    canvas.toBlob((canvasBlobData) => {
        callback(canvasBlobData)
    }, 'image/jpeg', quality);
}

export const getDimensionsToFit = (inputWidth, inputHeight, maxWidth, maxHeight) => {
    let outputWidth, outputHeight;
    const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(inputWidth, inputHeight);

    // if the width need reducing, set width to max and scale height accordingly
    if (inputWidth > maxWidth) {
        outputWidth = maxWidth;
        outputHeight = outputWidth * widthToHeightRatio;

        if (outputHeight > maxHeight) {
            outputHeight = maxHeight;
            outputWidth = outputHeight * heightToWidthRatio;
        }
    }
    // if the height need reducing, set height to max and scale width accordingly
    else if (inputHeight > maxHeight) {
        outputHeight = maxHeight;
        outputWidth = outputHeight * heightToWidthRatio;
    }
    // otherwise output can match input
    else {
        outputWidth = inputWidth;
        outputHeight = inputHeight;
    }

    return { width: outputWidth, height: outputHeight };
};

// https://stackoverflow.com/questions/3732046/how-do-you-get-the-hue-of-a-xxxxxx-colour
export const hexToHsl = (hexColour) => {
    // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
    const red = parseInt(hexColour.substr(1, 2), 16);
    const green = parseInt(hexColour.substr(3, 2), 16);
    const blue = parseInt(hexColour.substr(5, 2), 16);

    return rgbToHsl({ red, green, blue })
};

export const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// https://stackoverflow.com/questions/3732046/how-do-you-get-the-hue-of-a-xxxxxx-colour
export const rgbToHsl = ({ red, green, blue }) => {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }

    // hue is in degrees, saturation and lightness in percentages
    return { hue: Math.round(h * 360), saturation: s * 100, lightness: l * 100 };
};

// https://stackoverflow.com/questions/3732046/how-do-you-get-the-hue-of-a-xxxxxx-colour
export const hslToHex = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const containsNonBlankText = (testStr) => {
    if (!testStr) return false;

    return /\S/.test(testStr);
}

// let lastUpdateText = '';
    // if (latestArtwork) {
    //     const d = new Date(latestArtwork.lastUpdated);
    //     const date = d.getDate();
    //     const monthIndex = d.getMonth();
    //     const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
    //     const year = d.getFullYear();

    //     lastUpdateText = ` Lastest: ${date} ${month} ${year}`;
    // }

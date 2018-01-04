const maxImageWidth = 3000;
const maxImageHeight = 3000;

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

                const widthToHeightRatio = h / w;
                const heightToWidthRatio = w / h;

                callback(img, orientation, widthToHeightRatio, heightToWidthRatio);
            }
        };
        reader.readAsDataURL(imgFile);
    })
}

export function GetImageFromUrl(imgUrl, callback) {
    const imgSrc = imgUrl;
    // Create a new image element
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgSrc;

    // wait for it to be loaded and then return
    img.onload = (e) => {
        const w = img.width;
        const h = img.height;

        const widthToHeightRatio = h / w;
        const heightToWidthRatio = w / h;

        callback(img, widthToHeightRatio, heightToWidthRatio);
    }
}

/*export function LoadImage(imgSrc, callback) {
    let img = new Image();
    // the lack of this crossOrigin line caused me a world of pain!!!
    // https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror/27260385#27260385
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgSrc;
    // wait for it to be loaded and then return
    img.onload = (e) => {
        callback(e.target);
    }
}*/

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

// TODO: The following 3 functions should probably just be a single function with internal sub-functions if needed


// Draws one canvas to another restricting to a specific size
export function drawToCanvas({ sourceCanvas, outputCanvas, orientation, cropPercents, maxOutputCanvasWidth = maxImageWidth, maxOutputCanvasHeight = maxImageHeight }, callback) {

    const { topPercent, rightPercent, bottomPercent, leftPercent } = cropPercents ?
        cropPercents : { topPercent: 0, rightPercent: 1, bottomPercent: 1, leftPercent: 0 };

    const isPortrait = orientation > 4 && orientation < 9;

    // switch height and width if it's portrait
    let imgW = isPortrait ? sourceCanvas.height : sourceCanvas.width;
    let imgH = isPortrait ? sourceCanvas.width : sourceCanvas.height;

    // work out the crop sizes from the percentages
    const leftCrop = imgW * leftPercent;
    const rightCrop = imgW * (1 - rightPercent);
    const topCrop = imgH * topPercent;
    const bottomCrop = imgH * (1 - bottomPercent);
    imgW -= leftCrop + rightCrop;
    imgH -= topCrop + bottomCrop;

    // Restrict to maximum image size allowed or sourceCanvas size, whichever is smaller
    const maxW = imgW >= maxOutputCanvasWidth ? maxOutputCanvasWidth : imgW;
    const maxH = imgH >= maxOutputCanvasHeight ? maxOutputCanvasHeight : imgH;

    const widthToHeightRatio = imgH / imgW;
    const heightToWidthRatio = imgW / imgH;

    let canvasW = maxW;
    let canvasH = maxW * widthToHeightRatio;

    if (canvasH > maxH) {
        canvasH = maxH;
        canvasW = maxH * heightToWidthRatio;
    }

    const ctx = outputCanvas.getContext('2d');
    ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

    outputCanvas.width = canvasW;
    outputCanvas.height = canvasH;

    let xCropStart = leftCrop;
    let yCropStart = topCrop;

    // save the context so it can be reset after transform
    ctx.save();
    // transform context before drawing image
    switch (orientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, canvasH, 0);
            break;
        case 3:
            xCropStart = rightCrop;
            yCropStart = bottomCrop;
            ctx.transform(-1, 0, 0, -1, canvasW, canvasH);
            break;
        case 4:
            ctx.transform(1, 0, 0, -1, 0, canvasW);
            break;
        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            xCropStart = topCrop;
            yCropStart = rightCrop;
            ctx.transform(0, 1, -1, 0, canvasW, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, canvasW, canvasH);
            break;
        case 8:
            xCropStart = bottomCrop;
            yCropStart = leftCrop;
            ctx.transform(0, -1, 1, 0, 0, canvasH);
            break;
        default:
            break;
    }

    const transformedCanvasW = isPortrait ? canvasH : canvasW;
    const transformedCanvasH = isPortrait ? canvasW : canvasH;

    const transformedImgW = isPortrait ? imgH : imgW;
    const transformedImgH = isPortrait ? imgW : imgH;

    // draw image: context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    ctx.drawImage(sourceCanvas, xCropStart, yCropStart, transformedImgW, transformedImgH, 0, 0, transformedCanvasW, transformedCanvasH);
    // restore ensures resets transform in case another image is added
    ctx.restore();

    if (callback) callback(widthToHeightRatio, heightToWidthRatio)
}

// Draws an image to a canvas
/*export function drawImageToCanvas(img, canvas, orientation, cropDataPercents, callback) {

    // default crop data to zero cropping
    const { topPercent, rightPercent, bottomPercent, leftPercent } = cropDataPercents ?
        cropDataPercents : { topPercent: 0, rightPercent: 1, bottomPercent: 1, leftPercent: 0 };

    const isPortrait = orientation > 4 && orientation < 9;

    const imgW = isPortrait ? img.height : img.width;
    const imgH = isPortrait ? img.width : img.height;

    // Restrict to maximum image size allowed or img size, whichever is smaller
    const maxW = imgW >= maxImageWidth ? maxImageWidth : imgW;
    const maxH = imgH >= maxImageHeight ? maxImageHeight : imgH;

    const widthToHeightRatio = imgH / imgW;
    const heightToWidthRatio = imgW / imgH;

    let canvasW = maxW;
    let canvasH = maxW * widthToHeightRatio;

    if (canvasH > maxH) {
        canvasH = maxH;
        canvasW = maxH * heightToWidthRatio;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = canvasW;
    canvas.height = canvasH;

    // save the context so it can be reset after transform
    ctx.save();
    // transform context before drawing image
    switch (orientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, canvasH, 0);
            break;
        case 3:
            ctx.transform(-1, 0, 0, -1, canvasW, canvasH);
            break;
        case 4:
            ctx.transform(1, 0, 0, -1, 0, canvasW);
            break;
        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            ctx.transform(0, 1, -1, 0, canvasW, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, canvasW, canvasH);
            break;
        case 8:
            ctx.transform(0, -1, 1, 0, 0, canvasH);
            break;
        default:
            break;
    }

    const transformedCanvasW = isPortrait ? canvasH : canvasW;
    const transformedCanvasH = isPortrait ? canvasW : canvasH;

    // draw image
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, transformedCanvasW, transformedCanvasH);
    // restore ensures resets transform in case another image is added
    ctx.restore();

    callback(widthToHeightRatio, heightToWidthRatio);
}*/

// Draws one canvas to another restricting to a specific size
/*export function drawCanvasToCanvas(outputCanvas, maxOutputWidth, maxOutputHeight, sourceCanvas, leftX, topY, rightX, bottomY) {
    const sourceWidth = rightX - leftX;
    const sourceHeight = bottomY - topY;

    const outputX = 0;
    const outputY = 0;
    let outputWidth = maxOutputWidth;
    const widthToHeightRatio = sourceHeight / sourceWidth;
    let outputHeight = outputWidth * widthToHeightRatio;

    if (outputHeight > maxOutputHeight) {
        outputHeight = maxOutputHeight;
        const heightToWidthRatio = sourceWidth / sourceHeight;
        outputWidth = outputHeight * heightToWidthRatio;
    }

    outputCanvas.width = outputWidth;
    outputCanvas.height = outputHeight;

    outputCanvas
        .getContext('2d')
        .drawImage(sourceCanvas, leftX, topY, sourceWidth, sourceHeight,
            outputX, outputY, outputWidth, outputHeight);
}*/

// Draws one canvas to another restricting to a specific size
/*
export function drawCanvasToCanvasWithRotation(sourceCanvas, outputCanvas, orientation, maxCanvasWidth, maxCanvasHeight, callback) {
    const isPortrait = orientation > 4 && orientation < 9;

    const imgW = isPortrait ? sourceCanvas.height : sourceCanvas.width;
    const imgH = isPortrait ? sourceCanvas.width : sourceCanvas.height;

    // Restrict to maximum image size allowed or sourceCanvas size, whichever is smaller
    const maxW = imgW >= maxCanvasWidth ? maxCanvasWidth : imgW;
    const maxH = imgH >= maxCanvasHeight ? maxCanvasHeight : imgH;

    const widthToHeightRatio = imgH / imgW;
    const heightToWidthRatio = imgW / imgH;

    let canvasW = maxW;
    let canvasH = maxW * widthToHeightRatio;

    if (canvasH > maxH) {
        canvasH = maxH;
        canvasW = maxH * heightToWidthRatio;
    }

    const ctx = outputCanvas.getContext('2d');
    ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

    outputCanvas.width = canvasW;
    outputCanvas.height = canvasH;

    // save the context so it can be reset after transform
    ctx.save();
    // transform context before drawing image
    switch (orientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, canvasH, 0);
            break;
        case 3:
            ctx.transform(-1, 0, 0, -1, canvasW, canvasH);
            break;
        case 4:
            ctx.transform(1, 0, 0, -1, 0, canvasW);
            break;
        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            ctx.transform(0, 1, -1, 0, canvasW, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, canvasW, canvasH);
            break;
        case 8:
            ctx.transform(0, -1, 1, 0, 0, canvasH);
            break;
        default:
            break;
    }

    const transformedCanvasW = isPortrait ? canvasH : canvasW;
    const transformedCanvasH = isPortrait ? canvasW : canvasH;

    // draw image
    ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, transformedCanvasW, transformedCanvasH);
    // restore ensures resets transform in case another image is added
    ctx.restore();

    if (callback) callback(widthToHeightRatio, heightToWidthRatio)
}*/

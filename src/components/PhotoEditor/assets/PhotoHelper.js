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
                callback(e.target, orientation);
            }
        };
        reader.readAsDataURL(imgFile);
    })
}

export function LoadImage(imgSrc, callback){
    let img = new Image();
    // the lack of this crossOrigin line caused me a world of pain!!!
    // https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror/27260385#27260385
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgSrc;
    // wait for it to be loaded and then return
    img.onload = (e) => {
        callback(e.target);
    }
}

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

// Draws one canvas to another restricting to a specific size
export function drawCanvasToCanvas(outputCanvas, maxOutputWidth, maxOutputHeight, sourceCanvas, leftX, topY, rightX, bottomY){
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
}
// https://stuk.github.io/jszip/
import JSZip from 'jszip';
// https://github.com/eligrey/FileSaver.js/
import saveAs from 'file-saver';


export const downloadSheetsZip = async (canvas) => {
    const zip = new JSZip();
    // Add an top-level, arbitrary text file with contents
    zip.file("Hello.txt", "Hello World\n");

    // Generate a directory within the Zip file structure
    const img = zip.folder("images");

    /*const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0,0,canvas.width, canvas.height);*/
    const canvasBlobData = await canvasToBlob(canvas);

    // Add a file to the directory, in this case an image with data URI as contents
    img.file("sheet_1.png", canvasBlobData, { base64: true });

    // Generate the zip file asynchronously
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // Force down of the Zip file
            saveAs(content, "archive.zip");
        });

};

const canvasToBlob = (canvas) => {
    return new Promise(resolve => {
        canvas.toBlob(blobData => {
                resolve(blobData);
            }
            , 'image/png'
        )
    })
}

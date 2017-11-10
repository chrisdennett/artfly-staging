// externals
import React, { Component } from "react";
// components
import ImageCuttingBoard from "./ImageCuttingBoard";
import SelectPhotoButton from "./assets/SelectPhotoButton";
import Butt from "../global/Butt";
// helper functions
import * as PhotoHelper from "./assets/PhotoHelper";

class PhotoUploader extends Component {

    constructor() {
        super();

        // initialise state
        this.state = { loadedImg: null, loadedImgOrientation: 1, cuttingBoardData: null };

        // bind functions
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.closeCuttingBoardCancel = this.closeCuttingBoardCancel.bind(this);
        this.onImageCuttingBoardDone = this.onImageCuttingBoardDone.bind(this);
        this.onCurrentImgDelete = this.onCurrentImgDelete.bind(this);
        this.onCurrentImgEdit = this.onCurrentImgEdit.bind(this);
        this.openCuttingBoard = this.openCuttingBoard.bind(this);
        this.getCanvasBlobData = this.getCanvasBlobData.bind(this);
        this.sendImageData = this.sendImageData.bind(this);
    }

    // User has selected a photo
    onPhotoSelected(e) {
        e.preventDefault();

        if (e.target.files[0]) {
            const imgFile = e.target.files[0];
            PhotoHelper.GetImage(imgFile, this.openCuttingBoard);
        }
    }

    openCuttingBoard(img, imgOrientation) {
        this.setState({ cuttingBoardOpen: true, loadedImg: img, loadedImgOrientation: imgOrientation });
    }

    closeCuttingBoardCancel() {
        this.setState({ cuttingBoardOpen: false });
    }

    onImageCuttingBoardDone(data) {
        this.setState({ cuttingBoardData: data, cuttingBoardOpen: false }, () => {
            this.sendImageData(data)
        });
    }

    sendImageData(data){
        const { canvas, leftX, topY, rightX, bottomY } = data;

        const croppedWidth = Math.round(rightX - leftX);
        const croppedHeight = Math.round(bottomY - topY);

        const widthToHeightRatio = Math.round(1000 * (croppedHeight / croppedWidth)) / 1000;
        const heightToWidthRatio = Math.round(1000 * (croppedWidth / croppedHeight)) / 1000;

        // create the large canvas
        PhotoHelper.drawToCanvas(this.maxCanvas, croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY);
        PhotoHelper.drawToCanvas(this.thumbCanvas, 150, 150, canvas, leftX, topY, rightX, bottomY);

        const imageData = {widthToHeightRatio, heightToWidthRatio};
        this.getCanvasBlobData(this.maxCanvas, (maxCanvasData) => {
            imageData.sourceBlob = maxCanvasData;

            this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                imageData.thumbBlob = thumbCanvasData;

                this.props.onUpdate(imageData);
            })
        });
    }

    getCanvasBlobData(canvas, callback){
        canvas.toBlob((canvasBlobData) => {
            callback(canvasBlobData);
        }, 'image/jpeg', 0.95)
    }

    onCurrentImgDelete() {
        this.setState({ loadedImg: null, loadedImgOrientation: 1, cuttingBoardData: null });
    }

    onCurrentImgEdit() {
        this.setState({ cuttingBoardOpen: true });
    }

    // DELETE FOR PRODUCTION
    /*__DEV_ONLY__setupImg = (img) => {
        if (img) {
            img.onload = (e) => {
                console.log("e.target: ", e.target);
                this.setState({ loadedImg: e.target, cuttingBoardOpen: true });
            }
        }
    };*/

    render() {
        const showCuttingBoard = this.state.cuttingBoardOpen;
        const showSelectPhotoButton = !this.state.cuttingBoardData;
        const showEditPhotoButton = this.state.cuttingBoardData;

        const editPhotoStyle = showEditPhotoButton ? { display: 'inherit' } : { display: 'none' };
        let initialCropData, initialRotation;
        if (this.state.cuttingBoardData) {
            let { canvas, rotation, ...rest } = this.state.cuttingBoardData;
            initialCropData = rest;
            initialRotation = rotation;
        }

        const orientation = initialRotation ? initialRotation : this.state.loadedImgOrientation;

        const responsiveCanvasStyle = { maxWidth: '100%' };
        const hiddenCanvasStyle = { display: 'none' };

        return (
            <div>
                <hr/>
                <h3>Photo Uploader</h3>

                {showSelectPhotoButton &&
                <SelectPhotoButton
                    uid={'cutting-board-selector'}
                    onPhotoSelect={this.onPhotoSelected}/>
                }

                <div style={editPhotoStyle}>
                    <canvas style={responsiveCanvasStyle} ref={(canvas) => this.maxCanvas = canvas}/>
                    <canvas style={hiddenCanvasStyle} ref={(canvas) => this.thumbCanvas = canvas}/>

                    <Butt style={{ display: 'inline-block' }} onClick={this.onCurrentImgEdit}>Edit</Butt>
                    <Butt style={{ display: 'inline-block' }} onClick={this.onCurrentImgDelete}>Delete</Butt>
                </div>

                {showCuttingBoard &&
                <ImageCuttingBoard
                    img={this.state.loadedImg}
                    defaultOrientation={orientation}
                    initialCropData={initialCropData}
                    onCancel={this.closeCuttingBoardCancel}
                    onDone={this.onImageCuttingBoardDone}/>
                }

                {/*<div style={{ display: 'none' }}>
                    <img ref={(img) => this.__DEV_ONLY__setupImg(img)} src='../../gallery-example.PNG' alt={'sample'}/>
                </div>*/}

            </div>
        );
    }
}

export default PhotoUploader;
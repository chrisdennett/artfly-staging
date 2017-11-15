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
        this.onEditPhoto = this.onEditPhoto.bind(this);
        this.onSave = this.onSave.bind(this);
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
        const { canvas, leftX, topY, rightX, bottomY } = data;
        const croppedWidth = Math.round(rightX - leftX);
        const croppedHeight = Math.round(bottomY - topY);
        const widthToHeightRatio = Math.round(1000 * (croppedHeight / croppedWidth)) / 1000;
        const heightToWidthRatio = Math.round(1000 * (croppedWidth / croppedHeight)) / 1000;
        const imageData = { widthToHeightRatio, heightToWidthRatio };

        this.setState({ cuttingBoardData: data, cuttingBoardOpen: false, imageData }, () => {
            PhotoHelper.drawCanvasToCanvas(this.maxCanvas, croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY);
            PhotoHelper.drawCanvasToCanvas(this.thumbCanvas, 150, 150, canvas, leftX, topY, rightX, bottomY);
        });
    }

    getCanvasBlobData(canvas, callback) {
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

    onEditPhoto() {
        PhotoHelper.LoadImage(this.props.url, (img) => {
            this.setState({ loadedImg: img, cuttingBoardOpen: true });
        })
    }

    onSave() {
        let { imageData } = this.state;
        this.getCanvasBlobData(this.maxCanvas, (maxCanvasData) => {
            imageData.sourceBlob = maxCanvasData;

            this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                imageData.thumbBlob = thumbCanvasData;

                if (this.props.onSave) this.props.onSave(imageData);
            })
        });
    }

    render() {
        const showCuttingBoard = this.state.cuttingBoardOpen;
        const editingExistingImage = this.props.url;
        const hasEditingData = this.state.cuttingBoardData;
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

                {!hasEditingData && !editingExistingImage &&
                <SelectPhotoButton
                    uid={'cutting-board-selector'}
                    onPhotoSelect={this.onPhotoSelected}/>
                }

                {!hasEditingData && editingExistingImage &&
                <div>
                    <img src={this.props.thumb_url} alt={'Current artwork thumb'}/>
                    <Butt label={'Edit Photo'} onClick={this.onEditPhoto}/>
                </div>
                }

                <div style={editPhotoStyle}>
                    <canvas style={responsiveCanvasStyle} ref={(canvas) => this.maxCanvas = canvas}/>
                    <canvas style={hiddenCanvasStyle} ref={(canvas) => this.thumbCanvas = canvas}/>

                    <Butt style={{ display: 'inline-block' }} onClick={this.onCurrentImgEdit}>Edit</Butt>
                    <Butt style={{ display: 'inline-block' }} onClick={this.onCurrentImgDelete}>Cancel</Butt>
                    <Butt style={{ display: 'inline-block' }} onClick={this.onSave}>Save</Butt>

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
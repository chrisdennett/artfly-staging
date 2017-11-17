// externals
import React, { Component } from "react";
// components
import SelectPhotoButton from "./assets/SelectPhotoButton";
import Butt from "../global/Butt";
// helper functions
import * as PhotoHelper from "./assets/PhotoHelper";
import ArtStudioModal from "./ArtStudioModal";

class PhotoUploader extends Component {

    constructor(props) {
        super(props);

        // initialise state
        this.state = { loadedImg: null, loadedImgOrientation: 1, cuttingBoardData: null };

        // bind functions
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onCuttingBoardCancel = this.onCuttingBoardCancel.bind(this);
        this.onImageCuttingBoardDone = this.onImageCuttingBoardDone.bind(this);
        this.onCurrentImgDelete = this.onCurrentImgDelete.bind(this);
        this.onCurrentImgEdit = this.onCurrentImgEdit.bind(this);
        this.openCuttingBoard = this.openCuttingBoard.bind(this);
        this.getCanvasBlobData = this.getCanvasBlobData.bind(this);
        this.onEditPhoto = this.onEditPhoto.bind(this);
        this.onSave = this.onSave.bind(this);

        // DEV HACK TO LOAD IMAGE STRAIGHT AWAY
        if (props.url) {
            this.onEditPhoto();
        }
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

    onCuttingBoardCancel() {
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
                <ArtStudioModal loadedImg={this.state.loadedImg}
                                orientation={orientation}
                                initialCropData={initialCropData}
                                onCancel={this.onCuttingBoardCancel}
                                onDone={this.onImageCuttingBoardDone}/>
                }

            </div>
        );
    }
}

export default PhotoUploader;
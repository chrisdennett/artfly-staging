// externals
import React, { Component } from "react";
// components
import SelectPhotoButton from "./assets/SelectPhotoButton";
// helper functions
import * as PhotoHelper from "./assets/PhotoHelper";
import ArtStudioModal from "./CropAndRotateModal";
import EditedPhotoPreview from "./EditedPhotoPreview";

class PhotoUploader extends Component {

    constructor(props) {
        super(props);

        // initialise state
        this.state = { isSaving: false, loadedImg: null, loadedImgOrientation: 1, cuttingBoardData: null };

        // bind functions
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onCuttingBoardCancel = this.onCuttingBoardCancel.bind(this);
        this.onImageCuttingBoardDone = this.onImageCuttingBoardDone.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCurrentImgEdit = this.onCurrentImgEdit.bind(this);
        this.openCuttingBoard = this.openCuttingBoard.bind(this);
        this.onEditPhoto = this.onEditPhoto.bind(this);

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
        this.setState({ cuttingBoardOpen: false }, () => {
            this.props.onCancel(this.props.artworkId);
        })
    }

    onImageCuttingBoardDone(data) {
        const { canvas, leftX, topY, rightX, bottomY } = data;
        const croppedWidth = Math.round(rightX - leftX);
        const croppedHeight = Math.round(bottomY - topY);
        const widthToHeightRatio = Math.round(1000 * (croppedHeight / croppedWidth)) / 1000;
        const heightToWidthRatio = Math.round(1000 * (croppedWidth / croppedHeight)) / 1000;
        const imageData = { widthToHeightRatio, heightToWidthRatio };

        const {userId, artistId, artworkId, isUpdate} = this.props;

        const previewData = { isUpdate, userId, artistId, artworkId, croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY, widthToHeightRatio, heightToWidthRatio };

        this.setState({ cuttingBoardData: data, cuttingBoardOpen: false, imageData, previewData });
    }

    onCancel() {
        this.props.onCancel();
    }

    onCurrentImgEdit() {
        this.setState({ cuttingBoardOpen: true });
    }

    onEditPhoto() {
        PhotoHelper.LoadImage(this.props.url, (img) => {
            this.setState({ loadedImg: img, cuttingBoardOpen: true });
        })
    }

    render() {
        const showCuttingBoard = this.state.cuttingBoardOpen;
        const hasEditingData = this.state.cuttingBoardData;
        const showEditedPhotoPreview = this.state.cuttingBoardData;

        // const editPhotoStyle = showEditedPhotoPreview ? { display: 'inherit' } : { display: 'none' };
        let initialCropData, initialRotation;
        if (this.state.cuttingBoardData) {
            let { canvas, rotation, ...rest } = this.state.cuttingBoardData;
            initialCropData = rest;
            initialRotation = rotation;
        }

        const orientation = initialRotation ? initialRotation : this.state.loadedImgOrientation;

        if (this.state.isSaving) return <div>Is saving...</div>;

        return (
            <div>
                {!hasEditingData && !this.props.url &&
                <SelectPhotoButton
                    uid={'cutting-board-selector'}
                    onPhotoSelect={this.onPhotoSelected}/>
                }

                {showEditedPhotoPreview &&
                <EditedPhotoPreview previewData={this.state.previewData}
                                    onCurrentImgEdit={this.onCurrentImgEdit}
                                    onUploadComplete={this.props.onUploadComplete}
                                    onCancel={this.onCancel}/>
                }

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
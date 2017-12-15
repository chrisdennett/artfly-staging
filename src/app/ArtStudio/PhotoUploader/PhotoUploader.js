// externals
import React, { Component } from "react";
// components
import EditedPhotoPreview from "../PhotoEditor/EditedPhotoPreview";
import PhotoUploadCanvas from "../PhotoEditor/PhotoUploadCanvas";

class PhotoUploader extends Component {

    constructor() {
        super();

        this.state = { previewData: null, showPhotoPreview: false };

        this.onCancel = this.onCancel.bind(this);
        this.onCurrentImgEdit = this.onCurrentImgEdit.bind(this);
        this.onPhotoUploadCanvasInit = this.onPhotoUploadCanvasInit.bind(this);
    }

    onPhotoUploadCanvasInit(photoUploadCanvas, widthToHeightRatio, heightToWidthRatio) {
        const previewData = { canvas: photoUploadCanvas, widthToHeightRatio, heightToWidthRatio };

        this.setState({ previewData, showPhotoPreview: true });
    }

    // Cutting board now separate so this data may get passed in
    // could perhaps use a helper to do the calculations.
    /*onImageCuttingBoardDone(data) {
        const { canvas, leftX, topY, rightX, bottomY } = data;
        const croppedWidth = Math.round(rightX - leftX);
        const croppedHeight = Math.round(bottomY - topY);
        const widthToHeightRatio = Math.round(1000 * (croppedHeight / croppedWidth)) / 1000;
        const heightToWidthRatio = Math.round(1000 * (croppedWidth / croppedHeight)) / 1000;
        const imageData = { widthToHeightRatio, heightToWidthRatio };

        const previewData = { croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY, widthToHeightRatio, heightToWidthRatio };

        this.setState({ cuttingBoardData: data, showCuttingBoard: false, showPhotoPreview: true, imageData, previewData });
    }*/

    onCancel() {
        this.props.onCancel();
    }

    onCurrentImgEdit() {
        this.props.onEdit(this.props.img);
    }

    render() {
        const { isNewImage, userId, artistId, artworkId, cuttingBoardData } = this.props;
        const { previewData } = this.state;

        const editPhotoPreviewData = previewData ? previewData : cuttingBoardData;

        let initialCropData, initialRotation;
        if (cuttingBoardData) {
            let { canvas, rotation, ...rest } = cuttingBoardData;
            initialCropData = rest;
            initialRotation = rotation;
        }

        const artworkData = { isNewImage, userId, artistId, artworkId };
        const orientation = initialRotation ? initialRotation : this.props.initialOrientation;

        return (
            <div style={{ height: '100%' }}>
                <PhotoUploadCanvas img={this.props.img}
                                   orientation={this.props.initialOrientation}
                                   onCanvasInit={this.onPhotoUploadCanvasInit}/>

                {editPhotoPreviewData &&
                <EditedPhotoPreview previewData={editPhotoPreviewData}
                                    artworkData={artworkData}
                                    onCurrentImgEdit={this.onCurrentImgEdit}
                                    onUploadStart={this.props.onUploadStart}
                                    onUploadComplete={this.props.onUploadComplete}
                                    onCancel={this.onCancel}/>
                }

                {/*{showCuttingBoard &&
                <CropAndRotateModal loadedImg={this.props.img}
                                    imgUrl={this.props.url}
                                    orientation={orientation}
                                    initialCropData={initialCropData}
                                    onCancel={this.onCuttingBoardCancel}
                                    onDone={this.onImageCuttingBoardDone}/>
                }*/}

            </div>
        );
    }
}

export default PhotoUploader;
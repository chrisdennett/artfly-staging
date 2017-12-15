// externals
import React, { Component } from "react";
// components
import CropAndRotateModal from "../CropAndRotate/CropAndRotateModal";
// import EditedPhotoPreview from "./EditedPhotoPreview";
// import PhotoUploadCanvas from "./PhotoUploadCanvas";

class PhotoEditor extends Component {

    constructor() {
        super();

        this.state = { cuttingBoardData: null, previewData: null };

        this.onCuttingBoardCancel = this.onCuttingBoardCancel.bind(this);
        this.onImageCuttingBoardDone = this.onImageCuttingBoardDone.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCuttingBoardCancel() {
        this.props.onCancel();
    }

    onImageCuttingBoardDone(data) {
        const { canvas, leftX, topY, rightX, bottomY } = data;
        const croppedWidth = Math.round(rightX - leftX);
        const croppedHeight = Math.round(bottomY - topY);
        const widthToHeightRatio = Math.round(1000 * (croppedHeight / croppedWidth)) / 1000;
        const heightToWidthRatio = Math.round(1000 * (croppedWidth / croppedHeight)) / 1000;
        const imageData = { widthToHeightRatio, heightToWidthRatio };

        const previewData = { croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY, widthToHeightRatio, heightToWidthRatio };

        this.props.onDone(previewData);

        this.setState({ cuttingBoardData: data, imageData, previewData });
    }

    onCancel() {
        this.props.onCancel();
    }

    render() {
        const { img, url, initialOrientation } = this.props;

        let initialCropData, initialRotation;
        if (this.state.cuttingBoardData) {
            let { canvas, rotation, ...rest } = this.state.cuttingBoardData;
            initialCropData = rest;
            initialRotation = rotation;
        }

        const orientation = initialRotation ? initialRotation : initialOrientation;

        return (
            <CropAndRotateModal loadedImg={img}
                                imgUrl={url}
                                orientation={orientation}
                                initialCropData={initialCropData}
                                onCancel={this.onCuttingBoardCancel}
                                onDone={this.onImageCuttingBoardDone}/>
        );
    }
}

export default PhotoEditor;
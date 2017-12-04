// externals
import React, { Component } from "react";
// components
import CropAndRotateModal from "./CropAndRotateModal";
import EditedPhotoPreview from "./EditedPhotoPreview";
import PhotoUploadCanvas from "./PhotoUploadCanvas";

class PhotoEditor extends Component {

    constructor(props) {
        super(props);

        const showCuttingBoard = props.openCuttingBoard || false;

        this.state = { showCuttingBoard, cuttingBoardData: null, previewData: null, showPhotoPreview:false };

        this.onCuttingBoardCancel = this.onCuttingBoardCancel.bind(this);
        this.onImageCuttingBoardDone = this.onImageCuttingBoardDone.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCurrentImgEdit = this.onCurrentImgEdit.bind(this);
        this.onPhotoUploadCanvasInit = this.onPhotoUploadCanvasInit.bind(this);
    }

    onPhotoUploadCanvasInit(photoUploadCanvas){
        const previewData = {canvas:photoUploadCanvas};
        this.setState({previewData, showPhotoPreview:true});
    }

    onCuttingBoardCancel() {
        this.setState({ showCuttingBoard: false, showPhotoPreview: true });
    }

    onImageCuttingBoardDone(data) {
        const { canvas, leftX, topY, rightX, bottomY } = data;
        const croppedWidth = Math.round(rightX - leftX);
        const croppedHeight = Math.round(bottomY - topY);
        const widthToHeightRatio = Math.round(1000 * (croppedHeight / croppedWidth)) / 1000;
        const heightToWidthRatio = Math.round(1000 * (croppedWidth / croppedHeight)) / 1000;
        const imageData = { widthToHeightRatio, heightToWidthRatio };

        const previewData = { croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY, widthToHeightRatio, heightToWidthRatio };

        this.setState({ cuttingBoardData: data, showCuttingBoard: false, showPhotoPreview: true, imageData, previewData });
    }

    onCancel() {
        this.props.onCancel();
    }

    onCurrentImgEdit() {
        this.setState({ showCuttingBoard: true, showPhotoPreview: false });
    }

    render() {
        const { showCuttingBoard, showPhotoPreview } = this.state;

        let initialCropData, initialRotation;
        if (this.state.cuttingBoardData) {
            let { canvas, rotation, ...rest } = this.state.cuttingBoardData;
            initialCropData = rest;
            initialRotation = rotation;
        }

        const { isNewImage, userId, artistId, artworkId } = this.props;
        const artworkData = { isNewImage, userId, artistId, artworkId };
        const orientation = initialRotation ? initialRotation : this.props.initialOrientation;

        return (
            <div>
                <PhotoUploadCanvas img={this.props.img}
                                   orientation={this.props.initialOrientation}
                                   onCanvasInit={this.onPhotoUploadCanvasInit}/>

                {showPhotoPreview &&
                <EditedPhotoPreview previewData={this.state.previewData}
                                    artworkData={artworkData}
                                    onCurrentImgEdit={this.onCurrentImgEdit}
                                    onUploadStart={this.props.onUploadStart}
                                    onUploadComplete={this.props.onUploadComplete}
                                    onCancel={this.onCancel}/>
                }

                {showCuttingBoard &&
                <CropAndRotateModal loadedImg={this.props.img}
                                    imgUrl={this.props.url}
                                    orientation={orientation}
                                    initialCropData={initialCropData}
                                    onCancel={this.onCuttingBoardCancel}
                                    onDone={this.onImageCuttingBoardDone}/>
                }

            </div>
        );
    }
}

export default PhotoEditor;
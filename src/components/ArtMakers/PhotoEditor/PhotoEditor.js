// externals
import React, { Component } from "react";
// components
import CropAndRotateModal from "./CropAndRotateModal";
import EditedPhotoPreview from "./EditedPhotoPreview";

class PhotoEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { showCuttingBoard: true, cuttingBoardData: null, previewData: null };

        this.onCuttingBoardCancel = this.onCuttingBoardCancel.bind(this);
        this.onImageCuttingBoardDone = this.onImageCuttingBoardDone.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCurrentImgEdit = this.onCurrentImgEdit.bind(this);
    }

    onCuttingBoardCancel() {
        this.setState({ showCuttingBoard: false }, () => {
            this.props.onCancel();
        })
    }

    onImageCuttingBoardDone(data) {
        const { canvas, leftX, topY, rightX, bottomY } = data;
        const croppedWidth = Math.round(rightX - leftX);
        const croppedHeight = Math.round(bottomY - topY);
        const widthToHeightRatio = Math.round(1000 * (croppedHeight / croppedWidth)) / 1000;
        const heightToWidthRatio = Math.round(1000 * (croppedWidth / croppedHeight)) / 1000;
        const imageData = { widthToHeightRatio, heightToWidthRatio };

        const previewData = { croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY, widthToHeightRatio, heightToWidthRatio };

        this.setState({ cuttingBoardData: data, showCuttingBoard: false, imageData, previewData });
    }

    onCancel() {
        this.props.onCancel();
    }

    onCurrentImgEdit() {
        this.setState({ showCuttingBoard: true });
    }

    render() {
        const { showCuttingBoard } = this.state;

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
                {!showCuttingBoard &&
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
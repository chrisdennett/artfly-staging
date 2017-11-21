// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail } from '../../actions/UserDataActions';
// components
import SelectPhotoButton from "./assets/SelectPhotoButton";
import Butt from "../global/Butt";
// helper functions
import * as PhotoHelper from "./assets/PhotoHelper";
import ArtStudioModal from "./CropAndRotateModal";

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
        this.props.onCancel(this.props.artworkId);
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

    onCancel() {
        // this.setState({ loadedImg: null, loadedImgOrientation: 1, cuttingBoardData: null });
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
        let sourceBlob, thumbBlob;

        this.getCanvasBlobData(this.maxCanvas, (maxCanvasData) => {
            sourceBlob = maxCanvasData;

            this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                thumbBlob = thumbCanvasData;

                this.setState({ isSaving: true }, () => {
                    const { userId, artistId, artworkId } = this.props;
                    const { widthToHeightRatio, heightToWidthRatio } = this.state.imageData;

                    if (this.props.isUpdate) {
                        this.props.updateArtworkImage(artworkId, artistId, sourceBlob, widthToHeightRatio, heightToWidthRatio, (saveProgressData) => {
                            if (saveProgressData.status === 'complete') {
                                this.props.updateArtworkThumbnail(artworkId, artistId, thumbBlob, (thumbSaveProgress) => {
                                    if (thumbSaveProgress.status === 'complete') {
                                        this.props.onUploadComplete(artworkId);
                                    }
                                })
                            }
                        });

                    }
                    else {
                        this.props.addArtwork(userId, artistId, sourceBlob, widthToHeightRatio, heightToWidthRatio, (newArtworkData) => {

                            const { artworkId, artistId } = newArtworkData;
                            this.props.addThumbnail(artworkId, artistId, thumbBlob, (newThumbData) => {

                                this.setState({ isSaving: false }, () => {
                                    this.props.onUploadComplete(artworkId);
                                })
                            })
                        });
                    }
                })
            })
        });
    }

    render() {
        const showCuttingBoard = this.state.cuttingBoardOpen;
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

        const responsiveCanvasStyle = { maxWidth: 600 };
        const hiddenCanvasStyle = { display: 'none' };

        if (this.state.isSaving) return <div>Is saving...</div>;

        return (
            <div>
                {!hasEditingData && !this.props.url &&
                <SelectPhotoButton
                    uid={'cutting-board-selector'}
                    onPhotoSelect={this.onPhotoSelected}/>
                }

                <div style={editPhotoStyle}>
                    <canvas style={responsiveCanvasStyle} ref={(canvas) => this.maxCanvas = canvas}/>
                    <canvas style={hiddenCanvasStyle} ref={(canvas) => this.thumbCanvas = canvas}/>

                    <Butt style={{ display: 'inline-block' }} onClick={this.onCurrentImgEdit}>Edit</Butt>
                    <Butt style={{ display: 'inline-block' }} onClick={this.onCancel}>Cancel</Butt>
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

const mapActionsToProps = { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(PhotoUploader);
// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './editedPhotoPreviewStyles.css';
// actions
import { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail } from '../../../actions/UserDataActions';
// components
import Butt from "../../global/Butt";
import * as PhotoHelper from "./assets/PhotoHelper";

class EditedPhotoPreview extends Component {

    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this);
        this.drawToCanvases = this.drawToCanvases.bind(this);

        // initialise state
        this.state = { isSaving: false }
    }

    componentDidMount() {
        this.drawToCanvases();
    }

    getCanvasBlobData(canvas, callback) {
        canvas.toBlob((canvasBlobData) => {
            callback(canvasBlobData);
        }, 'image/jpeg', 0.95)
    }

    onSave() {
        let sourceBlob, thumbBlob;
        if (this.props.onUploadStart) this.props.onUploadStart();

        const { widthToHeightRatio, heightToWidthRatio } = this.props.previewData;
        const { isNewImage, userId, artistId, artworkId } = this.props.artworkData;

        this.getCanvasBlobData(this.maxCanvas, (maxCanvasData) => {
            sourceBlob = maxCanvasData;

            this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                thumbBlob = thumbCanvasData;

                this.setState({ isSaving: true }, () => {
                    if (isNewImage) {
                        this.props.addArtwork(userId, artistId, sourceBlob, widthToHeightRatio, heightToWidthRatio, (newArtworkData) => {
                            this.props.addThumbnail(newArtworkData.artworkId, artistId, thumbBlob, (newThumbData) => {

                                this.setState({ isSaving: false }, () => {
                                    this.props.onUploadComplete(newArtworkData.artworkId);
                                })
                            })
                        });
                    }
                    else {
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
                })
            })
        });
    }

    drawToCanvases() {
        if (!this.props.previewData) return;
        let { canvas, croppedWidth, croppedHeight, leftX, topY, rightX, bottomY } = this.props.previewData;

        // set defaults if there's no cropping info
        if (!croppedWidth) croppedWidth = canvas.width;
        if (!croppedHeight) croppedHeight = canvas.height;
        if (!leftX) leftX = 0;
        if (!topY) topY = 0;
        if (!rightX) rightX = canvas.width;
        if (!bottomY) bottomY = canvas.height;

        // Create canvas' matching the dimensions of the image size I want to save
        PhotoHelper.drawCanvasToCanvas(this.maxCanvas, croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY);
        PhotoHelper.drawCanvasToCanvas(this.thumbCanvas, 150, 150, canvas, leftX, topY, rightX, bottomY);
        PhotoHelper.drawCanvasToCanvas(this.previewCanvas, 350, 350, canvas, leftX, topY, rightX, bottomY);
    }

    render() {
        return (
            <div className='edited-photo-preview'>
                <div className='edited-photo-preview--wrapper'>
                    <div className='edited-photo-preview--controls'>

                        <Butt className='edited-photo-preview--butt'
                              positiveActionButton
                              onClick={this.onSave}>Save</Butt>

                        <Butt className='edited-photo-preview--butt'
                              onClick={this.props.onCurrentImgEdit}>Edit</Butt>

                        <Butt className='edited-photo-preview--butt'
                              negativeActionButton
                              onClick={this.props.onCancel}>Cancel</Butt>
                    </div>
                    <div className='edited-photo-preview--canvas-holder'>
                        <canvas className='edited-photo-preview--canvas'
                                ref={(canvas) => this.previewCanvas = canvas}/>
                    </div>
                    <canvas className='edited-photo-preview--hidden-canvas'
                            ref={(canvas) => this.maxCanvas = canvas}/>
                    <canvas className='edited-photo-preview--hidden-canvas'
                            ref={(canvas) => this.thumbCanvas = canvas}/>
                </div>
            </div>
        );
    }
}

const mapActionsToProps = { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(EditedPhotoPreview);
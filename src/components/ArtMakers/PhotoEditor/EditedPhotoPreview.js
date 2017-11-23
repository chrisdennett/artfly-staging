// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
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
        if(!this.props.previewData) return;

        const { croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY } = this.props.previewData;

        PhotoHelper.drawCanvasToCanvas(this.maxCanvas, croppedWidth, croppedHeight, canvas, leftX, topY, rightX, bottomY);
        PhotoHelper.drawCanvasToCanvas(this.thumbCanvas, 150, 150, canvas, leftX, topY, rightX, bottomY);
    }

    render() {
        const responsiveCanvasStyle = { maxWidth: 600 };
        const hiddenCanvasStyle = { display: 'none' };

        return (
            <div>
                <canvas style={responsiveCanvasStyle} ref={(canvas) => this.maxCanvas = canvas}/>
                <canvas style={hiddenCanvasStyle} ref={(canvas) => this.thumbCanvas = canvas}/>

                <Butt style={{ display: 'inline-block' }} onClick={this.props.onCurrentImgEdit}>Edit</Butt>
                <Butt style={{ display: 'inline-block' }} onClick={this.props.onCancel}>Cancel</Butt>
                <Butt style={{ display: 'inline-block' }} onClick={this.onSave}>Save</Butt>
            </div>
        );
    }
}

const mapActionsToProps = { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(EditedPhotoPreview);
// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './pictureMakerStyles.css';
// actions
import { updateArtworkImage, updateArtworkThumbnail } from '../../../../actions/UserDataActions';
// helpers
import * as ImageHelper from "../../ImageHelper";
// components
import PictureMakerControls from "./PictureMakerControls";
import ArtistUpdater from '../ArtistUpdater';
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
import ArtworkPreview from "./ArtworkPreview/ArtworkPreview";
import PhotoSelector from "./PhotoSelector/PhotoSelector";
import CropAndRotate from "./CropAndRotate/CropAndRotate";

/*
adminId:            "91A2lRDKlFfl9vtcEuMwKLVWCzx1"
artistId:           "oEZpPyEdY7oZqhDaUFil"
artworkId:          "8XvbOGbsHoGMyBqRJIFk"
dateAdded:          1511611413981
heightToWidthRatio: 0.84994640943194
thumb_url:          "https://firebasestorage.googleapis.com/v0/b/art-blam..."
url:                "https://firebasestorage.googleapis.com/v0/b/art-blam..."
url_large:          "https://storage.googleapis.com/art-blam..."
url_med:            "https://storage.googleapis.com/art-blam..."
widthToHeightRatio: 1.176544766708701
*/


class ArtMaker extends Component {

    constructor() {
        super();

        this.showArtworkInEditing = this.showArtworkInEditing.bind(this);
        this.showArtworkInGallery = this.showArtworkInGallery.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.updateArtworkState = this.updateArtworkState.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);

        this.masterCanvas = document.createElement('canvas');
        this.thumbCanvas = document.createElement('canvas');

        this.state = { editedArtwork: null, sourceImg: null };
    }

    componentWillMount() {
        this.updateArtworkState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.artwork !== this.props.artwork) {
            this.updateArtworkState(nextProps)
        }
    }

    updateArtworkState(props) {
        const { artwork, isNewArtwork } = props;

        console.log("props: ", props);

        if (artwork) {
            // set up for existing artwork

            ImageHelper.GetImageFromUrl(artwork.url, (img) => {

                // TODO: This doesn't have to happen here.
                // currently masterCanvas only needs to exists because it is passed to cropper
                // if cropper didn't draw to the master canvas it could just use sourceImg
                ImageHelper.drawToCanvas({
                    sourceCanvas: img,
                    outputCanvas: this.masterCanvas,
                    maxOutputCanvasWidth: 3000,
                    maxOutputCanvasHeight: 3000
                });

                // draw to master canvas
                ImageHelper.drawToCanvas({
                    sourceCanvas: img,
                    outputCanvas: this.testCanvas,
                    maxOutputCanvasWidth: 150,
                    maxOutputCanvasHeight: 150
                });

                let editedArtwork = { ...artwork };
                editedArtwork.imgSrc = img.src;
                editedArtwork.img = img;
                this.setState({ editedArtwork });
            });

        }
        else if (isNewArtwork) {
            const newArtwork = {
                adminId: this.props.userId,
            };
            this.setState({ editedArtwork: newArtwork });
        }
    }

    getCanvasBlobData(canvas, callback) {
        canvas.toBlob((canvasBlobData) => {
            callback(canvasBlobData);
        }, 'image/jpeg', 0.95)
    }

    // SAVING ARTWORK
    onCropAndRotateDone() {
        //source:   3000x3000 (max)
        //large:    960x960 // created using cloud functions
        //medium:   640x640 // created using cloud functions
        //thumb:    150x150

        ImageHelper.drawToCanvas({
            sourceCanvas: this.masterCanvas,
            outputCanvas: this.thumbCanvas,
            maxOutputCanvasWidth: 150,
            maxOutputCanvasHeight: 150
        }, (widthToHeightRatio, heightToWidthRatio) => {

            let masterCanvasBlob, thumbCanvasBlob;

            this.getCanvasBlobData(this.masterCanvas, (masterCanvasData) => {
                masterCanvasBlob = masterCanvasData;

                this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                    thumbCanvasBlob = thumbCanvasData;

                    const { artwork, artist } = this.props;

                    this.props.updateArtworkImage(artwork.artworkId, artist.artistId, masterCanvasBlob, widthToHeightRatio, heightToWidthRatio, (saveProgressData) => {
                        if (saveProgressData.status === 'complete') {
                            this.props.updateArtworkThumbnail(artwork.artworkId, artist.artistId, thumbCanvasBlob, (thumbSaveProgress) => {
                                if (thumbSaveProgress.status === 'complete') {
                                    console.log("thumbSaveProgress.status: ", thumbSaveProgress.status);
                                }
                            })
                        }
                    });
                })
            });

            // JUST FOR DEV PURPOSES
            ImageHelper.drawToCanvas({
                sourceCanvas: this.masterCanvas,
                outputCanvas: this.testCanvas,
                maxOutputCanvasWidth: 150,
                maxOutputCanvasHeight: 150
            });
        });
    }

    onPhotoSelected(imgFile) {
        ImageHelper.GetImage(imgFile, (img, imgOrientation, widthToHeightRatio, heightToWidthRatio) => {

            // draw to master canvas
            // TODO: this isnt' needed if we leave drawing the master canvas to the saving function
            ImageHelper.drawToCanvas({
                sourceCanvas: img,
                outputCanvas: this.masterCanvas,
                orientation: imgOrientation,
                maxOutputCanvasWidth: 150,
                maxOutputCanvasHeight: 150
            });

            let editedArtwork = {widthToHeightRatio, heightToWidthRatio, ...this.state.editedArtwork};
            editedArtwork.imgSrc = img.src;
            editedArtwork.img = img;

            this.setState({ editedArtwork });
            // this.setState({ selectedImg: img, selectedImgOrientation: imgOrientation, editedArtwork });
        });
    }

    showArtworkInEditing() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    showArtworkInGallery() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    render() {
        let { isNewArtwork, windowSize, artworkId, currentEditScreen, artist } = this.props;
        const { editedArtwork } = this.state;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        if (!currentEditScreen) currentEditScreen = 'artworkPreview';

        if (isNewArtwork && !editedArtwork.imgSrc) currentEditScreen = 'uploadPhoto';
        const artistId = artist ? artist.artistId : null;
        const sourceImg = editedArtwork ? editedArtwork.img : null;

        return (
            <div className='pictureMaker'>

                <div className={'testCanvasHolder'}>
                    <canvas ref={(canvas) => this.testCanvas = canvas}
                            className={'testCanvas'}/>
                </div>

                <div className='pictureMaker--sidebar'>
                    <PictureMakerControls artistId={artistId}
                                          isNewArtwork={isNewArtwork}
                                          artworkId={artworkId}/>
                </div>

                <div className='pictureMaker--main'>

                    {currentEditScreen === 'uploadPhoto' &&
                    <PhotoSelector
                        uid={'new-artwork-selector'}
                        onPhotoSelect={this.onPhotoSelected}/>
                    }

                    {currentEditScreen === 'artworkPreview' &&
                    <ArtworkPreview artwork={editedArtwork}
                                    maxWidth={maxWidth}
                                    maxHeight={maxHeight}/>
                    }

                    {currentEditScreen === 'editPhoto' &&
                    <CropAndRotate masterCanvas={this.masterCanvas}
                                   sourceImg={sourceImg}
                                   onCancel={this.showArtworkInEditing}
                                   onDone={this.onCropAndRotateDone}
                                   width={maxWidth}
                                   height={maxHeight}/>
                    }

                    {currentEditScreen === 'deleteArtwork' &&
                    <ArtworkDeleter artworkId={artworkId}
                                    artist={artist}
                                    onDeleteArtworkComplete={this.showArtworkInGallery}
                                    onDeleteArtworkCancel={this.showArtworkInEditing}/>
                    }

                    {currentEditScreen === 'editArtist' &&
                    <ArtistUpdater artworkId={artworkId}
                                   initialArtistId={editedArtwork.artistId}
                                   manageUpload={true}
                                   onCancel={this.showArtworkInEditing}
                                   onUpdateComplete={this.showArtworkInEditing}/>
                    }
                </div>

            </div>

        )
    }
}

const mapActionsToProps = { updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(ArtMaker);
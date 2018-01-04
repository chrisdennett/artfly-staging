// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './pictureMakerStyles.css';
// actions
import {
    addArtwork,
    addThumbnail,
    updateArtworkImage,
    updateArtworkThumbnail
} from '../../../../actions/UserDataActions';
// helpers
import * as ImageHelper from "../../ImageHelper";
// components
import PictureMakerControls from "./PictureMakerControls";
import ArtistUpdater from '../ArtistUpdater';
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
import ArtworkPreview from "./ArtworkPreview/ArtworkPreview";
import CropAndRotate from "./CropAndRotate/CropAndRotate";
import NewArtworkPhotoSelector from "./NewArtworkPhotoSelector/NewArtworkPhotoSelector";

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
        this.updateArtworkState = this.updateArtworkState.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.onNewPhotoSelectorArtistSelected = this.onNewPhotoSelectorArtistSelected.bind(this);
        this.onNewPhotoSelectorPhotoSelected = this.onNewPhotoSelectorPhotoSelected.bind(this);

        this.masterCanvas = document.createElement('canvas');
        this.thumbCanvas = document.createElement('canvas');

        this.state = { editedArtwork: null, sourceImg: null, isSaving: false };
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
                adminId: this.props.userId
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
    onCropAndRotateDone(rotation, cropData) {
        //source:   3000x3000 (max)
        //large:    960x960 // created using cloud functions
        //medium:   640x640 // created using cloud functions
        //thumb:    150x150

        let masterCanvasBlob, thumbCanvasBlob;
        this.setState({ isSaving: true });

        if (this.props.isNewArtwork) {
            // create new image

            const { userId } = this.props;
            const { editedArtwork } = this.state;
            const { artistId, img, widthToHeightRatio, heightToWidthRatio } = editedArtwork;

            ImageHelper.drawToCanvas({
                sourceCanvas: img,
                outputCanvas: this.masterCanvas,
                orientation: rotation,
                cropPercents: cropData,
                maxOutputCanvasWidth: 3000,
                maxOutputCanvasHeight: 3000
            }, () => {

                this.getCanvasBlobData(this.masterCanvas, (masterCanvasData) => {
                    masterCanvasBlob = masterCanvasData;

                    ImageHelper.drawToCanvas({
                        sourceCanvas: img,
                        outputCanvas: this.thumbCanvas,
                        maxOutputCanvasWidth: 150,
                        maxOutputCanvasHeight: 150
                    }, () => {

                        this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                            thumbCanvasBlob = thumbCanvasData;

                            this.props.addArtwork(userId, artistId, masterCanvasBlob, widthToHeightRatio, heightToWidthRatio, (uploadData) => {

                                if (uploadData.status === 'complete') {
                                    const { artworkId } = uploadData;

                                    this.props.addThumbnail(artworkId, artistId, thumbCanvasBlob, (thumbUploadData) => {
                                        console.log("thumb saved: ", thumbUploadData);

                                        this.setState({ isSaving: false }, () => {
                                            history.push(`/artStudio/${artworkId}`);
                                        })

                                    })
                                }
                            })
                        })
                    })
                })
            })
        }
        else {
            ImageHelper.drawToCanvas({
                sourceCanvas: this.masterCanvas,
                outputCanvas: this.thumbCanvas,
                maxOutputCanvasWidth: 150,
                maxOutputCanvasHeight: 150
            }, (widthToHeightRatio, heightToWidthRatio) => {

                this.getCanvasBlobData(this.masterCanvas, (masterCanvasData) => {
                    masterCanvasBlob = masterCanvasData;

                    this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                        thumbCanvasBlob = thumbCanvasData;

                        const { artwork, artist } = this.props;

                        this.props.updateArtworkImage(artwork.artworkId, artist.artistId, masterCanvasBlob, widthToHeightRatio, heightToWidthRatio, (saveProgressData) => {
                            if (saveProgressData.status === 'complete') {
                                this.props.updateArtworkThumbnail(artwork.artworkId, artist.artistId, thumbCanvasBlob, (thumbSaveProgress) => {
                                    if (thumbSaveProgress.status === 'complete') {
                                        this.setState({ isSaving: false }, () => {
                                            history.push(`/artStudio/${artwork.artworkId}`);
                                        })
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
    }

    onNewPhotoSelectorArtistSelected(artistId) {
        const editedArtwork = { ...this.state.editedArtwork, artistId };
        this.setState({ editedArtwork });
    }

    onNewPhotoSelectorPhotoSelected(imgFile) {
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

            let editedArtwork = { widthToHeightRatio, heightToWidthRatio, ...this.state.editedArtwork };
            editedArtwork.imgSrc = img.src;
            editedArtwork.img = img;

            this.setState({ editedArtwork });
            // this.setState({ selectedImg: img, selectedImgOrientation: imgOrientation, editedArtwork });
        });

    }

    showArtworkInEditing() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    onCropAndRotateCancel() {
        if (this.props.isNewArtwork) {
            this.setState({ editedArtwork: {} }, () => {
                history.push('/artStudio/new/uploadPhoto');
            })
        }
        else {
            this.showArtworkInEditing();
        }
    }

    showArtworkInGallery() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    render() {
        let { isNewArtwork, windowSize, artworkId, currentEditScreen, artist } = this.props;
        const { editedArtwork, isSaving } = this.state;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        if (!currentEditScreen) currentEditScreen = 'artworkPreview';

        if (isNewArtwork) {
            if (!editedArtwork.imgSrc) currentEditScreen = 'uploadPhoto';
            else currentEditScreen = 'editPhoto';
        }


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

                {isSaving &&
                <div>Amazing saving animation...</div>
                }


                {!isSaving &&
                <div className='pictureMaker--main'>

                    {currentEditScreen === 'uploadPhoto' &&
                    <NewArtworkPhotoSelector
                        onPhotoSelected={this.onNewPhotoSelectorPhotoSelected}
                        onArtistSelected={this.onNewPhotoSelectorArtistSelected}/>
                    }

                    {currentEditScreen === 'artworkPreview' &&
                    <ArtworkPreview artwork={editedArtwork}
                                    maxWidth={maxWidth}
                                    maxHeight={maxHeight}/>
                    }

                    {currentEditScreen === 'editPhoto' &&
                    <CropAndRotate masterCanvas={this.masterCanvas}
                                   sourceImg={sourceImg}
                                   onCancel={this.onCropAndRotateCancel}
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
                                   initialArtistId={artistId}
                                   manageUpload={true}
                                   onCancel={this.showArtworkInEditing}
                                   onUpdateComplete={this.showArtworkInEditing}/>
                    }
                </div>
                }

            </div>

        )
    }
}

const mapActionsToProps = { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(ArtMaker);
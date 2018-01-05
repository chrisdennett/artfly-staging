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
// const

const ARTWORK_TYPE = "picture";
/*
Artwork Data:   adminId, artistId, artworkId, dateAdded, heightToWidthRatio,
                thumb_url, url, url_large, url_med, widthToHeightRatio:
*/

class ArtMaker extends Component {

    constructor() {
        super();

        this.setupArtwork = this.setupArtwork.bind(this);
        this.showArtworkInEditing = this.showArtworkInEditing.bind(this);
        this.showArtworkInGallery = this.showArtworkInGallery.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.getImageBlob = this.getImageBlob.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.onNewPhotoSelectorArtistSelected = this.onNewPhotoSelectorArtistSelected.bind(this);
        this.onNewPhotoSelectorPhotoSelected = this.onNewPhotoSelectorPhotoSelected.bind(this);

        this.state = { editedArtwork: null, sourceImg: null, isSaving: false };
    }

    componentWillMount() {
        const { artwork, isNewArtwork } = this.props;


        console.log("artwork: ", artwork);

        // set up for a new artwork
        if (isNewArtwork) {
            this.setState({ editedArtwork: { adminId: this.props.userId } });
        }
        // set up for existing artwork
        else {
            this.setupArtwork(artwork);
        }
    }

    // if an artwork is updated and saved, this loads in the new data
    componentWillReceiveProps(nextProps) {
        if (nextProps.artwork && nextProps.artwork.lastUpdated !== this.props.artwork.lastUpdated) {
            this.setupArtwork(nextProps.artwork);
        }
    }

    setupArtwork(artwork) {
        ImageHelper.GetImageFromUrl(artwork.url, (img) => {
            let editedArtwork = { ...artwork };
            editedArtwork.imgSrc = img.src;
            editedArtwork.img = img;
            this.setState({ editedArtwork });
        });
    }

    getCanvasBlobData(canvas, callback) {
        canvas.toBlob((canvasBlobData) => {
            callback(canvasBlobData);
        }, 'image/jpeg', 0.95)
    }

    // SAVING ARTWORK
    //source:   3000x3000 (max)
    //large:    960x960 // created using cloud functions
    //medium:   640x640 // created using cloud functions
    //thumb:    150x150

    getImageBlob(sourceImg, rotation, cropData, maxSize, callback) {
        const canvas = document.createElement('canvas');

        ImageHelper.drawToCanvas({
            sourceCanvas: sourceImg,
            outputCanvas: canvas,
            orientation: rotation,
            cropPercents: cropData,
            maxOutputCanvasWidth: maxSize,
            maxOutputCanvasHeight: maxSize
        }, (widthToHeightRatio, heightToWidthRatio) => {
            this.getCanvasBlobData(canvas, (blob) => {
                callback(blob, widthToHeightRatio, heightToWidthRatio)
            })
        });
    }

    onCropAndRotateDone(rotation, cropData) {
        this.setState({ isSaving: true });
        const { userId } = this.props;
        const { editedArtwork } = this.state;
        const { artistId, img } = editedArtwork;

        this.getImageBlob(img, rotation, cropData, 3000, (maxBlob, widthToHeightRatio, heightToWidthRatio) => {
            this.getImageBlob(img, rotation, cropData, 150, (thumbBlob) => {

                if (this.props.isNewArtwork) {
                    this.props.addArtwork(ARTWORK_TYPE, userId, artistId, maxBlob, widthToHeightRatio, heightToWidthRatio, (uploadData) => {

                        if (uploadData.status === 'complete') {
                            const { artworkId } = uploadData;

                            this.props.addThumbnail(artworkId, artistId, thumbBlob, () => {
                                this.setState({ isSaving: false }, () => {
                                    history.push(`/artStudio/${artworkId}`);
                                })
                            })
                        }
                    })
                }
                else {
                    const { artwork } = this.props;

                    this.props.updateArtworkImage(artwork.artworkId, artistId, maxBlob, widthToHeightRatio, heightToWidthRatio, (saveProgressData) => {
                        if (saveProgressData.status === 'complete') {

                            this.props.updateArtworkThumbnail(artwork.artworkId, artistId, thumbBlob, (thumbSaveProgress) => {
                                if (thumbSaveProgress.status === 'complete') {
                                    this.setState({ isSaving: false }, () => {
                                        history.push(`/artStudio/${artwork.artworkId}`);
                                    })
                                }
                            })
                        }
                    });
                }
            })
        });
    }

    onNewPhotoSelectorArtistSelected(artistId) {
        const editedArtwork = { ...this.state.editedArtwork, artistId };
        this.setState({ editedArtwork });
    }

    onNewPhotoSelectorPhotoSelected(imgFile) {
        ImageHelper.GetImage(imgFile, (img, imgOrientation, widthToHeightRatio, heightToWidthRatio) => {

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
                    <CropAndRotate sourceImg={sourceImg}
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
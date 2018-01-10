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
import LoadingOverlay from '../../../global/LoadingOverlay';
import PictureMakerControls from "./PictureMakerControls";
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
import ArtworkPreview from "./ArtworkPreview/ArtworkPreview";
import CropAndRotate from "./CropAndRotate/CropAndRotate";
import NewArtworkPhotoSelector from "./NewArtworkPhotoSelector/NewArtworkPhotoSelector";
import ArtistSelector from "./ArtistSelector/ArtistSelector";
import CuttingMat from "./CuttingMat/CuttingMat";
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
        this.setState({ editedArtwork: { ...artwork } }, () => {

            // load image into state for use by cropper (and perhaps other comps in the future)
            ImageHelper.GetImageFromUrl(artwork.url, (sourceImg) => {
                this.setState({ sourceImg });
            });
        });
    }

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

            canvas.toBlob((canvasBlobData) => {
                callback(canvasBlobData, widthToHeightRatio, heightToWidthRatio)
            }, 'image/jpeg', 0.95);

        });
    }

    // TODO: Some of this can be shifted off to the ImageHelper
    // SAVING ARTWORK
    //source:   3000x3000 (max)
    //large:    960x960 // created using cloud functions
    //medium:   640x640 // created using cloud functions
    //thumb:    150x150
    onCropAndRotateDone(rotation, cropData) {
        this.setState({ isSaving: true });
        const { userId } = this.props;
        const { editedArtwork, sourceImg } = this.state;
        const { artistId } = editedArtwork;

        // Get maximum size img data
        this.getImageBlob(sourceImg, rotation, cropData, 3000, (maxBlob, widthToHeightRatio, heightToWidthRatio) => {
            // Get thumb data
            this.getImageBlob(sourceImg, rotation, cropData, 150, (thumbBlob) => {

                // if new add an new atwork and thumbnail
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
                // if it's an existing artwork, update the images
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
        ImageHelper.GetImage(imgFile, (sourceImg, imgOrientation, widthToHeightRatio, heightToWidthRatio) => {
            let editedArtwork = { widthToHeightRatio, heightToWidthRatio, ...this.state.editedArtwork };
            this.setState({ editedArtwork, sourceImg });
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
        const { sourceImg, editedArtwork, isSaving } = this.state;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        if (!currentEditScreen) currentEditScreen = 'artworkPreview';

        if (isNewArtwork) {
            if (!sourceImg) currentEditScreen = 'uploadPhoto';
            else currentEditScreen = 'editPhoto';
        }

        const thumbUrl = editedArtwork.thumb_url;
        const artistId = artist ? artist.artistId : null;

        const sideBarWidthAllowance = 70;
        const mainContentMargin = 10;
        const contentWidth = maxWidth - (sideBarWidthAllowance + mainContentMargin);
        const contentHeight = maxHeight - (mainContentMargin * 2);

        const mainContentStyle = {
            width: contentWidth,
            height: contentHeight,
            top: mainContentMargin,
            left: sideBarWidthAllowance
        };

        return (
            <div className='pictureMaker'>

                <CuttingMat width={maxWidth} height={maxHeight}/>

                <PictureMakerControls artistId={artistId}
                                      currentEditScreen={currentEditScreen}
                                      isNewArtwork={isNewArtwork}
                                      artworkId={artworkId}/>


                {!isSaving &&
                <div className='pictureMaker--main' style={mainContentStyle}>
                    {currentEditScreen === 'uploadPhoto' &&
                    <NewArtworkPhotoSelector
                        onPhotoSelected={this.onNewPhotoSelectorPhotoSelected}
                        onArtistSelected={this.onNewPhotoSelectorArtistSelected}/>
                    }

                    {currentEditScreen === 'artworkPreview' &&
                    <ArtworkPreview artwork={editedArtwork}
                                    maxWidth={contentWidth}
                                    maxHeight={contentHeight}/>
                    }

                    {currentEditScreen === 'editPhoto' &&
                    <CropAndRotate sourceImg={sourceImg}
                                   onCancel={this.onCropAndRotateCancel}
                                   onDone={this.onCropAndRotateDone}
                                   width={contentWidth}
                                   height={contentHeight}/>
                    }

                    {currentEditScreen === 'deleteArtwork' &&
                    <ArtworkDeleter artworkId={artworkId}
                                    artist={artist}
                                    onDeleteArtworkComplete={this.showArtworkInGallery}
                                    onDeleteArtworkCancel={this.showArtworkInEditing}/>
                    }

                    {currentEditScreen === 'editArtist' &&
                    <ArtistSelector
                        thumbUrl={thumbUrl}
                        artworkId={artworkId}
                        initialArtistId={artistId}
                        onCancel={this.showArtworkInEditing}
                        onUpdateComplete={this.showArtworkInEditing}
                    />
                    }
                </div>
                }

            </div>

        )
    }
}

/*
<ArtistUpdater artworkId={artworkId}
                                   initialArtistId={artistId}
                                   onCancel={this.showArtworkInEditing}
                                   onUpdateComplete={this.showArtworkInEditing}/>
*/

const mapActionsToProps = { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(ArtMaker);
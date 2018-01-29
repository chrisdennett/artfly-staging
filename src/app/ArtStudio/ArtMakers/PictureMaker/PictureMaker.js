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
import ArtworkDeleter from "./DeleteArtwork/ArtworkDeleter";
import history from "../../../global/history";
import ArtworkPreview from "./ArtworkPreview/ArtworkPreview";
import CropAndRotate from "./CropAndRotate/CropAndRotate";
import NewArtworkPhotoSelector from "./PhotoUploader/NewArtworkPhotoSelector";
import ArtistSelector from "./ArtistSelector/ArtistSelector";
import CuttingMat from "./CuttingMat/CuttingMat";
import PictureMakerToolControls from "./PictureMakerToolControls/PictureMakerToolControls";
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
        this.showArtistGallery = this.showArtistGallery.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.getImageBlob = this.getImageBlob.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.onNewPhotoSelectorArtistSelected = this.onNewPhotoSelectorArtistSelected.bind(this);
        this.onNewPhotoSelectorPhotoSelected = this.onNewPhotoSelectorPhotoSelected.bind(this);
        this.setToolControls = this.setToolControls.bind(this);
        this.clearToolControls = this.clearToolControls.bind(this);

        this.state = { editedArtwork: null, sourceImg: null, isSaving: false };
    }

    componentWillMount() {
        if (this.props.isLoadingData) return;

        this.setupArtwork(this.props);
    }

    // if an artwork is updated and saved, this loads in the new data
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingData) return;

        if (nextProps.artwork) {
            const finishedLoading = !nextProps.isLoadingData && this.props.isLoadingData;
            const noPreviousArtwork = nextProps.artwork && !this.props.artwork;

            if (finishedLoading || noPreviousArtwork || nextProps.artwork.lastUpdated !== this.props.artwork.lastUpdated) {
                this.setupArtwork(nextProps);
            }
        }
    }

    setupArtwork(props) {
        const { artwork, isNewArtwork } = props;
        // set up for a new artwork
        if (isNewArtwork) {
            this.setState({ editedArtwork: { adminId: this.props.userId } });
        }
        // set up for existing artwork
        else {
            this.setState({ editedArtwork: { ...artwork } }, () => {

                // load image into state for use by cropper (and perhaps other comps in the future)
                ImageHelper.GetImageFromUrl(artwork.url, (sourceImg) => {
                    this.setState({ sourceImg });
                });
            });
        }
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

    onCropAndRotateCancel() {
        if (this.props.isNewArtwork) {
            this.setState({ editedArtwork: {}, sourceImg: null }, () => {
                history.push('/artStudio/new/uploadPhoto');
            })
        }
        else {
            this.showArtworkInEditing();
        }
    }

    showArtworkInEditing() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    showArtworkInGallery() {
        history.push(`/gallery/${this.props.artist.artistId}/artwork/${this.props.artworkId}`);
    }

    showArtistGallery() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    setToolControls(butts) {
        this.setState({ currentToolButts: butts })
    }

    clearToolControls() {
        this.setState({ currentToolButts: null });
    }

    render() {
        let { isLoadingData, isNewArtwork, windowSize, artworkId, currentEditScreen, artist } = this.props;
        const { sourceImg, editedArtwork, isSaving, currentToolButts } = this.state;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        if (!currentEditScreen) currentEditScreen = 'artworkPreview';

        if (isNewArtwork) {
            if (!sourceImg) currentEditScreen = 'uploadPhoto';
            else currentEditScreen = 'editPhoto';
        }

        const artistId = artist ? artist.artistId : null;

        const sideBarWidthAllowance = 70;
        const mainContentMargin = 10;
        const toolButtAllowance = 75;
        const contentWidth = maxWidth - (sideBarWidthAllowance + mainContentMargin);
        const contentHeight = maxHeight - (toolButtAllowance + mainContentMargin);

        const mainContentStyle = {
            width: contentWidth,
            height: contentHeight,
            top: mainContentMargin,
            left: sideBarWidthAllowance
        };

        let cuttingMatData = {};
        switch (currentEditScreen) {
            case 'uploadPhoto':
                cuttingMatData.colour = 'yellow';
                cuttingMatData.label = 'New Artwork';
                break;

            case 'editPhoto':
                cuttingMatData.colour = 'green';
                cuttingMatData.label = 'Crop & Rotate';
                break;

            case 'artworkPreview':
                cuttingMatData.colour = 'purple';
                cuttingMatData.label = 'Preview';
                break;

            case 'editArtist':
                cuttingMatData.colour = 'slate';
                cuttingMatData.label = 'Edit Artist';
                break;

            case 'deleteArtwork':
                cuttingMatData.colour = 'red';
                cuttingMatData.label = 'Delete Artwork';
                break;

            default:
                break;
        }

        const isLoadingOrSaving = isLoadingData || isSaving || !editedArtwork;
        const spinnerText = isLoadingOrSaving && isLoadingData ? 'Loading...' : 'Saving...';

        return (
            <div className='pictureMaker'>

                <CuttingMat width={maxWidth}
                            height={maxHeight}
                            showSpinner={isLoadingOrSaving}
                            spinnerLabel={spinnerText}
                            colour={cuttingMatData.colour}
                            label={cuttingMatData.label}
                />

                <PictureMakerControls artistId={artistId}
                                      currentEditScreen={currentEditScreen}
                                      isNewArtwork={isNewArtwork}
                                      artworkId={artworkId}/>


                {!isLoadingOrSaving &&
                <div className='pictureMaker--main' style={mainContentStyle}>
                    {currentEditScreen === 'uploadPhoto' &&
                    <NewArtworkPhotoSelector
                        setToolControls={this.setToolControls}
                        clearToolControls={this.clearToolControls}
                        onCancel={() => history.push('/')}
                        onPhotoSelected={this.onNewPhotoSelectorPhotoSelected}
                        onArtistSelected={this.onNewPhotoSelectorArtistSelected}/>
                    }

                    {currentEditScreen === 'artworkPreview' &&
                    <ArtworkPreview artwork={editedArtwork}
                                    setToolControls={this.setToolControls}
                                    clearToolControls={this.clearToolControls}
                                    onDone={this.showArtworkInGallery}
                                    maxWidth={contentWidth}
                                    maxHeight={contentHeight}/>
                    }

                    {currentEditScreen === 'editPhoto' &&
                    <CropAndRotate sourceImg={sourceImg}
                                   setToolControls={this.setToolControls}
                                   clearToolControls={this.clearToolControls}
                                   onCancel={this.onCropAndRotateCancel}
                                   onDone={this.onCropAndRotateDone}
                                   width={contentWidth}
                                   height={contentHeight}/>
                    }

                    {currentEditScreen === 'deleteArtwork' &&
                    <ArtworkDeleter artworkId={artworkId}
                                    artwork={editedArtwork}
                                    artist={artist}
                                    setToolControls={this.setToolControls}
                                    clearToolControls={this.clearToolControls}
                                    onDeleteArtworkComplete={this.showArtistGallery}
                                    onDeleteArtworkCancel={this.showArtworkInEditing}/>
                    }

                    {currentEditScreen === 'editArtist' &&
                    <ArtistSelector
                        artwork={editedArtwork}
                        artist={artist}
                        setToolControls={this.setToolControls}
                        clearToolControls={this.clearToolControls}
                        artworkId={artworkId}
                        initialArtistId={artistId}
                        onCancel={this.showArtworkInEditing}
                        onUpdateComplete={this.showArtworkInEditing}
                    />
                    }
                </div>
                }

                {!isLoadingOrSaving &&
                <PictureMakerToolControls butts={currentToolButts}/>
                }

            </div>

        )
    }
}


const
    mapActionsToProps = { addArtwork, addThumbnail, updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(ArtMaker);
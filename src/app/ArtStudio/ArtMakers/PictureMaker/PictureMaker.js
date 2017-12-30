// externals
import React, { Component } from "react";
// styles
import './pictureMakerStyles.css';
// components
import PictureMakerControls from "./PictureMakerControls";
import ArtistUpdater from '../ArtistUpdater';
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
import ArtworkPreview from "./ArtworkPreview/ArtworkPreview";
import PhotoSelector from "./PhotoSelector/PhotoSelector";
import * as PhotoHelper from "../../ImageHelper";
import CropAndRotate from "./CropAndRotate/CropAndRotate";

class ArtMaker extends Component {

    constructor() {
        super();

        this.showArtworkInEditing = this.showArtworkInEditing.bind(this);
        this.showArtworkInGallery = this.showArtworkInGallery.bind(this);
        this.onMasterCanvasInit = this.onMasterCanvasInit.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onArtworkPreviewUpdated = this.onArtworkPreviewUpdated.bind(this);
        this.onDrawnToCanvas = this.onDrawnToCanvas.bind(this);
        this.updateArtworkState = this.updateArtworkState.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);

        this.state = { masterCanvas: null, editedArtwork: null, cropData: null };
    }

    componentWillMount() {
        this.updateArtworkState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const { artwork } = this.props;

        if (artwork !== nextProps.artwork) {
            this.updateArtworkState(nextProps)
        }
    }

    updateArtworkState(props) {
        const { artwork, isNewArtwork } = props;

        if (artwork) {
            // set up for existing artwork
            this.setState({ editedArtwork: artwork, selectedImg: null });
        }
        else if (isNewArtwork) {
            const newArtwork = {};
            this.setState({ editedArtwork: newArtwork });
        }
    }

    onCropAndRotateDone(cropData) {
        this.setState({ cropData });
    }

    onPhotoSelected(imgFile) {
        PhotoHelper.GetImage(imgFile, (img, imgOrientation, widthToHeightRatio, heightToWidthRatio) => {

            const editedArtwork = { widthToHeightRatio, heightToWidthRatio };

            this.setState({ selectedImg: img, selectedImgOrientation: imgOrientation, editedArtwork });
        });
    }

    onMasterCanvasInit(masterCanvas) {
        this.setState({ masterCanvas: masterCanvas });
    }

    showArtworkInEditing() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    showArtworkInGallery() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    /*onPhotoEditorDone(newData) {
        if (this.props.artworkId === 'new') {
            // send to photo uploader with new flag
            this.setState({ cuttingBoardData: newData }, () => {
                history.push(`/artStudio/${this.props.artworkId}/uploadPhoto`);
            });
        }
        else {
            this.setState({ cuttingBoardData: newData }, () => {
                history.push(`/artStudio/${this.props.artworkId}/uploadPhoto`);
            });
        }
    }*/

    onArtworkPreviewUpdated(artworkData) {
        history.push(`/artStudio/${this.props.artworkId}`);
        // TODO: Either need to save the artwork here or in the preview.
        console.log("artworkData: ", artworkData);
    }

    onDrawnToCanvas() {
        this.setState({ masterCanvasReady: true });
    }

    render() {
        let { userId, isNewArtwork, windowSize, artworkId, currentEditScreen, artist } = this.props;
        const { editedArtwork, cropData, masterCanvasReady, selectedImg, selectedImgOrientation } = this.state;

        const { widthToHeightRatio, heightToWidthRatio } = editedArtwork;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        if (!currentEditScreen) currentEditScreen = 'artworkPreview';

        if (isNewArtwork && !selectedImg) currentEditScreen = 'uploadPhoto';
        const artistId = artist ? artist.artistId : null;

        return (
            <div className='pictureMaker'>

                <ArtworkPreview onMasterCanvasInit={this.onMasterCanvasInit}
                                onDrawnToCanvas={this.onDrawnToCanvas}
                                onArtworkUpdated={this.onArtworkPreviewUpdated}
                                cropData={cropData}
                                artwork={editedArtwork}
                                selectedImgOrientation={selectedImgOrientation}
                                selectedImg={selectedImg}/>

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

                    {/*{currentEditScreen === 'uploadPhoto' &&
                        <UploadPhoto width={maxWidth}
                                     height={maxHeight}
                                     userId={userId}
                                     onEdit={this.onPhotoUploaderEdit}
                                     cuttingBoardData={cuttingBoardData}
                                     selectedArtistId={selectedArtistId}
                                     onUploadComplete={this.showArtworkInEditing}/>
                        }*/}

                    {currentEditScreen === 'artworkPreview' &&
                    <div>ArtworkPreview goes here</div>
                    }

                    {/*{currentEditScreen === 'editPhoto' &&
                        <PhotoEditor isNewImage={isNewArtwork}
                                     artworkId={artworkId}
                                     userId={userId}
                                     url={artworkUrl}
                                     img={photoUploaderImg}
                                     onDone={this.onPhotoEditorDone}
                                     onCancel={this.showArtworkInEditing}/>
                        }*/}

                    {currentEditScreen === 'editPhoto' &&
                    <CropAndRotate loadedImg={this.state.selectedImg}
                                   masterCanvas={this.state.masterCanvas}
                                   masterCanvasReady={masterCanvasReady}
                                   widthToHeightRatio={widthToHeightRatio}
                                   heightToWidthRatio={heightToWidthRatio}
                                   cropData={cropData}
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

export default ArtMaker;

/*
return (
    <div>

        {artworkId === 'new' &&
        <AddPicture userId={userId}
                    selectedArtistId={selectedArtistId}/>
        }

        {artworkId !== 'new' && artwork &&
        <EditPicture currentEditScreen={currentEditScreen}
                     windowSize={windowSize}
                     userId={userId}
                     artist={artist}
                     artworkId={artworkId}
                     artwork={artwork}/>
        }

    </div>
)
 */
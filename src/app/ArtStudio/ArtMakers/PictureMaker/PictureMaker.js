// externals
import React, { Component } from "react";
// styles
import './pictureMakerStyles.css';
// components
import PictureMakerControls from "./PictureMakerControls";
// import ArtworkContainer from "../../../Artwork/ArtworkContainer";
import ArtistUpdater from '../ArtistUpdater';
// import PhotoEditor from "../../PhotoEditor/PhotoEditor";
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
// import UploadPhoto from "./UploadPhoto";
import ArtworkPreview from "../../ArtworkPreview/ArtworkPreview";
import PhotoSelector from "../../PhotoSelector/PhotoSelector";
import * as PhotoHelper from "../../PhotoEditor/assets/PhotoHelper";
import CropAndRotate from "../../CropAndRotate/CropAndRotate";

class ArtMaker extends Component {

    constructor() {
        super();

        this.showArtworkInEditing = this.showArtworkInEditing.bind(this);
        this.showArtworkInGallery = this.showArtworkInGallery.bind(this);
        this.onPhotoEditorDone = this.onPhotoEditorDone.bind(this);
        this.onMasterCanvasInit = this.onMasterCanvasInit.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onArtworkDataChange = this.onArtworkDataChange.bind(this);
        this.onDrawnToCanvas = this.onDrawnToCanvas.bind(this);
        this.updateArtwork = this.updateArtwork.bind(this);

        this.state = { cuttingBoardData: null, masterCanvas: null, artworkData:{}, artwork:null };
    }

    componentWillMount() {
        this.updateArtwork(this.props)
    }

    componentWillReceiveProps(nextProps){
        const {artwork} = this.props;
        console.log("uuuuuuuuuuuuuuuuuu snextProps: ", nextProps);

        if(artwork !== nextProps.artwork){
            this.updateArtwork(nextProps)
        }
    }

    updateArtwork(props){
        const {artwork, isNewArtwork} = props;

        console.log("isNewArtwork: ", isNewArtwork);

        if (artwork) {
            // set up for existing artwork
            this.setState({artwork, selectedImg:null});
        }
        else if(isNewArtwork){
            const newArtwork = {};
            this.setState({artwork:newArtwork});
        }
    }

    onPhotoSelected(imgFile) {
        PhotoHelper.GetImage(imgFile, (img, imgOrientation, widthToHeightRatio, heightToWidthRation) => {

            const artwork = {widthToHeightRatio, heightToWidthRation};

            this.setState({ selectedImg: img, selectedImgOrientation: imgOrientation, artwork });
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

    onPhotoEditorDone(newData) {
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
    }

    onArtworkDataChange(artworkData){

        // this.setState({artworkData});
    }

    onDrawnToCanvas(){
        this.setState({ masterCanvasReady: true });
    }

    render() {
        let { userId, isNewArtwork, windowSize, artworkId, selectedArtistId, currentEditScreen, artist } = this.props;
        const { cuttingBoardData, artwork, masterCanvasReady, artworkData, selectedImg, selectedImgOrientation } = this.state;


        const {widthToHeightRatio, heightToWidthRatio} = artwork;
        console.log("widthToHeightRatio, heightToWidthRatio: ", widthToHeightRatio, heightToWidthRatio);

        const maxWidth = windowSize ? windowSize.windowWidth - 300 : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        if (!currentEditScreen) currentEditScreen = 'artworkPreview';

        if(!artworkData) currentEditScreen = 'uploadPhoto';

        return (
            <div className='pictureMaker'>

                <ArtworkPreview onMasterCanvasInit={this.onMasterCanvasInit}
                                onDrawnToCanvas={this.onDrawnToCanvas}
                                onArtworkDataChange={this.onArtworkDataChange}
                                artwork={artwork}
                                selectedImgOrientation={selectedImgOrientation}
                                selectedImg={selectedImg}/>

                <div className='pictureMaker--sidebar'>
                    <PictureMakerControls artistId={selectedArtistId}
                                          isNewArtwork={isNewArtwork}
                                          artworkId={artworkId}/>
                </div>

                <div className='editPicture'>
                    <div className='editPicture-main'>

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
                                       onCancel={this.showArtworkInEditing}
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
                                       initialArtistId={artwork.artistId}
                                       manageUpload={true}
                                       onCancel={this.showArtworkInEditing}
                                       onUpdateComplete={this.showArtworkInEditing}/>
                        }
                    </div>

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
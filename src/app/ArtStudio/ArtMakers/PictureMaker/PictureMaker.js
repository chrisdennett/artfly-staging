// externals
import React, { Component } from "react";
// styles
import './pictureMakerStyles.css';
// components
import PictureMakerControls from "./PictureMakerControls";
import ArtworkContainer from "../../../Artwork/ArtworkContainer";
import ArtistUpdater from '../ArtistUpdater';
import PhotoEditor from "../../PhotoEditor/PhotoEditor";
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
import UploadPhoto from "./UploadPhoto";
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
        this.onPhotoUploaderEdit = this.onPhotoUploaderEdit.bind(this);
        this.onMasterCanvasInit = this.onMasterCanvasInit.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);

        this.state = { cuttingBoardData: null, masterCanvas: null };
    }

    componentWillMount() {
        if (this.props.isNewArtwork === false) {
            // set up for existing artwork
        }
    }

    onPhotoSelected(imgFile) {
        PhotoHelper.GetImage(imgFile, (img, imgOrientation) => {
            this.setState({ selectedImg: img, selectedImgOrientation: imgOrientation });
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

    onPhotoUploaderEdit(img, artistId) {
        this.setState({ photoUploaderImg: img }, () => {
            history.push(`/artStudio/${this.props.artworkId}/${artistId}/editPhoto`);
        });
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

    render() {
        let { userId, isNewArtwork, windowSize, artwork, artworkId, selectedArtistId, currentEditScreen, artist } = this.props;
        const { cuttingBoardData, photoUploaderImg, selectedImg, selectedImgOrientation } = this.state;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        const artworkUrl = artwork ? artwork.url : null;

        return (
            <div className='pictureMaker'>


                <ArtworkPreview onMasterCanvasInit={this.onMasterCanvasInit}
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
                        <ArtworkContainer artworkId={artwork.artworkId}
                                          allowScrollbars={false}/>
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
import React, { Component } from "react";
// styles
import './editPictureStyles.css';
// components
import history from '../../../global/history';
import EditPictureHome from "./EditPictureHome";
import ArtistUpdater from '../ArtistUpdater';
import PhotoEditor from "../../PhotoEditor/PhotoEditor";
import ArtworkDeleter from "./ArtworkDeleter";
import PictureMakerControls from "./PictureMakerControls";

class EditPicture extends Component {

    constructor() {
        super();


        this.onArtistUpdateComplete = this.onArtistUpdateComplete.bind(this);
        this.onArtistUpdateCancel = this.onArtistUpdateCancel.bind(this);
        // edit photo
        this.onPhotoUpdateComplete = this.onPhotoUpdateComplete.bind(this);
        this.onPhotoUpdateCancel = this.onPhotoUpdateCancel.bind(this);
        // delete artwork
        this.onDeleteArtworkComplete = this.onDeleteArtworkComplete.bind(this);
        this.onDeleteArtworkCancel = this.onDeleteArtworkCancel.bind(this);
    }

    onArtistUpdateComplete() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    onArtistUpdateCancel() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    onPhotoUpdateComplete() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    onPhotoUpdateCancel() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    onDeleteArtworkComplete() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    onDeleteArtworkCancel() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    render() {
        const { currentEditScreen, windowSize, userId, artist, artworkId, artwork } = this.props;

        const artworkJustAdded = currentEditScreen === 'justAdded';
        const showControls = artworkJustAdded || !currentEditScreen;

        const sidebarWidth = 150;
        const mainWidth = windowSize.windowWidth - sidebarWidth || 100;
        const mainHeight = windowSize.windowHeight || 100;

        return (

            <div className='editPicture'>

                <div className='editPicture-sidebar' width={sidebarWidth}>
                    <PictureMakerControls artistId={artist.artistId} artworkId={artworkId}/>
                </div>

                <div className='editPicture-main'>
                    {currentEditScreen === 'deleteArtwork' &&
                    <ArtworkDeleter artworkId={artworkId}
                                    artist={artist}
                                    onDeleteArtworkComplete={this.onDeleteArtworkComplete}
                                    onDeleteArtworkCancel={this.onDeleteArtworkCancel}/>
                    }

                    {currentEditScreen === 'editArtist' &&
                    <ArtistUpdater artworkId={artworkId}
                                   initialArtistId={artwork.artistId}
                                   manageUpload={true}
                                   onCancel={this.onArtistUpdateCancel}
                                   onUpdateComplete={this.onArtistUpdateComplete}/>
                    }

                    {currentEditScreen === 'editPhoto' &&
                    <PhotoEditor isNewImage={false}
                                 height={mainHeight}
                                 width={mainWidth}
                                 openCuttingBoard={true}
                                 artworkId={artworkId}
                                 userId={userId}
                                 artistId={artwork.artistId}
                                 url={artwork.url}
                                 onCancel={this.onPhotoUpdateCancel}
                                 onUploadComplete={this.onPhotoUpdateComplete}/>
                    }

                    {showControls &&
                    <EditPictureHome artist={artist}
                                     artworkJustAdded={artworkJustAdded}
                                     artwork={artwork}
                                     width={mainWidth}
                                     onDeleteArtwork={this.onDeleteArtwork}
                                     onOpenInGallery={this.onOpenInGallery}
                                     onEditPhoto={this.onEditPhoto}
                                     onEditArtist={this.onEditArtist}/>
                    }
                </div>

            </div>
        );
    }
}

export default EditPicture;
import React, { Component } from "react";
// styles
import '../MakerStyles.css';
// components
import history from '../../global/history';
import Page from "../../global/Page";
import EditPictureControls from "./EditPictureControls";
import ArtistUpdater from '../ArtistUpdater';
import PhotoEditor from "../../PhotoEditor/PhotoEditor";
import ArtworkDeleter from "./ArtworkDeleter";

class EditPicture extends Component {

    constructor() {
        super();

        // open in gallery
        this.onOpenInGallery = this.onOpenInGallery.bind(this);
        // edit artist
        this.onEditArtist = this.onEditArtist.bind(this);
        this.onArtistUpdateComplete = this.onArtistUpdateComplete.bind(this);
        this.onArtistUpdateCancel = this.onArtistUpdateCancel.bind(this);
        // edit photo
        this.onEditPhoto = this.onEditPhoto.bind(this);
        this.onPhotoUpdateComplete = this.onPhotoUpdateComplete.bind(this);
        this.onPhotoUpdateCancel = this.onPhotoUpdateCancel.bind(this);
        // delete artwork
        this.onDeleteArtwork = this.onDeleteArtwork.bind(this);
        this.onDeleteArtworkComplete = this.onDeleteArtworkComplete.bind(this);
        this.onDeleteArtworkCancel = this.onDeleteArtworkCancel.bind(this);
    }

    // open in gallery
    onOpenInGallery() {
        history.push(`/gallery/${this.props.artist.artistId}/artwork/${this.props.artworkId}`)
    }

    // edit artist
    onEditArtist() {
        history.push(`/artStudio/${this.props.artworkId}/editArtist`);
    }

    onArtistUpdateComplete() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    onArtistUpdateCancel() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    // edit photo
    onEditPhoto() {
        history.push(`/artStudio/${this.props.artworkId}/editPhoto`);
    }

    onPhotoUpdateComplete() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    onPhotoUpdateCancel() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    // delete artwork
    onDeleteArtwork() {
        history.push(`/artStudio/${this.props.artworkId}/deleteArtwork`);
    }

    onDeleteArtworkComplete() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    onDeleteArtworkCancel() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    render() {
        const { currentEditScreen, userId, artist, artworkId, artwork } = this.props;

        const artworkJustAdded = currentEditScreen === 'justAdded';
        const showControls = artworkJustAdded || !currentEditScreen;

        return (

            <Page title={'Edit Artwork'}>

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
                             artworkId={artworkId}
                             userId={userId}
                             artistId={artwork.artistId}
                             url={artwork.url}
                             onCancel={this.onPhotoUpdateCancel}
                             onUploadComplete={this.onPhotoUpdateComplete}/>
                }

                {showControls &&
                <EditPictureControls artist={artist}
                                     artworkJustAdded={artworkJustAdded}
                                     artwork={artwork}
                                     onDeleteArtwork={this.onDeleteArtwork}
                                     onOpenInGallery={this.onOpenInGallery}
                                     onEditPhoto={this.onEditPhoto}
                                     onEditArtist={this.onEditArtist}/>
                }

            </Page>
        );
    }
}

export default EditPicture;
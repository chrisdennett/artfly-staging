// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { addArtwork, addThumbnail } from '../../../actions/UserDataActions';
// components
import ArtistUpdaterView from '../ArtistUpdaterView';
import PhotoUploader from "../PhotoUploader/PhotoUploader";
import history from '../../global/history';
import PictureMakerEditor from "./PictureMakerEditor";
import PictureMakerNew from "./PictureMakerNew";

class ArtMaker extends Component {

    constructor() {
        super();

        this.getCurrentView = this.getCurrentView.bind(this);

        this.onImageUploadComplete = this.onImageUploadComplete.bind(this);
        this.onArtistUpdated = this.onArtistUpdated.bind(this);
        this.onNewPictureComplete = this.onNewPictureComplete.bind(this);
        this.onNewPictureCancel = this.onNewPictureCancel.bind(this);

        this.state = { isSaving: false, isLoading: false };
    }

    onNewPictureComplete(artworkId){
        history.push(`/artStudio/${artworkId}`);
    }

    onNewPictureCancel(){
        history.push(`/artStudio/new`);
    }

    onArtistUpdated(artworkId) {
        history.push(`/artStudio/${artworkId}`);
    }

    onImageUploadComplete(artworkId) {
        history.push(`/artStudio/${artworkId}/justAdded`);
    }

    onPhotoUpdateCancel(artworkId) {
        history.push(`/artStudio/${artworkId}`);
    }

    getCurrentView() {
        const { userId, artwork, artworkId, selectedArtistId, currentEditScreen, artist } = this.props;
        const { isSaving, isLoading, hasError } = this.state;

        let view = null;

        // If id is 'new' set up to add a new artwork
        if (isSaving) {
            view = (<div>Saving artwork...</div>)
        }
        else if (isLoading) {
            view = <div>Loading artwork</div>
        }
        else if (hasError) {
            view = <div>Sorry, there's been an error: [put error message here...]</div>
        }
        else if (artworkId === 'new') {
            view = <PictureMakerNew userId={userId}
                                    selectedArtistId={selectedArtistId}
                                    onCancel={this.onNewPictureCancel}
                                    onComplete={this.onNewPictureComplete}/>
        }
        else if (artwork) {
            if (currentEditScreen === 'justAdded' || !currentEditScreen) {
                view = <PictureMakerEditor isJustAdded={currentEditScreen === 'justAdded'}
                                           artist={artist}
                                           artworkId={artworkId}
                                           artwork={artwork}/>
            }
            else if (currentEditScreen === 'editArtist') {
                view = <ArtistUpdaterView artworkId={artworkId}
                                          initialArtistId={artwork.artistId}
                                          manageUpload={true}
                                          onUpdateComplete={this.onArtistUpdated}/>;
            }
            else if (currentEditScreen === 'editPhoto') {
                view = <PhotoUploader isUpdate={true}
                                      artworkId={artworkId}
                                      userId={userId}
                                      artistId={artwork.artistId}
                                      url={artwork.url}
                                      onCancel={this.onPhotoUpdateCancel}
                                      onUploadComplete={this.onImageUploadComplete}/>;
            }
        }
        return view;
    }

    render() {
        return this.getCurrentView();
    }
}

const mapActionsToProps = { addArtwork, addThumbnail };

export default connect(null, mapActionsToProps)(ArtMaker);
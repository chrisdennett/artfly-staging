// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
// actions
import { addArtwork, addThumbnail } from '../../../actions/UserDataActions';
// components
import ArtistUpdaterView from '../ArtistUpdaterView';
import PhotoUploader from "../../PhotoUploader/PhotoUploader";
import history from '../../global/history';
import ArtMakerOverview from "./ArtMakerOverview";

/*const states = {
    addPhoto: {
        screen: "Add a photo",
        PHOTO_SELECTED: {nextState:"editPhoto", localProps:"unsaved"}
    },
    editPhoto: {
        screen: "Crop and Rotate photo",
        SAVE_PHOTO: {nextState:"selectArtist", localProps:"unsaved"}
    },
    selectArtist: {
        screen: "Select an artist",
        props: "unsaved",
        save: "saving",
        cancel: "new"
    },
    saving: {
        screen: "saving artwork",
        success: "artworkLoading",
        failure: "error"
    },
    artworkLoading: {
        screen: "loading artwork",
        success: "artworkLoaded",
        failure: "error"
    },
    artworkLoaded: {
        screen: "Artwork Summary",
        editPhoto: "editingPhoto",
        editArtist: "editingArtist"
    },
    error: {
        screen: "error"
    }
};*/

class ArtMaker extends Component {

    constructor() {
        super();

        this.getCurrentView = this.getCurrentView.bind(this);
        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onSelectedArtistDone = this.onSelectedArtistDone.bind(this);
        this.onImageUploadComplete = this.onImageUploadComplete.bind(this);
        this.onArtistUpdated = this.onArtistUpdated.bind(this);

        this.state = { isSaving:false, isLoading: false};
    }

    onArtistSelected(artistId) {
        this.setState({ artistId: artistId })
    }

    onSelectedArtistDone(artistId) {
        history.push(`./new/${artistId}`);
    }

    onArtistUpdated(artworkId){
        history.push(`/artStudio/${artworkId}`);
    }

    onImageUploadComplete(artworkId) {
        history.push(`/artStudio/${artworkId}/justAdded`);
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
            // select an artist if one hasn't been already
            if (!selectedArtistId) {
                view = <ArtistUpdaterView onDone={this.onSelectedArtistDone}/>
            }
            // Otherwise upload a photo.
            else {
                view = (
                    <div>
                        Add a photo of the artwork by {selectedArtistId}
                        <PhotoUploader userId={userId} artistId={selectedArtistId} onUploadComplete={this.onImageUploadComplete}/>
                    </div>)
            }
        }
        else if (artwork) {
            if(!artist){
                view = <div>loading init...</div>
            }
            else if (currentEditScreen === 'justAdded' || !currentEditScreen) {
                view = <ArtMakerOverview isJustAdded={currentEditScreen === 'justAdded'}
                                         artist={artist}
                                         artworkId={artworkId}
                                         artwork={artwork}/>
            }
            else if(currentEditScreen === 'editArtist'){
                view = <ArtistUpdaterView artworkId={artworkId}
                                          initialArtistId={artwork.artistId}
                                          manageUpload={true}
                                          onUpdateComplete={this.onArtistUpdated}/>;
            }
            else if(currentEditScreen === 'editPhoto'){
                view = <PhotoUploader isUpdate={true} artworkId={artworkId} userId={userId} artistId={artwork.artistId} url={artwork.url} onUploadComplete={this.onImageUploadComplete}/>;
            }
        }
        return view;
    }

    render() {
        const view = this.getCurrentView();

        return (
            <StyledContainer>
                <h1>ArtMaker</h1>

                <section style={{ marginTop: 42 }}>
                    {view}
                </section>

            </StyledContainer>
        );
    }
}

const mapActionsToProps = { addArtwork, addThumbnail };

export default connect(null, mapActionsToProps)(ArtMaker);

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #ff00ff;
`;

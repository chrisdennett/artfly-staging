import React, { Component } from "react";
// components
import history from '../../global/history';
import ArtistUpdaterView from '../ArtistUpdater';
import PhotoUploader from "../PhotoUploader/PhotoUploader";
import Page from "../../global/Page";

class AddPicture extends Component {

    constructor() {
        super();

        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onSelectedArtistDone = this.onSelectedArtistDone.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = { isSaving: false, isLoading: false };
    }

    onArtistSelected(artistId) {
        this.setState({ artistId: artistId })
    }

    onSelectedArtistDone(artistId) {
        history.push(`/artStudio/new/${artistId}`);
    }

    onCancel(){
        history.push(`/artStudio/new/`);
    }

    render() {
        const { selectedArtistId, userId, onComplete } = this.props;

        let view = null;

        // select an artist if one hasn't been already
        if (!selectedArtistId) {
            view = <ArtistUpdaterView onDone={this.onSelectedArtistDone}/>
        }
        // Otherwise upload a photo.
        else {
            view = (
                <div>
                    Add a photo of the artwork by {selectedArtistId}
                    <PhotoUploader userId={userId}
                                   artistId={selectedArtistId}
                                   onCancel={this.onCancel}
                                   onUploadComplete={onComplete}/>
                </div>)
        }

        return (
            <Page title={'Add New Picture'}>
                {view}
            </Page>
        )
    }
}

export default AddPicture;
import React, { Component } from "react";
// components
import history from '../../global/history';
import ArtistSelector from '../../ArtistSelector/ArtistSelector';
import PhotoEditor from "../PhotoEditor/PhotoEditor";
import Page from "../../global/Page";

class AddPicture extends Component {

    constructor() {
        super();

        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onComplete = this.onComplete.bind(this);

        this.state = { isSaving: false, isLoading: false };
    }

    onArtistSelected(artistId) {
        history.push(`/artStudio/new/${artistId}`);
    }

    onCancel(){
        history.push(`/artStudio/new/`);
    }

    onComplete(artworkId){
        history.push(`/artStudio/${artworkId}/justAdded`);
    }

    render() {
        const { selectedArtistId, userId } = this.props;

        return (
            <Page title={'Add New Picture'}>
                Who is the artist for this piece?
                <ArtistSelector initialArtistId={selectedArtistId}
                                labelText={''}
                                onArtistSelected={this.onArtistSelected}
                                onInitialArtistSelected={this.onArtistSelected}/>

                <PhotoEditor userId={userId}
                             artistId={selectedArtistId}
                             onCancel={this.onCancel}
                             onUploadComplete={this.onComplete}/>
            </Page>
        )
    }
}

export default AddPicture;
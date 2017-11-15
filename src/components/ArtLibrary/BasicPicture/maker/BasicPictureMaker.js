// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { addArtwork, addThumbnail } from '../../../../actions/UserDataActions';
// components
import ArtistSelector from "../../../ArtistSelector/ArtistSelector";
import PhotoUploader from "../../../PhotoEditor/PhotoEditor";
import history from '../../../global/history';

class BasicPictureMaker extends Component {

    constructor() {
        super();
        // bindings
        this.onSave = this.onSave.bind(this);
        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.state = { selectedArtistId: '', sourceBlob: null, thumbBlob: null, widthToHeightRatio: null, heightToWidthRatio: null };
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId })
    }

    onSave(data) {
        const { userId } = this.props;
        const { selectedArtistId } = this.state;
        const { sourceBlob, thumbBlob, widthToHeightRatio, heightToWidthRatio } = data;

        this.props.addArtwork(userId, selectedArtistId, sourceBlob, widthToHeightRatio, heightToWidthRatio, (newArtworkData) => {
            const { artworkId, artistId } = newArtworkData;
            this.props.addThumbnail(artworkId, artistId, thumbBlob, (newThumbData) => {
                history.push(`/artStudio/${artworkId}`);
            })
        })
    }

    render() {
        return (
            <div>
                <ArtistSelector onArtistSelected={this.onArtistSelected} onInitialArtistSelected={this.onArtistSelected}/>
                <PhotoUploader onSave={this.onSave}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid
    }
};

const mapActionsToProps = { addArtwork, addThumbnail };

export default connect(mapStateToProps, mapActionsToProps)(BasicPictureMaker);
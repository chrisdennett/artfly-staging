// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { updateArtworkArtist } from '../../actions/UserDataActions';
// components
import ArtistSelector from '../ArtistSelector/ArtistSelector';

class ArtistUpdaterView extends Component {

    constructor() {
        super();

        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.uploadChanges = this.uploadChanges.bind(this);
        this.onDone = this.onDone.bind(this);

        this.state = { selectedArtistId: null }
    }

    onArtistSelected(selectedArtistId) {
        this.setState({ selectedArtistId });
    }

    uploadChanges(){
        this.props.updateArtworkArtist(this.props.artworkId, this.state.selectedArtistId, () => {
            console.log("update complete");
        });
    }

    onDone() {
        this.props.onDone(this.state.selectedArtistId);
    }

    render() {
        const onCompleteButt = this.props.manageUpload ?
            <button onClick={this.uploadChanges}>save changes</button> :
            <button onClick={this.onDone}>Next</button>;

            const {initialArtistId} = this.props;
            console.log("initialArtistId: ", initialArtistId);

        return (
            <div>
                Who is the artist for this piece?
                <ArtistSelector initialArtistId={initialArtistId}
                                onArtistSelected={this.onArtistSelected}
                                onInitialArtistSelected={this.onArtistSelected}/>
                {onCompleteButt}
            </div>
        );
    }
}

const mapActionsToProps = { updateArtworkArtist };
export default connect(null, mapActionsToProps)(ArtistUpdaterView);
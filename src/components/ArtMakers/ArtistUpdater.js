// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { updateArtworkArtist } from '../../actions/UserDataActions';
// components
import ArtistSelector from '../ArtistSelector/ArtistSelector';
import Butt from "../global/Butt";

class ArtistUpdater extends Component {

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
            this.props.onUpdateComplete(this.props.artworkId);
        });
    }

    onDone() {
        this.props.onDone(this.state.selectedArtistId);
    }

    render() {
        const onCompleteButt = this.props.manageUpload ?
            <Butt onClick={this.uploadChanges}>save changes</Butt> :
            <Butt onClick={this.onDone}>Next</Butt>;

            const {initialArtistId} = this.props;

        return (
            <div>
                Who is the artist for this piece?
                <ArtistSelector initialArtistId={initialArtistId}
                                labelText={''}
                                onArtistSelected={this.onArtistSelected}
                                onInitialArtistSelected={this.onArtistSelected}/>
                {onCompleteButt}
            </div>
        );
    }
}

const mapActionsToProps = { updateArtworkArtist };
export default connect(null, mapActionsToProps)(ArtistUpdater);
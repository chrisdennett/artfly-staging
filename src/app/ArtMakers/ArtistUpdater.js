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
        this.onCancel = this.onCancel.bind(this);

        this.state = { selectedArtistId: null }
    }

    onArtistSelected(selectedArtistId) {
        this.setState({ selectedArtistId }, () => {
            if(this.props.onUpdate) this.props.onUpdate(selectedArtistId);
        });
    }

    uploadChanges() {
        this.props.updateArtworkArtist(this.props.artworkId, this.state.selectedArtistId, () => {
            this.props.onUpdateComplete(this.props.artworkId);
        });
    }

    onDone() {
        this.props.onDone(this.state.selectedArtistId);
    }

    onCancel() {
        this.props.onCancel();
    }

    render() {
        const { initialArtistId } = this.props;

        return (
            <div>
                Who is the artist for this piece?
                <ArtistSelector initialArtistId={initialArtistId}
                                labelText={''}
                                onArtistSelected={this.onArtistSelected}
                                onInitialArtistSelected={this.onArtistSelected}/>

                <div>
                    <Butt onClick={this.uploadChanges}>Save changes</Butt>
                    <Butt onClick={this.onCancel}>Cancel</Butt>
                </div>
            </div>
        );
    }
}

const mapActionsToProps = { updateArtworkArtist };
export default connect(null, mapActionsToProps)(ArtistUpdater);
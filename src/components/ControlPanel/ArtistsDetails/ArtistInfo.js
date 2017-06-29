import React, { Component } from "react";
import { connect } from 'react-redux';

import EditArtistForm from './EditArtistForm';
import { setCurrentArtist, updateArtist, cancelArtistUpdate } from '../ControlPanelActions';

class ArtistInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { inEditingMode: false }
    }

    onEditButtClick() {
        this.props.setCurrentArtist(this.props.artistId, () => {
            this.setState({ inEditingMode: true })
        });
    }

    onCancelEdit() {
        this.props.cancelArtistUpdate(() => {
            this.setState({ inEditingMode: false })
        });
    }

    onFormSubmit(newArtistData) {
        this.props.updateArtist(this.props.artistId, newArtistData, () => {
            this.setState({ inEditingMode: false })
        });
    }

    render() {
        let content;
        let editButtonStyle = {};
        if(this.props.disableEditing){
            editButtonStyle.display = 'none';
        }

        if (this.state.inEditingMode) {
            content = (
                <EditArtistForm artistId={this.props.artistId}
                                artistName={this.props.artist.name}
                                onFormSubmit={this.onFormSubmit.bind(this)}
                                onFormCancel={this.onCancelEdit.bind(this)}/>
            );
        }
        else {
            content = (
                <div>
                    <div>Artist: {this.props.artist.name}</div>
                    <div>Biog: {this.props.artist.biog}</div>
                    <button style={editButtonStyle} onClick={this.onEditButtClick.bind(this)}>Edit</button>
                </div>
            );
        }

        return content;
    }
}

export default connect(null, { setCurrentArtist, updateArtist, cancelArtistUpdate })(ArtistInfo);

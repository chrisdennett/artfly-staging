// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { deleteArtwork } from '../../../actions/UserDataActions';
// components
import Butt from "../../global/Butt";

class ArtworkDeleter extends Component {

    constructor() {
        super();

        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.onDeleteCancel = this.onDeleteCancel.bind(this);

        this.state = { artworkDeleting: false }
    }

    onDeleteCancel() {
        this.props.onDeleteArtworkCancel();
    }

    onDeleteConfirm() {
        this.setState({ artworkDeleting: true }, () => {

            const { artist, artworkId } = this.props;
            const { artistId } = artist;

            this.props.deleteArtwork(artworkId, artistId, () => {
                this.props.onDeleteArtworkComplete();
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.artworkDeleting &&
                <div>
                    Deleting artwork...
                </div>
                }

                {this.state.artworkDeleting === false &&
                <div>
                    <p>Are you sure you want to delete the artwork?</p>
                    <Butt label={'Yes, delete it'} onClick={this.onDeleteConfirm}/>
                    <Butt label={'No, do not delete'} onClick={this.onDeleteCancel}/>
                </div>}
            </div>
        );
    }
}

const mapActionsToProps = { deleteArtwork };

export default connect(null, mapActionsToProps)(ArtworkDeleter);
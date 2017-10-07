// Externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// Actions
import { fetchUserData } from '../actions/UserActions';
import { fetchLocalPrice } from '../actions/PaddleActions';
import { fetchArtist, fetchArtistArtworkIds } from "../actions/ArtistGalleryActions";

class AppDataFetcher extends Component {

    constructor(props) {
        super(props);

        props.fetchUserData((userData) => {
            if (userData) {
                for (let artistId of Object.keys(userData.artistIds)) {
                    props.fetchArtist(artistId);
                    props.fetchArtistArtworkIds(artistId);
                }
            }
        });
        props.fetchLocalPrice();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    null, { fetchUserData, fetchLocalPrice, fetchArtist, fetchArtistArtworkIds }
)(AppDataFetcher);
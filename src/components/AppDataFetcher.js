// Externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// Actions
import { fetchUserData } from '../actions/UserActions';
import { fetchLocalPrice } from '../actions/PaddleActions';
import { getGalleryParams } from "../actions/UiActions";
import { fetchArtist, fetchArtistArtworkIds, fetchArtwork } from "../actions/ArtistGalleryActions";

class AppDataFetcher extends Component {

    constructor(props) {
        super(props);
        this.state = { pageWidth: 0, pageHeight: 0, inMobileMode: null };
    }

    componentWillMount() {
        this.fetchGlobalData();
    }

    componentDidUpdate() {
        const { pageDataRequired } = this.props;
        if (pageDataRequired) {
            for (let dataName of pageDataRequired) {
                this.fetchPageData(dataName);
            }
        }
    }

    fetchGlobalData = () => {
        this.props.fetchUserData((userData) => {
            if (userData) {
                for (let artistId of Object.keys(userData.artistIds)) {
                    this.props.fetchArtist(artistId);
                    this.props.fetchArtistArtworkIds(artistId);
                }
            }
        });
        this.props.fetchLocalPrice();
    };

    fetchPageData = (dataName) => {
        switch (dataName) {
            case 'artistArtworks':
                this.fetchArtistArtworks();
                break;
            case 'galleryParams':
                this.fetchGalleryParams();
                break;
            case 'artwork':
                this.fetchArtwork();
                break;
            default:
                return;
        }
    };

    fetchArtistArtworks = () => {
        // NB: galleryId and artistId are identical
        if (this.props.artist && this.props.artist.artworkIds) {
            // Actions take care not to call the same artwork twice.
            // NB: artworkIds is a collection artworkIds:{id:date, id2:date2}
            const ids = Object.keys(this.props.artist.artworkIds);

            for (let id of ids) {
                this.props.fetchArtwork(id);
            }
        }
    };

    fetchArtwork = () => {
        if(this.props.artworkId){
            this.props.fetchArtwork(this.props.artworkId);
        }
    };

    fetchGalleryParams = () => {
        if (this.props.artist && this.props.artist.artworkIds && this.props.windowSize) {
            const totalArtworks = Object.keys(this.props.artist.artworkIds).length || 0;
            const inMobileMode = this.props.windowSize.windowWidth < 500;

            this.props.getGalleryParams(totalArtworks, inMobileMode);
        }
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const artist = state.artists[ownProps.galleryId] || [];

    return {
        artist: artist,
        userArtists: state.artists,
        windowWidth: state.windowWidth,
        windowSize: state.ui.windowSize
    }
};

export default connect(
    mapStateToProps, {
        fetchUserData,
        fetchLocalPrice,
        fetchArtist,
        fetchArtistArtworkIds,
        fetchArtwork,
        getGalleryParams
    }
)(AppDataFetcher);
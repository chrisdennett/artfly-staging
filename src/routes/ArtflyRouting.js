// Externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import ga from '../libs/googleAnalyticsConfig';
// Components
import history from '../components/global/history';
import App from "../components/App";
// Actions
import { fetchUserData } from '../actions/UserActions';
import { fetchLocalPrice } from '../actions/PaddleActions';
import { fetchArtist, fetchArtistArtworkIds } from "../actions/ArtistGalleryActions";

class ArtflyRouting extends Component {

    constructor(props) {
        super(props);

        this.state = { unlisten: null, galleryId: null, artworkId: null, artistId: null };

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

    componentDidMount() {
        const location = history.location;

        this.setPageData(location.pathname);

        const unlisten = history.listen((location) => {
            this.setPageData(location.pathname);
        });

        this.setState({ unlisten: unlisten });
    }

    componentWillUnmount() {
        this.state.unlisten();
    }

    setPageData(fullPath) {
        let page, params = {};

        if (fullPath === '/') {
            page = 'home';
        }
        else {
            const sections = fullPath.split('/').slice(1);
            page = sections[0];

            if (page === 'gallery') {
                params.galleryId = sections[1];

                if (sections[2]) {
                    page = 'artwork';
                    params.artworkId = sections[3];
                }
            }
            else if (page === 'artwork-editor') {
                params.artworkId = sections[1];
            }
            else if (page === 'add-or-edit-artist') {
                params.artistId = sections[1];
            }
            else if (page === 'add-or-edit-user') {
                params.userId = sections[1];
            }
        }

        this.setState(() => {
            return {
                page: page,
                params: params
            }
        });

        ga.set({ page: page });
        ga.pageview(fullPath);
    }

    render() {
        return <App page={this.state.page} params={this.state.params} history={history}/>
    }
}

const ArtflyRoutingContainer = connect(
    null, { fetchUserData, fetchLocalPrice, fetchArtist, fetchArtistArtworkIds }
)(ArtflyRouting);

export default ArtflyRoutingContainer;
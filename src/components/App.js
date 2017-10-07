// Externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// Components
import AppControls from "../components/AppControls/AppControls";
import ArtistGalleryContainer from '../components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "../components/Settings/SettingsContainer";
import ArtistEditorContainer from "../components/ArtistEditor/ArtistEditorContainer";
import UserEditorContainer from "../components/UserEditor/UserEditorContainer";
import ArtworkContainer from '../components/Artwork/ArtworkContainer';
import ArtworkEditorContainer from "../components/ArtworkEditor/ArtworkEditorContainer";
import Home from '../components/Home/Home';
// Actions
import { fetchUserData } from '../actions/UserActions';
import { fetchLocalPrice } from '../actions/PaddleActions';
import { fetchArtist, fetchArtistArtworkIds } from "../actions/ArtistGalleryActions";

class App extends Component {
    constructor(props) {
        super(props);
        this.getComponent = this.getComponent.bind(this);


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

    getComponent(page, params) {
        let component = null;
        if (page === 'home') component = <Home/>;
        else if (page === 'settings') component = <SettingsContainer/>;
        else if (page === 'artwork') component = <ArtworkContainer artworkId={params.artworkId}/>;
        else if (page === 'gallery') component = <ArtistGalleryContainer history={this.props.history} galleryId={params.galleryId}/>;
        else if (page === 'artwork-editor') component = <ArtworkEditorContainer history={this.props.history} artworkId={params.artworkId}/>;
        else if (page === 'add-or-edit-artist') component = <ArtistEditorContainer history={this.props.history} artistId={params.artistId}/>;
        else if (page === 'add-or-edit-user') component = <UserEditorContainer userId={params.userId}/>;

        return component;
    }

    render() {
        const PageComponent = this.getComponent(this.props.page, this.props.params);

        return (
            <div>
                <AppControls {...this.props.params}/>
                {PageComponent}
            </div>
        );
    }
}

const AppContainer = connect(
    null, { fetchUserData, fetchLocalPrice, fetchArtist, fetchArtistArtworkIds }
)(App);

export default AppContainer;
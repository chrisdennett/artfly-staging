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
import FourOhFour from "./FourOhFour/FourOhFour";
import AppDataFetcher from "./AppDataFetcher";

const routes = {
    home: { component: Home },
    settings: { component: SettingsContainer },
    gallery: { component: ArtistGalleryContainer },
    artwork: { component: ArtworkContainer },
    artworkEditor: { component: ArtworkEditorContainer },
    addOrEditArtist: { component: ArtistEditorContainer },
    addOrEditUser: { component: UserEditorContainer }
};

class App extends Component {
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

    getComponentWithProps = () => {
        const PageComponent = routes[this.props.page] ? routes[this.props.page].component : FourOhFour;
        return (<PageComponent history={this.props.history} {...this.props.params}/>);
    };

    render() {
        const PageComponentWithProps = this.getComponentWithProps();

        return (
            <AppDataFetcher>
                <AppControls {...this.props.params}/>
                {PageComponentWithProps}
            </AppDataFetcher>
        );
    }
}

const AppContainer = connect(
    null, { fetchUserData, fetchLocalPrice, fetchArtist, fetchArtistArtworkIds }
)(App);

export default AppContainer;
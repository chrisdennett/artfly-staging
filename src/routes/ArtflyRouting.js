import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ArtistGalleryContainer from '../components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "../components/Settings/SettingsContainer";
import ArtistEditorContainer from "../components/ArtistEditor/ArtistEditorContainer";
import UserEditorContainer from "../components/UserEditor/UserEditorContainer";
import ArtworkContainer from '../components/Artwork/ArtworkContainer';
import ArtworkEditorContainer from "../components/ArtworkEditor/ArtworkEditorContainer";
import AppControls from '../components/AppControls/AppControls'
import Home from '../components/Home/Home';
import ReactGA from 'react-ga';

import { fetchUserData } from '../actions/UserActions';
import { fetchLocalPrice } from '../actions/PaddleActions';
import { fetchArtist, fetchArtistArtworkIds } from "../actions/ArtistGalleryActions";

class ArtflyRouting extends Component {

    constructor(props) {
        super(props);

        props.fetchUserData((userData) => {
            // get artist Ids to can load artist data and artist artworkIds
            // add an action to calculate total artworks and make sure this is called if artistArtworkIds change
            if(userData){
                for(let artistId of Object.keys(userData.artistIds)){
                    props.fetchArtist(artistId);
                    props.fetchArtistArtworkIds(artistId);
                }
            }
        } );
        props.fetchLocalPrice();
    }

    render() {
        const routes = [
            { path: "/gallery/:galleryId/artwork/:artworkId", component: ArtworkContainer },
            { path: "/gallery/:galleryId", component: ArtistGalleryContainer },
            { path: "/settings", component: SettingsContainer },
            { path: "/artwork-editor/:artworkId", component: ArtworkEditorContainer },
            { path: "/add-or-edit-artist/:artistId?", component: ArtistEditorContainer },
            { path: "/add-or-edit-user/:userId?", component: UserEditorContainer },
            { path: "/", component: Home }
        ];

        return (
            <BrowserRouter>
                <div id={'routes-holder'}>

                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                component={AppControls}
                            />
                        ))}
                        <Route path="/" render={({ location }) => {
                            ReactGA.set({ page: location.pathname });
                            ReactGA.pageview(location.pathname);
                            return null;
                        }}/>
                    </Switch>

                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                    </Switch>

                </div>
            </BrowserRouter>
        );
    }
};

// export default ArtflyRouting;
const ArtflyRoutingContainer = connect(
    null, { fetchUserData, fetchLocalPrice, fetchArtist, fetchArtistArtworkIds }
)(ArtflyRouting);

export default ArtflyRoutingContainer;
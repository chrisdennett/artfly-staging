import React from "react";
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

const ArtflyRouting = function () {
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
};

export default ArtflyRouting;
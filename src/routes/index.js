import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import store from '../store';
import ArtistGalleryContainer from '../components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "../components/Settings/SettingsContainer";
import ArtistEditorContainer from "../components/ArtistEditor/ArtistEditorContainer";
import UserEditorContainer from "../components/UserEditor/UserEditorContainer";
import ArtworkContainer from '../components/Artwork/ArtworkContainer';
import ArtworkEditorContainer from "../components/ArtworkEditor/ArtworkEditorContainer";
import AppControls from '../components/AppControls/AppControls'
import Home from '../components/Home/Home';

ReactGA.initialize('UA-102619335-1'); //Unique Google Analytics tracking number

const routes = [
    { path: "/gallery/:galleryId/artwork/:artworkId", component: ArtworkContainer },
    { path: "/gallery/:galleryId", component: ArtistGalleryContainer },
    { path: "/settings", component: SettingsContainer },
    { path: "/artwork-editor/:artworkId", component: ArtworkEditorContainer },
    { path: "/add-or-edit-artist/:artistId?", component: ArtistEditorContainer },
    { path: "/add-or-edit-user/:userId?", component: UserEditorContainer },
    { path: "/", component: Home }
];

export default (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            component={AppControls}
                        />
                    ))}
                    <Route path="/" render={({location}) => {
                        ReactGA.set({ page: location.pathname });
                        ReactGA.pageview(location.pathname);
                        return null;
                    }} />
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
    </Provider>
);
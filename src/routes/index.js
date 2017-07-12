import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from '../store';
import ArtistGalleryContainer from '../components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "../components/Settings/SettingsContainer";
import AddOrEditArtistContainer from "../components/Settings/ArtistEditor/ArtistEditorContainer";
import ArtworkContainer from '../components/Artwork/ArtworkContainer';
import Home from '../components/Home/Home';
import UserControls from "../components/AppControls/UserControls/UserControls";
import ArtworkEditor from "../components/Settings/ArtworkEditor/ArtworkEditor";

const routes = [
    { path: "/gallery/:galleryId/artwork/:artworkId", component: ArtworkContainer },
    { path: "/gallery/:galleryId", component: ArtistGalleryContainer },
    { path: "/settings", component: SettingsContainer },
    { path: "/artwork-editor/:artworkId", component: ArtworkEditor },
    { path: "/add-or-edit-artist/:artistId?", component: AddOrEditArtistContainer },
    { path: "/", component: Home }
];

/*
 ~ The two switch statements are the simplest way I've found to ensure parameters are passed to the UserControls
 */
export default (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            component={UserControls}
                        />
                    ))}
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
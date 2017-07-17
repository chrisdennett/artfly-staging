import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-102619335-1'); //Unique Google Analytics tracking number

import store from '../store';
import ArtistGalleryContainer from '../components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "../components/Settings/SettingsContainer";
import ArtistEditorContainer from "../components/Settings/ArtistEditor/ArtistEditorContainer";
import UserEditorContainer from "../components/Settings/UserEditor/UserEditorContainer";
import ArtworkContainer from '../components/Artwork/ArtworkContainer';
import AppControls from '../components/AppControls/AppControls'
import Home from '../components/Home/Home';
import ArtworkEditor from "../components/Settings/ArtworkEditor/ArtworkEditor";

const routes = [
    { path: "/gallery/:galleryId/artwork/:artworkId", component: ArtworkContainer },
    { path: "/gallery/:galleryId", component: ArtistGalleryContainer },
    { path: "/settings", component: SettingsContainer },
    { path: "/artwork-editor/:artworkId", component: ArtworkEditor },
    { path: "/add-or-edit-artist/:artistId?", component: ArtistEditorContainer },
    { path: "/add-or-edit-user/:userId?", component: UserEditorContainer },
    { path: "/", component: Home }
];

/*
 ~ The two switch statements are the simplest way I've found to ensure parameters are passed to the UserControls
 */
/*const history = createHistory();
history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});*/

export default (
    <Provider store={store}>
        <BrowserRouter history={history}>
            <div>
                <Switch>
                    <Route path="/" render={({location}) => {
                        console.log("location: ", location);
                        ReactGA.set({ page: location.pathname });
                        ReactGA.pageview(location.pathname);
                        return null;
                    }} />
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            component={AppControls}
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
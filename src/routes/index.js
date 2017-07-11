import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from '../store';
import ArtistGalleryContainer from '../components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "../components/Settings/SettingsContainer";
import AddOrEditArtistContainer from "../components/AddOrEditArtist/AddOrEditArtistContainer";
import Home from '../components/Home/Home';
// import Gallery from '../components/ArtistGallery/Gallery';
import ArtworkContainer from '../components/Artwork/ArtworkContainer';

import UserControls from "../components/User/UserControls";
import ArtworkEditor from "../components/ArtworkEditor/ArtworkEditor";

/*
~ The two switch statements are the simplest way I've found to ensure parameters are passed to the UserControls
*/
export default (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/gallery/:galleryId/artwork/:artworkId" component={UserControls}/>
                    <Route path="/gallery/:galleryId" component={UserControls}/>
                    <Route path="/settings" component={UserControls}/>
                    <Route path="/artwork-editor/:artworkId" component={UserControls}/>
                    <Route path="/add-or-edit-artist/:artistId?" component={UserControls}/>
                    <Route path="/" component={UserControls}/>
                </Switch>

                <Switch>
                    <Route path="/gallery/:galleryId/artwork/:artworkId" component={ArtworkContainer}/>
                    <Route path="/gallery/:galleryId" component={ArtistGalleryContainer}/>
                    <Route path="/settings" component={SettingsContainer}/>
                    <Route path="/artwork-editor/:artworkId" component={ArtworkEditor}/>
                    <Route path="/add-or-edit-artist/:artistId?" component={AddOrEditArtistContainer}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);
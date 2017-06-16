import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from '../store';
import Home from '../components/Home/Home';
import Gallery from '../components/Gallery/Gallery';
// import Artwork from '../components/Artwork/Artwork';
// import ArtworkEditing from '../components/Artwork/ArtworkEditing';
import UserControls from "../components/User/UserControls";
import ControlPanel from "../components/ControlPanel/ControlPanel";

export default (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <UserControls />

                <Switch>
                    <Route path="/gallery/:galleryId/artwork/:artworkId" component={Gallery}/>
                    <Route path="/gallery/:galleryId" component={Gallery}/>
                    <Route path="/controlPanel" component={ControlPanel}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);
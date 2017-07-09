import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from '../store';
import Home from '../components/Home/Home';
import Gallery from '../components/Gallery/Gallery';
import UserControls from "../components/User/UserControls";
import MyGalleries from "../components/MyGalleries/MyGalleries";
import ArtworkEditor from "../components/ArtworkEditor/ArtworkEditor";

export default (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <div>
                    <Switch>
                        <Route path="/gallery/:galleryId/artwork/:artworkId" component={UserControls}/>
                        <Route path="/gallery/:galleryId" component={UserControls}/>
                        <Route path="/myGalleries" component={UserControls}/>
                        <Route path="/artwork-editor/:artworkId" component={UserControls}/>
                        <Route path="/" component={UserControls}/>
                    </Switch>
                </div>
                <div>
                    {/*<UserControls />*/}
                    <Switch>
                        <Route path="/gallery/:galleryId/artwork/:artworkId" component={Gallery}/>
                        <Route path="/gallery/:galleryId" component={Gallery}/>
                        <Route path="/myGalleries" component={MyGalleries}/>
                        <Route path="/artwork-editor/:artworkId" component={ArtworkEditor}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
);
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Home from '../components/Home/Home';
import MyGallery from '../components/Gallery/MyGallery';
import Artwork from '../components/Artwork/Artwork';
import ArtworkEditing from '../components/Artwork/ArtworkEditing';
import Login from '../components/User/Login';
import ArtworkAdder from '../components/ArtworkAdder/ArtworkAdder';
import store from '../store';

export default (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <ArtworkAdder />
                <Login />

                <div>
                    <Link to="/">home</Link>
                </div>
                <Switch>
                    <Route path="/artwork/:artworkId/:editMode" component={ArtworkEditing}/>
                    <Route path="/artwork/:artworkId" component={Artwork}/>
                    <Route path="/mygallery" component={MyGallery}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
);
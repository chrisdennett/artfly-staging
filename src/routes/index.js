import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from '../store';
import Home from '../components/Home/Home';
import Gallery from '../components/Gallery/Gallery';
import UserControls from "../components/User/UserControls";
import ControlPanel from "../components/ControlPanel/ControlPanel";

export default (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <div>
                    <Switch>
                        <Route path="/gallery/:galleryId/artwork/:artworkId" component={UserControls}/>
                        <Route path="/gallery/:galleryId" component={UserControls}/>
                        <Route path="/controlPanel" component={UserControls}/>
                        <Route path="/" component={UserControls}/>
                    </Switch>
                </div>
                <div>
                    {/*<UserControls />*/}
                    <Switch>
                        <Route path="/gallery/:galleryId/artwork/:artworkId" component={Gallery}/>
                        <Route path="/gallery/:galleryId" component={Gallery}/>
                        <Route path="/controlPanel" component={ControlPanel}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>
);
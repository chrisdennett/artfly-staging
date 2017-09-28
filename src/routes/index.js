import React from 'react';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import store from '../store';
import ArtflyRouting from "./ArtflyRouting";

ReactGA.initialize('UA-102619335-1'); //Unique Google Analytics tracking number

export default (
    <Provider store={store}>
        <ArtflyRouting/>
    </Provider>
);
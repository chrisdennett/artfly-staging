import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import ArtflyRouting from "./ArtflyRouting";

export default (
    <Provider store={store}>
        <ArtflyRouting/>
    </Provider>
);
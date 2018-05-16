// externals
import "babel-polyfill"; // is this needed still
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// store - where the entire app state lives
import store from './store/store';
// homebrew routing
import AppRouting from "./AppRouting";

window.store = store;

// Provider allows any child component to connect to the redux store
const provider = (
    <Provider store={store}>
        <AppRouting/>
    </Provider>);

// Render the app to the element in public > index.html with the root id
ReactDom.render(
    provider,
    document.getElementById('root')
);

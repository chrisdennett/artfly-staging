// externals
import "babel-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension'; // handy for debugging
// reducer index.js
import reducers from './actionReducers/index';
// homebrew routing
import AppRouting from "./AppRouting";

// redux store using thunk for async actions e.g used with firebase calls
const store = createStore(reducers, applyMiddleware(thunk));
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

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

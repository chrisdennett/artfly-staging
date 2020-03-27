// externals
import "babel-polyfill"; // is this needed still
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
// store - where the entire components state lives
import store from './store/store';
// store and route connector
import { connectRouteToStore } from "./AppRouteConnector";
// comp
import App from "./App";

Sentry.init({
    dsn: "https://40fb1439e4c84e08bb25bce60b0c19a8@sentry.io/1383134"
});

connectRouteToStore(store);

// Provider allows any child component to connect to the redux store
const provider = (
    <Provider store={store}>
        <App />
    </Provider>);

// Render the components to the element in public > index.html with the root id
ReactDom.render(
    provider,
    document.getElementById('root')
);

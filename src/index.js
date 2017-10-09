// externals
import React from 'react';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/';
import { composeWithDevTools } from 'redux-devtools-extension'; // handy for debugging
// homebrew routing
import AppRouting from "./components/AppRouting";

// redux store using thunk for async actions e.g used with firebase calls
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
// More redux stuff to link up the store
const provider = (<Provider store={store}><AppRouting/></Provider>);

// Render the app to the index root element
ReactDom.render(
    provider,
    document.getElementById('root')
);

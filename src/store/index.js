import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // handy for debugging

import reducers from '../reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;
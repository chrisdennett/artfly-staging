import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension'; // handy for debugging
import reducers from "../actionReducers";

// redux store using thunk for async actions e.g used with firebase calls
const store = createStore(reducers, applyMiddleware(thunk));
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
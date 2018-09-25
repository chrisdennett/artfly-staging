import { createStore, applyMiddleware } from 'redux';
// redux store using thunk for async actions e.g used with firebase calls
import thunk from 'redux-thunk';
import reducers from "../actionReducers";

// DEV ONLY - handy for debugging -- comment out before commit
// import { composeWithDevTools } from 'redux-devtools-extension';
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
// RELEASE
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
// externals
import "babel-polyfill"; // is this needed still
import debounce from 'debounce';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// store - where the entire app state lives
import store from './store/store';
// actions
import { UpdateUrl} from "./actions/UrlActions";
// homebrew routing
import AppRouting from "./AppRouting";


const {history, location} = window;

if ("scrollRestoration" in history) {
    // Back off, browser, I got this...
    window.history.scrollRestoration = "manual";
}

/*const initialState = {
    pathname: typeof location !== "undefined" ? location.pathname : "/"
};*/

/*const urlReducer = (state = initialState, action) => {
    if (action.type === "UPDATE_URL") {
        return { pathname: action.payload };
    }
    return state;
};*/

// const doUpdateUrl = pathname => ({ type: "UPDATE_URL", payload: pathname });

const restoreScrollPosition = () => {
    const { state } = window.history;
    if (state) {
        const newStyle = `height: ${state.height}px; width: ${state.width}px;`;
        document.body.setAttribute("style", newStyle);
        window.scrollTo(state.x, state.y);

        // Here we just tidy up after ourselves and remove the style
        // we forcibly set on body
        const getCallback = window.requestAnimationFrame || setTimeout;
        getCallback(() => {
            document.body.removeAttribute("style");
        });
    }
};

const saveScrollPosition = () => {
    // measure some things
    const state = {
        height: document.body.offsetHeight,
        width: document.body.offsetWidth,
        y: document.body.scrollTop,
        x: document.body.scrollLeft
    };
    window.history.replaceState(state, "");
};

// Update Redux if we navigated via browser's back/forward
// capabilities. Scroll position of document.body will be maintained
// automatically as long as our layout uses document.body for scrolling
window.addEventListener("popstate", () => {
    store.dispatch(UpdateUrl(window.location.pathname));
    restoreScrollPosition();
});

restoreScrollPosition();
window.addEventListener("scroll", debounce(saveScrollPosition, 300), {
    passive: true
});

// update browser if we navigated via
// changing state in redux
store.subscribe(() => {
    const { pathname } = store.getState().routing;

    if (location.pathname !== pathname) {
        window.history.pushState(null, "", pathname);
        saveScrollPosition();
        // force scroll to top this is what browsers normally do when
        // navigating by clicking a link to a new page.
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
    }
});

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

import { UPDATE_URL } from "../actions/UrlActions";

const initialState = {
    pathname: typeof window.location !== "undefined" ? window.location.pathname : "/"
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_URL:
            return { pathname: action.payload };
        default:
            return state;
    }
};
import React from "react";
import { connect } from 'react-redux';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// selectors
import {getCurrentPageComponent, getRouteParams} from "./RouteSelector";
// comps
import AppDataFetching from "./AppDataFetching";

const ArtflyRouting = ({ currentPage, params }) => {
    return (
        <AppDataFetching params={params}>
            {currentPage}
        </AppDataFetching>
    );
};

const mapAppStateToProps = (state) => {
    return {
        currentPage: getCurrentPageComponent(state),
        params: getRouteParams(state)
    }
};

export default connect(mapAppStateToProps)(ArtflyRouting);

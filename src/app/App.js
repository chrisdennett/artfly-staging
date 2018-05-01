import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";
import NotificationViewer from "./global/notifications/NotificationViewer";

class App extends Component {

    render() {
        const { children } = this.props;

        return (
            <div className='app'>

                <NotificationViewer/>

                {IN_STAGING &&
                <div className={'app--betaTestingFlag'}>
                    IN STAGING MODE
                </div>
                }

                <WindowDimensionsTracker>
                    {children}
                </WindowDimensionsTracker>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapActionsToProps = null;
export default connect(mapStateToProps, mapActionsToProps)(App);
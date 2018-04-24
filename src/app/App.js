import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";
import SignInOut from './SignInOut/SignInOut';
import NotificationViewer from "./global/notifications/NotificationViewer";

class App extends Component {

    render() {
        const { children, page, user } = this.props;

        return (
            <div className='app'>

                <NotificationViewer/>

                {page !== 'artwork' &&
                <div className={'app--topBar'}>
                    <SignInOut user={user}/>
                </div>
                }


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
const mapActionsToProps = null; //{ listenForUserChanges, listenForUserArtworkChanges };
export default connect(mapStateToProps, mapActionsToProps)(App);
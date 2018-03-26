import React, { Component } from "react";
// styles
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";
import SignInOut from './SignInOut/SignInOut';

class App extends Component {

    render() {
        const { children } = this.props;

        return (
            <div className='app'>

                <SignInOut />

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

export default App;
import React, { Component } from "react";
// styles
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";

class App extends Component {

    render() {
        const { children } = this.props;

        return (
            <div className='app'>

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
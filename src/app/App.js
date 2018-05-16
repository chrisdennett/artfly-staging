import React from "react";
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// components
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";
import NotificationViewer from "./global/notifications/NotificationViewer";

const App = function ({ children }) {

    return (
        <div className='app'>

            <NotificationViewer/>

            {IN_STAGING &&
            <div className={'app--betaTestingFlag'}>
                IN STAGING MODE
            </div>
            }

            {children}

        </div>
    );
};

export default App;
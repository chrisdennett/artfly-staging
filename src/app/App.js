import React from "react";
import { Typography } from 'rmwc/Typography';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// components
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";
import NotificationViewer from "./global/notifications/NotificationViewer";

const App = function ({ children }) {

    return (
        <Typography>

            <NotificationViewer/>

            {IN_STAGING &&
            <div className={'app--betaTestingFlag'}>
                IN STAGING MODE
            </div>
            }

            {children}

        </Typography>
    );
};

export default App;
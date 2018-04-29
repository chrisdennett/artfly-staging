import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection
} from 'rmwc/Toolbar';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";
import SignInOut from './SignInOut/SignInOut';
import NotificationViewer from "./global/notifications/NotificationViewer";
import Link from "./global/Butt/Link";
import IconLogo from "./global/icon/icons/IconLogo";

class App extends Component {

    render() {
        const { children, user } = this.props;

        return (
            <div className='app'>

                <Toolbar fixed style={{background:'rgba(0,0,0,0.2)', boxShadow:'none'}}>
                    <ToolbarRow>
                        <ToolbarSection alignStart>
                            <Link linkTo={'/'}>
                                <IconLogo/>
                            </Link>
                        </ToolbarSection>
                        <ToolbarSection alignEnd>
                            <SignInOut user={user}/>
                        </ToolbarSection>
                    </ToolbarRow>
                </Toolbar>

                <NotificationViewer/>

                {/*{page !== 'artwork' &&
                <div className={'app--topBar'}>
                    <SignInOut user={user}/>
                </div>
                }*/}

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
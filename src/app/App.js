import React, { Component } from "react";
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFacebookSquare from '@fortawesome/fontawesome-free-brands/faFacebookSquare';
import faTwitterSquare from '@fortawesome/fontawesome-free-brands/faTwitterSquare';
// styles
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import { IN_STAGING } from "./global/GLOBAL_CONSTANTS";
import SignInOut from './SignInOut/SignInOut';

class App extends Component {

    render() {
        const { children, page, user } = this.props;

        return (
            <div className='app'>

                {page !== 'artwork' &&
                <div className={'app--topBar'}>
                    <div>
                        <a href='https://twitter.com/artflychris'
                            target="_blank"
                            rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare}/></a>

                        <a href='https://www.facebook.com/artfly.io/'
                           target="_blank"
                           rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookSquare}/> </a>
                    </div>

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
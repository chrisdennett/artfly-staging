// externals
import React from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFacebookSquare from '@fortawesome/fontawesome-free-brands/faFacebookSquare';
import faTwitterSquare from '@fortawesome/fontawesome-free-brands/faTwitterSquare';
// styles
import './homeStyles.css';
// components
import { IN_BETA_TESTING } from '../global/GLOBAL_CONSTANTS';
import Title from "./Title";
import SignInOut from '../SignInOut/SignInOut';
import PublicHome from "./PublicHome/PublicHome";
import UserHome from "./UserHome/UserHome";
import Footer from "./Footer/Footer";

const Home = ({ user }) => {
    const userLoggedIn = user && user.loginStatus === 'loggedIn';

    return (
        <div>
            <div className={'home--topBar'}>
                <a href='https://twitter.com/artflychris'
                   target="_blank"
                   rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare}/></a>

                <a href='https://www.facebook.com/artfly.io/'
                   target="_blank"
                   rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookSquare}/> </a>
            </div>

            <div className='home--heading'>
                <div>
                    <Title/>
                </div>
                <div className='home--tagLine'>Artworks don't belong in a drawer, bin or hard drive. <br/>There's a
                    better
                    place...
                </div>

                {!IN_BETA_TESTING &&
                <div className='home--signInOut'>
                    <SignInOut/>
                </div>
                }

            </div>

            {userLoggedIn &&
            <UserHome/>
            }

            {!userLoggedIn &&
            <PublicHome/>
            }

            <Footer/>

        </div>
    );
};

export default Home;

// externals
import React from "react";
// styles
import './homeStyles.css';
// components
import { IN_BETA_TESTING } from '../global/GLOBAL_CONSTANTS';
import Title from "./Title";
import SignInOut from '../SignInOut/SignInOut';
import PublicHome from "./PublicHome/PublicHome";
import Footer from "./Footer/Footer";
import LinkButt from "../global/Butt/LinkButt";

const Home = ({ user }) => {
    const userArtworks = user && user.artworks ? user.artworks : [];
    const userLoggedIn = user && user.loginStatus === 'loggedIn';

    return (
        <div>
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

            {!userLoggedIn &&
            <PublicHome/>
            }

            {userLoggedIn &&
            <div>
                <LinkButt linkTo={'/quickArtworkMaker'}>Add new Artwork</LinkButt>
                {
                    userArtworks.map(artwork => {
                        return <LinkButt key={artwork.artworkId} linkTo={`/quickArtworkMaker/${artwork.artworkId}`}>Open artwork</LinkButt>
                    })

                }
            </div>
            }

            <Footer/>

        </div>
    );
};

export default Home;

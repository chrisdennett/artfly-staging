// externals
import React from "react";
import { connect } from 'react-redux';
// styles
import './homeStyles.css';
// components
import { IN_BETA_TESTING } from '../global/GLOBAL_CONSTANTS';
import Title from "./Title";
import SignInOut from '../SignInOut/SignInOut';
import PublicHome from "./PublicHome/PublicHome";
import Footer from "./Footer/Footer";
import LinkButt from "../global/Butt/LinkButt";

const Home = ({ user, userArtworks }) => {
    const userLoggedIn = user && user.loginStatus === 'loggedIn';

    return (
        <div className={'home'}>
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
                <LinkButt linkTo={'/artwork'}>Add new Artwork</LinkButt>
                {
                    Object.keys(userArtworks).map(artworkId => {
                        return <LinkButt key={artworkId} linkTo={`/artwork/${artworkId}`}>
                            Open artwork: {artworkId}
                        </LinkButt>
                    })

                }
            </div>
            }

            <Footer/>

        </div>
    );
};

const mapStateToProps = (state) => {
    const { user, artworks } = state;
    let userArtworks = {};

    if (user && artworks) {
        const artworkIds = Object.keys(artworks);
        const userId = user.uid;
        for (let id of artworkIds) {
            const art = artworks[id];
            if (art && art.adminId === userId) {
                userArtworks[id] = art;
            }
        }
    }

    return {
        user,
        userArtworks
    }
};
const mapActionsToProps = null; //{ listenForUserChanges, listenForUserArtworkChanges };
export default connect(mapStateToProps, mapActionsToProps)(Home)

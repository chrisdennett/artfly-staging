// externals
import React from "react";
import { connect } from 'react-redux';
// styles
import './homeStyles.css';
// components
import { IN_BETA_TESTING } from '../global/GLOBAL_CONSTANTS';
import Title from "./Title";
import SignInOut from '../SignInOut/SignInOut';
import Footer from "./Footer/Footer";
import LinkButt from "../global/Butt/LinkButt";
import SocialMediaStuff from "./socialMediaStuff/SocialMediaStuff";
import ArtFlyLab from "./artflyLab/ArtFlyLab";
import ArtFlyIntro from "./artFlyIntro/ArtFlyIntro";

const Home = ({ user, userArtworks }) => {
    const userLoggedIn = user && user.loginStatus === 'loggedIn';

    return (
        <div className={'home'}>
            <div className='home--heading'>
                <div>
                    <Title/>
                </div>
                <div className='home--tagLine'>Make bad art, make good art, just make it and let your ArtFly.
                </div>

                {!IN_BETA_TESTING &&
                <div className='home--signInOut'>
                    <SignInOut/>
                </div>
                }

            </div>

            {/*{!userLoggedIn &&
            <PublicHome/>
            }*/}

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

            <ArtFlyIntro/>

            <ArtFlyLab/>

            <SocialMediaStuff/>

            <Footer/>

            <div style={{backgroundColor: '#000',
                color:'#fff',
                border: '10px solid #555', padding: 42, textAlign:'center'}}>
                <img style={{background:'#fff', padding: 10}} src={'images/lab/Rotoscoping.gif'} alt={'rotoscoping gif'}/>
                <p>You know it's all over when the victorian lady jumps the stool...</p>
                <p style={{margin:0, color:'#aaa'}}>2018 Copyright bit nobody reads</p>
            </div>


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

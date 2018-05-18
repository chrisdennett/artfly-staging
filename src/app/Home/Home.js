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
import ArtworkThumb from "../artwork/ArtworkThumb";
import AppTopBar from "../AppTopBar/AppTopBar";

const Home = ({ user, userArtworks }) => {
    const userLoggedIn = user && user.loginStatus === 'loggedIn';

    return (
        <div className={'home'}>

            {/*<div className={'home-topBar'}>
                <SignInOut user={user}/>
            </div>*/}
            <AppTopBar/>

            <div className='home--heading'>
                <div>
                    <Title/>
                </div>
                <div className='home--tagLine'>Forget about what others think and let the Art Fly.
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
            <div className={'home--artworks'}>

                <LinkButt linkTo={'/artwork'}>Add new Artwork</LinkButt>

                <div className={'artworkThumbs'}>
                    {
                        Object.keys(userArtworks).map(artworkId => {
                            const artworkData = userArtworks[artworkId];
                            return (
                                <ArtworkThumb key={artworkId}
                                              artworkId={artworkId}
                                              artworkData={artworkData}
                                />
                            )
                        })
                    }
                </div>
            </div>
            }

            <ArtFlyIntro/>

            <ArtFlyLab/>

            <SocialMediaStuff/>

            <Footer/>

            <div style={{
                backgroundColor: '#000',
                color: '#fff',
                border: '10px solid #555', padding: 42, textAlign: 'center'
            }}>
                <img style={{ background: '#fff', padding: 10 }} src={'images/lab/Rotoscoping.gif'}
                     alt={'rotoscoping gif'}/>
                <p>You know it's all over when the victorian lady jumps the stool...</p>
                <p style={{ margin: 0, color: '#aaa' }}>2018 Copyright bit nobody reads</p>
            </div>


        </div>
    );
};

const mapStateToProps = (state) => {
    const { user, artworks, resources } = state;
    let userArtworks = {};

    if (user && artworks) {
        const artworkIds = Object.keys(artworks);
        const userId = user.uid;
        for (let id of artworkIds) {
            let art = artworks[id];
            if (art && art.adminId === userId) {
                if (resources && art.resources) {
                    art = { ...art, ...resources[art.resources] };
                }

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
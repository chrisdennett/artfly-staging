// externals
import React from "react";
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
// styles
import './homeStyles.css';
// components
import LoadingThing from "../loadingThing/LoadingThing";
import Title from "./Title";
import Footer from "./Footer/Footer";
import SocialMediaStuff from "./socialMediaStuff/SocialMediaStuff";
import ArtFlyLab from "./artflyLab/ArtFlyLab";
import ArtFlyIntro from "./artFlyIntro/ArtFlyIntro";
import AppBar from "../appBar/AppBar";
import GalleryHome from "../gallery/GalleryHome";

const Home = ({ user }) => {
    const userLoggedIn = !!user.uid;

    const userPending = user === 'pending';
    /*if (userPending) {
        return <LoadingThing/>
    }*/

    return (
        <div className={'home'}>

            <AppBar fixed={!userLoggedIn}/>

            <div className='home--heading'>
                <div>
                    <Title/>
                </div>
                {!userLoggedIn &&
                <div className='home--tagLine'>Forget about what others think and let the Art Fly.
                </div>
                }

            </div>

            {userPending &&
            <LoadingThing/>
            }

            {userLoggedIn &&
            <div>
                <Typography use="headline4">
                    Your Galleries
                </Typography>
                <div className={'home--artworks'}>
                    <GalleryHome/>
                </div>
            </div>
            }

            <div>
                {!userLoggedIn &&
                <ArtFlyIntro/>
                }
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
                    <Typography use={'body1'}>
                        <p>You know it's all over when the victorian lady jumps the stool...</p>
                    </Typography>
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => (
    {
        user: state.user
    }
);

export default connect(mapStateToProps)(Home)
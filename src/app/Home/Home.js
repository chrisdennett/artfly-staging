// externals
import React from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './homeStyles.css';
// selectors
import { getLatestUserArtwork, getTotalUserArtworks, getUserGallery } from '../../selectors/Selectors'
// components
import LoadingThing from "../loadingThing/LoadingThing";
import Title from "./Title";
import AboutUs from "./aboutUs/AboutUs";
import SocialMediaStuff from "./socialMediaStuff/SocialMediaStuff";
import ArtFlyLab from "./artflyLab/ArtFlyLab";
import ArtFlyIntro from "./artFlyIntro/ArtFlyIntro";
import AppBar from "../appBar/AppBar";
import history from "../global/history";
import GalleryCard from "./galleryCard/GalleryCard";
import JumpingVictorianLady from './JumpingVictorianLady';

const Home = ({ user, userGallery, totalUserArtworks, latestUserArtwork }) => {
    const userLoggedIn = !!user.uid;
    const userPending = user === 'pending';

    return (
        <div className={'home'}>
            <AppBar fixed={true}/>

            {userPending &&
            <LoadingThing/>
            }

            <div className='home--heading'>
                <div>
                    <Title/>
                </div>
                {!userLoggedIn &&
                <div className='home--tagLine'>
                    Forget about what others think and let the Art Fly.
                </div>
                }

            </div>

            {userLoggedIn &&
            <div className={'home--yourGalleries'}>
                <Typography className={'sectionTitle'} use="headline4">
                    Your Galleries
                </Typography>
                {!userGallery &&
                <LoadingThing label={'Loading your galleries'}/>
                }

                {userGallery &&
                <div className={'home--yourGalleries--galleries'}>
                    <GalleryCard galleryData={userGallery}
                                 latestArtwork={latestUserArtwork}
                                 totalArtworks={totalUserArtworks}
                                 key={userGallery.galleryId}
                                 onClick={() => history.push(`/gallery/galleryId_${userGallery.galleryId}_galleryId`)}/>
                </div>
                }
            </div>
            }

            <div>
                {!userLoggedIn &&
                <ArtFlyIntro/>
                }
                <ArtFlyLab/>
                <SocialMediaStuff/>
                <AboutUs/>
                <JumpingVictorianLady/>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => (
    {
        user: state.user,
        latestUserArtwork: getLatestUserArtwork(state),
        totalUserArtworks: getTotalUserArtworks(state),
        userGallery: getUserGallery(state)
    }
);

export default connect(mapStateToProps)(Home);
// externals
import React from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './homeStyles.css';
// actions
import { updateUserArtworks } from '../../actions/GetArtworkActions';
import { UpdateUrl } from "../../actions/UrlActions";
// selectors
import { getLatestUserArtwork, getTotalUserArtworks, getUserGallery } from '../../selectors/Selectors'
// components
import LoadingThing from "../loadingThing/LoadingThing";
import Title from "./title/Title";
import AboutUs from "./aboutUs/AboutUs";
import SocialMediaStuff from "./socialMediaStuff/SocialMediaStuff";
import ArtFlyLab from "./artflyLab/ArtFlyLab";
import ArtFlyIntro from "./artFlyIntro/ArtFlyIntro";
import { HomeAppBar } from "../appBar/AppBar";
import GalleryCard from "./galleryCard/GalleryCard";
import JumpingVictorianLady from './JumpingVictorianLady';

const Home = ({ user, userGallery, totalUserArtworks, latestUserArtwork, UpdateUrl, updateUserArtworks }) => {
    const userLoggedIn = !!user.uid;
    const userPending = user === 'pending';

    return (
        <div className={'home'}>
            <HomeAppBar/>

            {userPending &&
            <LoadingThing/>
            }

            <div className='home--heading'>

                <Title/>

                {!userLoggedIn &&
                <ArtFlyIntro/>
                }

            </div>

            {userLoggedIn &&
            <div className={'home--yourGalleries'}>
                <Typography className={'sectionTitle'} use="headline4">
                    Your Galleries
                </Typography>

                <button onClick={() => updateUserArtworks(user.uid)}>UPDATE USER ARTWORKS TEST</button>

                {!userGallery &&
                <LoadingThing label={'Loading your galleries'}/>
                }

                {userGallery &&
                <div className={'home--yourGalleries--galleries'}>
                    <GalleryCard galleryData={userGallery}
                                 latestArtwork={latestUserArtwork}
                                 totalArtworks={totalUserArtworks}
                                 key={userGallery.galleryId}
                                 onAddClick={() => UpdateUrl(`/artworkAdder/galleryId_${userGallery.galleryId}_galleryId`)}
                                 onClick={() => UpdateUrl(`/gallery/galleryId_${userGallery.galleryId}_galleryId`)}/>
                </div>
                }
            </div>
            }

            <div>
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

export default connect(mapStateToProps, { UpdateUrl, updateUserArtworks })(Home);
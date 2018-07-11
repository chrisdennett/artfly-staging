// externals
import React from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './homeStyles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
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
import GalleryCard from "./galleryCard/GalleryCard";
import JumpingVictorianLady from './JumpingVictorianLady';

const Home = ({ user, userGallery, totalUserArtworks, latestUserArtwork, accountDeleted, UpdateUrl }) => {
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

            {accountDeleted &&
            <div>
                You deleted your account.  Set up a new account here.
            </div>
            }

            {userLoggedIn && !accountDeleted &&
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
                                 onAddClick={() => UpdateUrl(`/artworkAdder/galleryId_${userGallery.galleryId}_galleryId`)}
                                 onEditClick={() => UpdateUrl(`/galleryEditor/galleryId_${userGallery.galleryId}_galleryId`)}
                                 onClick={() => UpdateUrl(`/gallery/galleryId_${userGallery.galleryId}_galleryId`)}/>
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
        accountDeleted: state.account.status === 'deleted',
        latestUserArtwork: getLatestUserArtwork(state),
        totalUserArtworks: getTotalUserArtworks(state),
        userGallery: getUserGallery(state)
    }
);

export default connect(mapStateToProps, {UpdateUrl})(Home);
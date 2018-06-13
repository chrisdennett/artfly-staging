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
// import GalleryHome from "../gallery/GalleryHome";
import history from "../global/history";
import GalleryCard from "./galleryCard/GalleryCard";

const Home = ({ user, userGalleries }) => {
    const userLoggedIn = !!user.uid;
    const userPending = user === 'pending';

    return (
        <div className={'home'}>

            <AppBar fixed={!userLoggedIn}/>

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
                <Typography use="headline4">
                    Your Galleries
                </Typography>
                {userGalleries.length === 0 &&
                    <LoadingThing label={'Loading your galleries'}/>
                }

                <div className={'home--yourGalleries--galleries'}>
                    {
                        Object.keys(userGalleries).map(galleryId =>
                            <GalleryCard galleryData={userGalleries[galleryId]}
                                         key={galleryId}
                                         onClick={() => history.push(`/gallery/galleryId_${galleryId}_galleryId`)}/>
                        )
                    }
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
        user: state.user,
        userGalleries: getUserGalleriesData(state.galleries, state.user.uid, state.artworks)
    }
);

export default connect(mapStateToProps)(Home);

const getUserGalleriesData = (galleries, userId, artworks) => {
    const userGalleries = getUserGalleries(galleries, userId);

    let userGalleriesData = [];

    for(let gallery of userGalleries){
        const galleryArtworks = getArtworksByDate(artworks);
        const latestArtwork = galleryArtworks[0];
        const totalArtworks = galleryArtworks.length;

        userGalleriesData.push({...gallery, latestArtwork, totalArtworks})
    }

    return userGalleriesData;
};

const getArtworksByDate = (artworks) => {
    const arr = Object.keys(artworks).map(id => {
        return artworks[id];
    });

    arr.sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
    });

    return arr;
};

const getUserGalleries = (galleries, userId) => {
    // use filter to find user gallery Ids
    const userGalleryIds = Object.keys(galleries).filter(galleryId => {
        return galleries[galleryId].adminId === userId
    });
    // return the galleries matching the filtered Ids
    return userGalleryIds.map(id => {
        return galleries[id]
    });
}
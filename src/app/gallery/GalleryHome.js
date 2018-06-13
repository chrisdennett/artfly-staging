import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Fab } from 'rmwc/Fab';
// styles
import './gallery_styles.css';
// helper
import history from "../global/history";
import {goToArtwork} from "../../AppNavigation";
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";
import BottomBar from "../bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";

class GalleryHome extends Component {

    render() {
        const { galleryArtworks, gallery } = this.props;
        const firstArtworkId = galleryArtworks.length > 0 ? galleryArtworks[0].artworkId : null;
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 40, right: 10 };

        return (
            <div className={'galleryHome'}>
                <AppBar title={'Gallery'}
                        fixed={false}/>


                <Fab mini theme={'primary-bg'} style={editFabStyle} onClick={() => history.push('/artworkAdder')}>
                    add
                </Fab>

                {!gallery &&
                <LoadingThing/>
                }

                {gallery &&
                <div>
                    <h1 className={'gallery--title'}>
                        {gallery.title}
                    </h1>

                    <h2 className={'gallery--subtitle'}>
                        {gallery.subtitle}
                    </h2>
                    <div className={'artworkThumbs'}>
                        {
                            galleryArtworks.map(artworkData => {
                                return (
                                    <ArtworkThumb key={artworkData.artworkId}
                                                  onClick={() => goToArtwork(gallery.galleryId, artworkData.artworkId)}
                                                  artworkData={artworkData}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                }

                <BottomBar disabled={!firstArtworkId}
                           onEnterGallery={() => goToArtwork(gallery.galleryId, firstArtworkId)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => (
    {
        gallery: state.galleries[props.galleryId],
        galleryArtworks: getArtworksByDate(state.artworks),
        currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId)
    }
);

export default connect(mapStateToProps)(GalleryHome);

const getCurrentGalleryData = (user, galleries, artworks, galleryId) => {

    const gallery = galleries[galleryId];
    if (!gallery) return null;

    const galleryIsEditable = user && user.uid === gallery.adminId;
    const galleryArtworks = getGalleryArtworks(gallery, artworks);

    return { galleryIsEditable, galleryArtworks };
};

const getGalleryArtworks = (gallery, artworks) => {
    const { type, key } = gallery;
    let galleryArtworks = [];
    if (type === 'user') {
        const galleryArtworkIds = Object.keys(artworks).filter(artworkId => {
            return artworks.adminId === key;
        });
        console.log("galleryArtworkIds: ", galleryArtworkIds);
    }

    return galleryArtworks
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
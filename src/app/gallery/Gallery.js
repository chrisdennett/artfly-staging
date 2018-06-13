import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
// styles
import './gallery_styles.css';
// comps
import GalleryHome from './GalleryHome';
import GalleryArtworkViewer from "./GalleryArtworkViewer";
import { GetImage } from "../global/ImageHelper";
import ArtworkAdder from "../artworkAdder/ArtworkAdder";

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = { showArtworkAdder: false };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);

    }

    onPhotoSelected(imgFile) {
        GetImage(imgFile, (img, orientation, widthToHeightRatio, heightToWidthRatio) => {
            const newArtworkSetupData = { img, orientation, widthToHeightRatio, heightToWidthRatio };
            this.setState({ showArtworkAdder: true, newArtworkSetupData });
        })
    }

    render() {
        const { showArtworkAdder, newArtworkSetupData } = this.state;
        const { galleryNavData, galleryArtworks, artworkId, gallery, currentGalleryData } = this.props;
        const showGalleryHome = !artworkId && !showArtworkAdder;
        const showGalleryArtworkViewer = !!artworkId && !showArtworkAdder;

        console.log("currentGalleryData: ", currentGalleryData);

        return (
            <div className={'gallery'}>

                {showArtworkAdder &&
                <ArtworkAdder setupData={newArtworkSetupData}/>
                }


                {showGalleryArtworkViewer &&
                <GalleryArtworkViewer {...galleryNavData}
                                      onEditClick={() => this.setState({ editMenuIsOpen: true })}/>
                }

                {showGalleryHome &&
                <GalleryHome galleryArtworks={galleryArtworks}
                             gallery={gallery}
                             onPhotoSelected={img => this.onPhotoSelected(img)}
                />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => (
    {
        user: state.user,
        gallery: state.galleries[props.galleryId],
        galleryArtworks: getArtworksByDate(state.artworks),
        galleryNavData: getGalleryNavigation(state.artworks, props.artworkId, state.user.uid),
        currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId, props.artworkId)
    }
);

export default connect(mapStateToProps)(Gallery);

const getCurrentGalleryData = (user, galleries, artworks, galleryId, artworkId) => {

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


// return current index, total, previous and next
const getGalleryNavigation = (artworks, artworkId, userId) => {
    const galleryArtworks = getArtworksByDate(artworks);
    const totalArtworks = galleryArtworks.length;
    let currentArtwork, nextArtwork, previousArtwork;

    for (let i = 0; i < totalArtworks; i++) {
        const artwork = galleryArtworks[i];
        if (artwork.artworkId === artworkId) {
            currentArtwork = artwork;

            if (i > 0) {
                previousArtwork = galleryArtworks[i - 1];
            }

            if (i < totalArtworks - 1) {
                nextArtwork = galleryArtworks[i + 1]
            }

            break;
        }
    }

    const isEditable = !currentArtwork ? false : currentArtwork.adminId === userId;

    return { currentArtwork, isEditable, nextArtwork, previousArtwork };
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
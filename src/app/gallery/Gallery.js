import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Fab } from 'rmwc/Fab'
// styles
import './gallery_styles.css';
// comps
import GalleryHome from './GalleryHome';
import GalleryArtworkViewer from "./GalleryArtworkViewer";
import ArtworkEditMenu from "./ArtworkEditMenu";

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = { editMenuIsOpen: false };
    }

    render() {
        const { editMenuIsOpen } = this.state;
        const { galleryNavData, galleryArtworks, artworkId } = this.props;
        const editFabStyle = {position:'fixed', zIndex:10000, bottom:40, right:10};

        return (
            <div className={'gallery'}>

                <Fab theme={'primary-bg'} mini style={editFabStyle} onClick={() => this.setState({ editMenuIsOpen: true })}>
                    edit
                </Fab>

                {artworkId &&
                <ArtworkEditMenu isOpen={editMenuIsOpen}
                                 artworkId={artworkId}
                                 onClose={() => this.setState({ editMenuIsOpen: false })}/>
                }

                {artworkId &&
                <GalleryArtworkViewer {...galleryNavData}
                                      onEditClick={() => this.setState({ editMenuIsOpen: true })}/>
                }

                {!artworkId &&
                <GalleryHome galleryArtworks={galleryArtworks}/>
                }

            </div>
        );
    }
}

const mapStateToProps = (state, props) => (
    {
        user: state.user,
        galleryArtworks: getArtworksByDate(state.artworks),
        galleryNavData: getGalleryNavigation(state.artworks, props.artworkId)
    }
);

export default connect(mapStateToProps)(Gallery);

// return current index, total, previous and next
const getGalleryNavigation = (artworks, artworkId) => {
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

    return { currentArtwork, nextArtwork, previousArtwork };
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
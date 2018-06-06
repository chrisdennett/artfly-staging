import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Button, ButtonIcon } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
// styles
import './gallery_styles.css';
// helper
import history from "../global/history";
// comps
import GalleryArtwork from './GalleryArtwork';
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";

class Gallery extends Component {

    render() {
        const { galleryArtworks, galleryNavData } = this.props;
        const {currentArtwork, nextArtwork, previousArtwork} = galleryNavData;

        return (
            <div className={'gallery'}>

                <AppBar title={'Gallery'} fixed={!currentArtwork}/>

                {currentArtwork &&
                    <GalleryArtwork currentArtwork={currentArtwork} />
                }

                {!currentArtwork &&
                <div>
                    <Button raised theme={'secondary-bg'} onClick={() => history.push('/artworkAdder')}>
                        <ButtonIcon use="add"/> Add New Artwork
                    </Button>


                    <div className={'artworkThumbs'}>
                        {
                            galleryArtworks.map(artworkData => {
                                // const artworkData = artworks[artworkId];
                                return (
                                    <ArtworkThumb key={artworkData.artworkId}
                                                  artworkId={artworkData.artworkId}
                                                  artworkData={artworkData}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                }

                {currentArtwork &&
                <div className={'gallery--controls'}>
                    <Button disabled={!previousArtwork}
                            onClick={() => history.replace(`/gallery/artworkId_${previousArtwork.artworkId}_artworkId`)}>
                        <Icon use={'arrow_back'}/>
                    </Button>

                    <Button className={'gallery--controls--backToGalleryButt'}
                    onClick={() => history.replace(`/gallery`)}>
                        <Icon use={'dashboard'}/>
                    </Button>

                    <Button disabled={!nextArtwork}
                            onClick={() => history.replace(`/gallery/artworkId_${nextArtwork.artworkId}_artworkId`)}>
                        <Icon use={'arrow_forward'}/>
                    </Button>
                </div>
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

    for(let i=0; i<totalArtworks; i++){
        const artwork = galleryArtworks[i];
        if(artwork.artworkId === artworkId){
            currentArtwork = artwork;

            if(i > 0){
                previousArtwork = galleryArtworks[i-1];
            }

            if(i < totalArtworks-1){
                nextArtwork = galleryArtworks[i+1]
            }

            break;
        }
    }

    return {currentArtwork, nextArtwork, previousArtwork};
};

/*const selectCurrentArtwork = (artworks, artworkId) => {
    const artwork = artworks[artworkId];
    if (!artwork) return null;

    return artwork
};*/

const getArtworksByDate = (artworks) => {
    const arr = Object.keys(artworks).map(id => {
        return artworks[id];
    });

    arr.sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
    });

    return arr;
};
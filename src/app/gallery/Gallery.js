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
        const { galleryArtworks, currentArtwork } = this.props;

        return (
            <div className={'gallery'}>

                <AppBar title={'Gallery'} fixed={true}/>

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
                    <Button><Icon use={'arrow_back'}/></Button>
                    <Button className={'gallery--controls--backToGalleryButt'}><Icon use={'dashboard'}/></Button>
                    <Button><Icon use={'arrow_forward'}/></Button>
                </div>
                }
            </div>
        );
    }
}


const mapStateToProps = (state, props) => (
    {
        user: state.user,
        currentArtwork: selectCurrentArtwork(state.artworks, props.artworkId),
        galleryArtworks: getArtworksByDate(state.artworks)
    }
);

export default connect(mapStateToProps)(Gallery);

const selectCurrentArtwork = (artworks, artworkId) => {
    const artwork = artworks[artworkId];
    if (!artwork) return null;

    return artwork
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
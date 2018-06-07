import React, { Component } from "react";
// import { connect } from 'react-redux';
// ui
import { Button, ButtonIcon } from 'rmwc/Button';
// helper
import history from "../global/history";
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";

class GalleryHome extends Component {

    render() {
        const { galleryArtworks } = this.props;
        const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
        const urlPrefix = urlEndsInSlash ? '' : '/gallery/';

        return (
            <div>
                <AppBar title={'Gallery'}
                        fixed={true}/>

                <Button raised theme={'secondary-bg'} onClick={() => history.push('/artworkAdder')}>
                    <ButtonIcon use="add"/> Add New Artwork
                </Button>

                <div className={'artworkThumbs'}>
                    {
                        galleryArtworks.map(artworkData => {
                            // const artworkData = artworks[artworkId];
                            return (
                                <ArtworkThumb key={artworkData.artworkId}
                                              onClick={() => history.push(`${urlPrefix}artworkId_${artworkData.artworkId}_artworkId`)}
                                              artworkData={artworkData}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GalleryHome;
/*
const mapStateToProps = (state) => (
    {
        user: state.user,
        galleryArtworks: getArtworksByDate(state.artworks)
    }
);

export default connect(mapStateToProps)(GalleryHome);

const getArtworksByDate = (artworks) => {

    const arr = Object.keys(artworks).map(id => {
        return artworks[id];
    });

    arr.sort((a, b) => {
        return b.lastUpdated - a.lastUpdated;
    });

    return arr;
};*/

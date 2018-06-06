import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Button, ButtonIcon } from 'rmwc/Button';
// helper
import history from "../global/history";
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";

class GalleryHome extends Component {

    render() {
        const {galleryArtworks, artworkId} = this.props;
        console.log("artworkId: ", artworkId);

        return (
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
        );
    }
}


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
};
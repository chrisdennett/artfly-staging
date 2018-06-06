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
        const {artworks} = this.props;

        return (
            <div>
                <Button raised theme={'secondary-bg'} onClick={() => history.push('/artworkAdder')}>
                    <ButtonIcon use="add"/> Add New Artwork
                </Button>

                <div className={'artworkThumbs'}>
                    {
                        Object.keys(artworks).map(artworkId => {
                            const artworkData = artworks[artworkId];
                            return (
                                <ArtworkThumb key={artworkId}
                                              artworkId={artworkId}
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
        artworks: state.artworks
    }
);


export default connect(mapStateToProps)(GalleryHome)
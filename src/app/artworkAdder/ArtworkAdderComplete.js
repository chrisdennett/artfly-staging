import React from 'react';
import { connect } from 'react-redux';
// styles
import './artworkAdderComplete_styles.css';
// material ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
// helper
import history from "../global/history";
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import {goToArtwork} from "../../AppNavigation";

const ArtworkAdderComplete = ({ newArtworkId, addAnotherArtwork, currentArtwork, galleryId }) => {

    return (
        <div className={'artworkAdderComplete'}>
            <p>
                <Typography use={'headline6'}>
                    BOOM! Artwork added. You rule.
                </Typography>
            </p>

            <div className={'artworkAdderComplete--thumbHolder'}>
                <ArtworkThumb artworkData={currentArtwork} artworkId={newArtworkId}/>
            </div>

            <div className={'artworkAdderComplete--buttHolder'}>
                <Button outlined onClick={() => history.push(`/artworkEditor/artworkId_${newArtworkId}_artworkId`)}>
                    Edit
                </Button>
                <Button outlined onClick={() => goToArtwork(galleryId, newArtworkId)}>
                    View
                </Button>
                <Button outlined onClick={addAnotherArtwork}>
                    Add another
                </Button>
            </div>
        </div>
    )
};

const mapStateToProps = (state, props) => {
    let currentArtwork = null;
    if (state && props.newArtworkId) {
        currentArtwork = selectCurrentArtwork(state.artworks, props.newArtworkId)
    }

    return {
        currentArtwork
    }
};

export default connect(mapStateToProps)(ArtworkAdderComplete);

const selectCurrentArtwork = (artworks, artworkId) => {
    const artwork = artworks[artworkId];
    if (!artwork) return null;

    return artwork
};
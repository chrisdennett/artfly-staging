import React from 'react';
// material ui
import { Typography } from 'rmwc/Typography';
import { Button, ButtonIcon } from 'rmwc/Button';
// helper
import history from "../global/history";

const ArtworkAdderComplete = ({newArtworkId, addAnotherArtwork}) => {
    return (
        <Typography use={'body1'} style={{display:'flex', flexDirection:'column'}}>
            Save complete, what do you wanna do now?
            <Button raised onClick={() => history.push(`/artworkEditor/${newArtworkId}`)}>
                Edit Artwork
            </Button>
            <Button raised onClick={() => history.push(`/gallery/${newArtworkId}`)}>
                View Artwork
            </Button>
            <Button raised onClick={addAnotherArtwork}>
                Add another
            </Button>
        </Typography>
    )
};

export default ArtworkAdderComplete;
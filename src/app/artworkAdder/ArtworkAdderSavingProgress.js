import React from 'react';
// comps
import ProgressItem from "./ProgressItem";

const ArtworkAdderSavingProgress = ({ artworkSavingProgress }) => {

    const { source, large, thumb } = artworkSavingProgress;
    const holderStyle = { padding: 20};
    const innerStyle = { margin: '0 auto', maxWidth: 800 };

    return (
        <div style={holderStyle}>
            <div style={innerStyle}>
                <ProgressItem progress={source} label={'Source Image'}/>
                <ProgressItem progress={large} label={'Artwork'}/>
                <ProgressItem progress={thumb} label={'Thumbnail'}/>
            </div>
        </div>
    )
};

export default ArtworkAdderSavingProgress;
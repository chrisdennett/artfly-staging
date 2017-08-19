import React from 'react';
import _ from 'lodash';

import ArtworkThumb from "./ArtworkThumb";

const ArtistGallery = function ({ gallery, artist, totalArtworks, artworks, onThumbClick }) {
    return (
        <div>
            <h1>{gallery.name}</h1>
            <h2>Artist</h2>
            <p>Name: {artist.name}</p>
            <p>Total Artworks: {totalArtworks}</p>
            {
                _.map(artworks, (artwork) => {
                    if (artwork.artistId === artist.artistId) {
                        return (
                            <div key={artwork.id}>
                                <ArtworkThumb onThumbClick={onThumbClick.bind(this)} artwork={artwork}/>
                            </div>)
                    }
                })
            }


        </div>
    )
};

export default ArtistGallery;
import React from 'react';
import _ from 'lodash';

import ArtworkThumb from "./ArtworkThumb";

const ArtistGallery = function ({ gallery, artist, totalArtworks, artworks, onThumbClick, artworkIds }) {
    return (
        <div>
            <h1>{gallery.name}</h1>
            <h2>Artist</h2>
            <p>Name: {artist.name}</p>
            <p>Total Artworks: {totalArtworks}</p>
            {
                _.map(artworkIds, (id) => {
                    if (artworks[id]) {
                        return (
                            <div key={id}>
                                <ArtworkThumb onThumbClick={onThumbClick.bind(this)} artwork={artworks[id]}/>
                            </div>)
                    }
                })
            }


        </div>
    )
};

export default ArtistGallery;
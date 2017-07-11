import React from 'react';
import PropTypes from 'prop-types';

const ArtistGallery = function ({ gallery, artist, totalArtworks }) {
    return (
        <div>
            <h1>{gallery.name}</h1>
            <h2>Artist</h2>
            <p>Name: {artist.name}</p>
            <p>Total Artworks: {totalArtworks}</p>

        </div>
    )
};

ArtistGallery.propTypes = {
    gallery: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,

    artist: PropTypes.shape(
        {
            name: PropTypes.string.isRequired
        }).isRequired,

    artworks: PropTypes.arrayOf(
        PropTypes.shape(
            {
                adminId: PropTypes.string,
                dateAdded: PropTypes.number,
                url: PropTypes.string
            }
        )
    )
};

export default ArtistGallery;
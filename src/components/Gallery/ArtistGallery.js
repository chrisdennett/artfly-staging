import React from 'react';
import PropTypes from 'prop-types';

const ArtistGallery = function ({ gallery }) {
    return (
        <div>
            <h1>{gallery.name}</h1>
            <h2>Artist</h2>
            <p>Name: {gallery.artist.name}</p>
            <p>Total Artworks: {gallery.artworks.length}</p>

        </div>
    )
};

ArtistGallery.propTypes = {
    gallery: PropTypes.shape({
        name: PropTypes.string.isRequired,
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
    }).isRequired
};

export default ArtistGallery;
import React from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash';
import PropTypes from 'prop-types';

const Settings = function ({ artistGalleries }) {
    return (
        <div>
            <h1>Settings</h1>
            <Link to={`/add-or-edit-artist/`} >Add New Artist</Link>
            {
                _.map(artistGalleries, (artistGallery) => {
                    const { artist, gallery, id, totalArtworks } = artistGallery;

                    return (
                        <div key={id}>
                            <h2>{gallery.name}</h2>
                            <p>Artist: {artist.name}</p>
                            <p>Artist biog: {artist.biog}</p>
                            <p>Total artworks: {totalArtworks}</p>
                            <Link to={`/gallery/${id}`}>Open Gallery</Link>
                            <Link to={`/add-or-edit-artist/${id}`}>Edit Artist Gallery</Link>
                        </div>)
                })
            }
        </div>
    )
};

Settings.propTypes = {
    artistGalleries: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string.isRequired,
                artist: PropTypes.shape(
                    {
                        name: PropTypes.string
                    }
                ),
                gallery: PropTypes.shape({
                    name: PropTypes.string
                })
            }
        )
    ).isRequired
};

export default Settings;
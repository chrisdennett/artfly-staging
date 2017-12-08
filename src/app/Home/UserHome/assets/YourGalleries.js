// externals
import React from 'react';
import _ from 'lodash';
// styles
import './yourGalleriesStyles.css';
// components
import LinkButt from "../../../global/LinkButt";

const YourGalleries = function ({ userArtists, className }) {
    return (
        <div className={className}>
            <h2>Your Galleries</h2>
            <div className='yourGalleries--cards'>
                {
                    _.map(userArtists, (artist) => {

                        return (
                            <div className='yourGalleries--galleryCard' key={artist.artistId} style={{ display:'inline-block' }}>
                                <p>{artist.firstName} {artist.lastName}</p>
                                <p>Total artworks: {artist.totalArtworks}</p>

                                <LinkButt label={'Open Gallery'}
                                          linkTo={`/gallery/${artist.artistId}`}/>
                            </div>)
                    })
                }
            </div>
        </div>
    )
};

export default YourGalleries;
// externals
import React from 'react';
import _ from 'lodash';
// components
import LinkButt from "../../global/LinkButt";

const HomeGalleryLinks = function ({ userArtists }) {
    return (
        <div>
            <h2>Your Artists</h2>
            <section className={'settings-artists-section'}>
                {
                    _.map(userArtists, (artist) => {

                        return (
                            <div key={artist.artistId} style={{ display:'inline-block' }}>
                                <p>{artist.firstName} {artist.lastName}</p>
                                <p>Total artworks: {artist.totalArtworks}</p>

                                <LinkButt label={'Open Gallery'}
                                          linkTo={`/gallery/${artist.artistId}`}/>
                            </div>)
                    })
                }
            </section>
        </div>
    )
};

export default HomeGalleryLinks;
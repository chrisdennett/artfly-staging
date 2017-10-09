// externals
import React from 'react';
import _ from 'lodash';
// components
import LinkButt from "../../global/LinkButt";

const ArtistsSettings = function ({userArtists}) {
    return (
        <div>
            <h2>Artists</h2>
            <section className={'settings-add-new-artist-section'}>
                <LinkButt size={'small'} label={'Add New Artist'} linkTo={`/addOrEditArtist/`}/>
            </section>
            <section className={'settings-artists-section'}>
                {
                    _.map(userArtists, (artist) => {

                        return (
                            <div key={artist.artistId} style={{ minWidth: '100%' }}>
                                <ul>
                                    <li><span>First name:</span> {artist.firstName}</li>
                                    <li><span>Last name:</span> {artist.lastName}</li>
                                    <li><span>Total artworks:</span> {artist.totalArtworks}</li>
                                    <li>
                                        <LinkButt inline={true} size={'small'} label={'Open Gallery'}
                                                  linkTo={`/gallery/${artist.artistId}`}/>
                                        <LinkButt inline={true} size={'small'} label={'Edit Artist'}
                                                  linkTo={`/addOrEditArtist/${artist.artistId}`}/>
                                    </li>
                                </ul>
                            </div>)
                    })
                }
            </section>
        </div>
    )
};

export default ArtistsSettings;
// externals
import React from 'react';
import _ from 'lodash';
// styles
import './yourArtists_styles.css';
// components
import ArtistCard from "../../../ArtistEditor/ArtistCard";

const YourArtists = ({ userArtists }) => {

    return (
        <div className={'yourArtists'}>
            {
                _.map(userArtists, (artist) => {
                    return <ArtistCard key={artist.artistId} artist={artist}/>
                })
            }
        </div>
    )
};

export default YourArtists;
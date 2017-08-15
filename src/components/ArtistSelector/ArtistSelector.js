import React from 'react';
import _ from 'lodash';

const ArtistSelector = function (props) {
    return (
        <div>
            <label htmlFor="artistSelector">ARTIST: </label>
            <select value={props.selectedArtistId}
                    onChange={(e) => {props.onArtistSelected(e.target.value)}}>
                {
                    _.map(props.artists, (artistData, artistId) => {

                        return <option key={artistId}
                                       value={artistId}>{artistData.name}</option>;
                    })
                }
            </select>
        </div>
    )
};

export default ArtistSelector;
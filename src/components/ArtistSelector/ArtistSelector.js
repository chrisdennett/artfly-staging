import React from 'react';
import _ from 'lodash';

const ArtistSelector = function (props) {
    return (
        <div>
            <label className={'form-field'} htmlFor="artistSelector">Select Artist: </label>
            <select value={props.selectedArtistId}
                    onChange={(e) => {props.onArtistSelected(e.target.value)}}>
                {
                    _.map(props.artists, (artistData, artistId) => {

                        return <option key={artistId}
                                       value={artistId}>{artistData.firstName} {artistData.lastName}</option>;
                    })
                }
            </select>
        </div>
    )
};

export default ArtistSelector;
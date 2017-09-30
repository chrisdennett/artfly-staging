import React from 'react';
import _ from 'lodash';

const ArtistSelector = function (props) {

    const selectedArtistId = props.selectedArtistId ? props.selectedArtistId : '';
    const labelText = props.labelText !== undefined ? props.labelText : 'Select Artist: ';

    return (
        <div style={props.style}>
            <label className={'form-field'} htmlFor="artistSelector">{labelText} </label>
            <select value={selectedArtistId}
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
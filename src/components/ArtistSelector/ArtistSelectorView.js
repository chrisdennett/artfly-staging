import React from 'react';
import _ from 'lodash';

const ArtistSelectorView = function ({ label, artists, selectedArtistId, onArtistSelected, ...rest }) {

    const bgCol = `hsl(250,78%,70%)`;

    const selectStyle = {
        padding: 20,
        fontSize: '1.5rem',
        background: bgCol,
        border: '5px rgba(0,0,0,0.5) solid'
    };

    const optionStyle = {
        backgroundColor: bgCol,
    };

    return (
        <section {...rest}>
            <label className={'form-field'} htmlFor="artistSelector">{label} </label>
            <select style={selectStyle} value={selectedArtistId}
                    onChange={(e) => {onArtistSelected(e.target.value)}}>
                {
                    _.map(artists, (artistData, artistId) => {
                        return <option key={artistId}
                                       style={optionStyle}
                                       value={artistId}>
                            {artistData.firstName} {artistData.lastName}
                        </option>;
                    })
                }
            </select>
        </section>
    )
};

export default ArtistSelectorView;
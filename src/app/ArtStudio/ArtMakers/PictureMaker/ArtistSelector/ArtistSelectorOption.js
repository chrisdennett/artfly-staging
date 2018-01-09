import React from 'react';
import Butt from "../../../../global/Butt/Butt";

const ArtistSelectorOption = function ({isSelected, artistId, firstName, lastName, onSelected}) {

    const classes = isSelected ? {blue:true} : {white:true};

    return (
        <Butt {...classes} onClick={() => onSelected(artistId)}>
            {firstName} {lastName}
        </Butt>
    )
};

export default ArtistSelectorOption;
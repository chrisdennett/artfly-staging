import React from 'react';
// import PropTypes from 'prop-types';

const Artwork= function ({ artwork }) {
    if(!artwork ){
        return <div>Loading artwork...</div>
    }

    let imgStyle = {
        width: '100%',
        height: 'auto'
    };


    return (
        <div>
            <h1>Artwork</h1>
            <img alt="user artwork" style={imgStyle} src={artwork.url}/>
        </div>
    )
};

Artwork.propTypes = {

};

export default Artwork;
import React from 'react';
//
import './artFlyIntro_styles.css';

const ArtFlyIntro = function (props) {
    return (
        <div className={'artFlyIntro'}>
            <div className={'artFlyIntro--content'}>
                <h2>ArtFly is...</h2>
                <p>Brief intro with links to a blog post.</p>
            </div>
        </div>
    )
};

export default ArtFlyIntro;
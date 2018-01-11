import React from 'react';
// styles
import './artworkCard_styles.css';

const ArtworkCard = function ({ artwork, artist, children }) {

    const { firstName, lastName } = artist;
    const { thumb_url, widthToHeightRatio, dateAdded } = artwork;
    const imgPadding = 10; // set in css
    const thumbnailWidth = 150;
    const thumbnailHeight = thumbnailWidth * widthToHeightRatio;

    const cornerOffset = 5;
    const svgWidth = cornerOffset + cornerOffset + thumbnailWidth + (imgPadding * 2);
    const svgHeight = cornerOffset + cornerOffset + thumbnailHeight + (imgPadding * 2);

    const addedDateTime = new Date(dateAdded);

    const addedText = addedDateTime.toLocaleString();

    return (
        <div className={'artworkCard'}>

            <div className={'artworkCard--thumbHolder'}>
                <svg width={svgWidth} height={svgHeight} className={'artworkCard--svg'}>

                    <g stroke={'rgba(0,0,0,0.1)'} fill={'#fffebe'}>
                        <polygon points={`0,0 0,25 25,0`}/>

                        <polygon points={`${svgWidth},0 ${svgWidth},25 ${svgWidth - 25},0`}/>

                        <polygon points={`0,${svgHeight - 25} 25,${svgHeight} 0,${svgHeight}`}/>

                        <polygon
                            points={`${svgWidth},${svgHeight} ${svgWidth - 25},${svgHeight} ${svgWidth},${svgHeight - 25}`}/>
                    </g>
                </svg>

                <div className={'artworkCard--imgHolder'}>
                    <img className={'artworkCard--imgHolder--img'}
                         width={thumbnailWidth}
                         height={thumbnailHeight}
                         src={thumb_url}
                         alt={`artwork by ${firstName} ${lastName}`}/>
                </div>
            </div>

            <div>
                <p>by <strong>{firstName} {lastName}</strong></p>
                <p>Added on <strong>{addedText}</strong></p>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
};

export default ArtworkCard;
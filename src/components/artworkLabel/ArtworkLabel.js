import React from 'react';
// styles
import './artworkLabel_styles.css';
// ui
import { containsNonBlankText } from '../global/UTILS';

const ArtworkLabel = ({ artist, title, age, thumbStyle = false }) => {

    const thumbClass = thumbStyle ? 'artworkLabelThumb' : '';
    const containsTitle = title && containsNonBlankText(title);
    const containsArtist = artist && containsNonBlankText(artist);
    const containsAge = !!age && age > 0 && containsNonBlankText(age + '');

    const isEmptyLabel = !containsTitle && !containsArtist && !containsAge;


    return (
        <div className={`artworkLabel ${thumbClass}`}>

            {isEmptyLabel &&
                <h3 style={{ color: '#999' }}>
                    ADD DETAILS
                </h3>
            }

            {containsTitle &&
                <h2>{title.toUpperCase()}</h2>
            }

            {(containsArtist || containsAge) &&
                <h3>
                    {containsArtist &&
                        <span>By {artist.toUpperCase()}</span>
                    }

                    {containsArtist && containsAge &&
                        <span>, </span>
                    }

                    {containsAge &&
                        <span>age {age}</span>
                    }
                </h3>
            }
        </div>
    )
};

export default ArtworkLabel;
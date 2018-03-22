import React from 'react';
// styles
import './palette_styles.css';

const Palette = function ({ swatchData, onSwatchSelected, selectedUrl }) {
    const swatchKeys = Object.keys(swatchData.tiles);

    return (
        <div className={'palette'}>
            {
                swatchKeys.map((key) => {
                    const preset = swatchData.tiles[key];
                    const tileUrl = swatchData.baseUrl + preset.fileName;

                    let swatchStyle = { backgroundColor: '#ffffff' };
                    let img;

                    if (preset.thumb) {
                        const thumbUrl = swatchData.baseUrl + preset.thumb;
                        img = <img src={thumbUrl} alt={preset.name} />
                    }
                    else {
                        swatchStyle.backgroundImage = `url(${tileUrl})`;
                        img = null
                    }

                    if (selectedUrl && selectedUrl === tileUrl) {
                        swatchStyle.border = '#ffa115 3px dashed';
                    }

                    return (
                        <div key={key}
                             className={'palette--swatch'}
                             style={swatchStyle}
                             onClick={() => onSwatchSelected(tileUrl, preset)}>

                            {img &&
                                img
                            }

                        </div>
                    )
                })
            }
        </div>
    )
};

export default Palette;
import React from 'react';
// styles
import './palette_styles.css';

const Palette = function ({swatchData, onSwatchSelected}) {
    const swatchKeys = Object.keys(swatchData.tiles);

    return (
        <div className={'palette'}>
            {
                swatchKeys.map((key) => {
                    const preset = swatchData.tiles[key];
                    const tileUrl = swatchData.baseUrl + preset.fileName;

                    let swatchStyle = {backgroundColor: '#ffffff'};
                    swatchStyle.backgroundImage = `url(${tileUrl})`;

                    return (
                        <div key={key}
                             className={'palette--swatch'}
                             style={swatchStyle}
                             onClick={() => onSwatchSelected(key, tileUrl)} />
                    )
                })
            }
        </div>
    )
};

export default Palette;
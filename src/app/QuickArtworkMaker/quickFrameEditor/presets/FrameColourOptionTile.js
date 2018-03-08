import React from 'react';
// styles
import './framePresetOption_styles.css';

const FrameColourOptionTile = function ({ frameColour, mountColour, frameThicknessDecimal, mountThicknessDecimal, onClick }) {

    const { hue:frameHue, saturation:frameSaturation, lightness:frameLightness } = frameColour;
    const { hue:mountHue, saturation:mountSaturation, lightness:mountLightness } = mountColour;

    const frameSwatchStyle = {
        backgroundColor: `hsl(${frameHue},${frameSaturation}%,${frameLightness}%)`
    };

    const mountSwatchStyle = {
        backgroundColor: `hsl(${mountHue},${mountSaturation}%,${mountLightness}%)`
    };

    const onSelect = () => {
        onClick({ frameColour, mountColour, frameThicknessDecimal, mountThicknessDecimal });
    };

    return (
        <div onClick={onSelect}>
            <div className={'frame-preset-option'} style={frameSwatchStyle}/>
            <div className={'frame-preset-option'} style={mountSwatchStyle}/>
        </div>
    )
};

export default FrameColourOptionTile;
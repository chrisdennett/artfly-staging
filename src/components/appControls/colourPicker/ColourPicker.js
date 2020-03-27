import React from 'react';
// styles
import './colourPicker_styles.css';
// helpers
import { hslToHex, hexToHsl } from "../../global/UTILS";


/*
*   SOURCES
*   color picker: https://codepen.io/elainehuang/pen/yPWxRX?editors=1010
*   conversion: https://stackoverflow.com/questions/3732046/how-do-you-get-the-hue-of-a-xxxxxx-colour
* */

const ColourPicker = ({ colour = { hue: 200, saturation: 70, lightness: 20 }, onChange }) => {
    let hex, returnHex;

    if (colour.hue !== undefined) {
        const { hue, saturation, lightness } = colour;
        hex = hslToHex(hue, saturation, lightness);
        returnHex = false
    }
    else {
        hex = colour;
        returnHex = true;
    }

    return (
        <div className={'colourPicker--holder'}>
            <label className="colourPicker">
                <span className="colourPicker--circle"
                    style={{ background: hex }} />
                <input
                    type="color"
                    value={hex}
                    onChange={e => onChange(returnHex ? e.target.value : hexToHsl(e.target.value))}
                    className="colourPicker--input--hidden"
                />
            </label>
        </div>
    )
};

export default ColourPicker;


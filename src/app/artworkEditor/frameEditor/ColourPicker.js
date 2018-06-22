import React from 'react';
import './colourPicker_styles.css';

/*
*   SOURCES
*   color picker: https://codepen.io/elainehuang/pen/yPWxRX?editors=1010
*   conversion: https://stackoverflow.com/questions/3732046/how-do-you-get-the-hue-of-a-xxxxxx-colour
* */

const ColourPicker = ({ colour={hue:200, saturation:70, lightness:20 }, onChange }) => {

    const {hue, saturation, lightness} = colour;
    const hex = hslToHex(hue, saturation, lightness);

    return (
        <div className={'colourPicker--holder'}>
            <label className="colourPicker">
                <span className="colourPicker--circle" style={{ background: hex }}/>
                <input
                    type="color"
                    value={hex}
                    onChange={e => onChange(rgbToHsl(e.target.value))}
                    className="colourPicker--input--hidden"
                />
            </label>
        </div>
    )
};

export default ColourPicker;

const rgbToHsl = (color) => {
    // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
    const r = parseInt(color.substr(1, 2), 16) / 255;
    const g = parseInt(color.substr(3, 2), 16) / 255;
    const b = parseInt(color.substr(5, 2), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default: break;
        }
        h /= 6;
    }

    // hue is in degrees, saturation and lightness in percentages
    return { hue: h * 360, saturation: s * 100, lightness: l * 100 };
};

const hslToHex = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
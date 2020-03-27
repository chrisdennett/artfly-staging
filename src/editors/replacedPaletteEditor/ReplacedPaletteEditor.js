import React from "react";
// ui
import { Slider } from '@rmwc/slider';
import { Typography } from "@rmwc/typography";
// helpers
// comps
import PaletteSelector from "./paletteSelector/PaletteSelector";

const ReplacedPaletteEditor = ({ editData, onChange }) => {

    const { threshold, palette } = editData;

    return (
        <div className={'editor--controls'}>

            {palette &&
                <div className={'editor--controls--set'}>
                    <PaletteSelector palettes={palettes}
                        palette={palette}
                        onSelect={newPalette => onChange({ ...editData, palette: newPalette })}
                    />
                </div>
            }
            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                    tag={'div'}
                    style={{ width: 130 }}
                    className={'editor--controls--set--label'}>
                    Threshold:
                </Typography>
                <div style={{ width: '100%', paddingRight: 20, paddingLeft: 20 }}>
                    <Slider
                        discrete
                        min={0} max={100}
                        value={threshold}
                        onInput={e => onChange({ ...editData, threshold: e.detail.value })}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReplacedPaletteEditor;


const greyPalette = {
    key: 'greys',
    colours: [{ r: 0, g: 0, b: 0 },
    { r: 64, g: 64, b: 64 },
    { r: 128, g: 128, b: 128 },
    { r: 191, g: 191, b: 191 },
    { r: 255, g: 255, b: 255 }]
};

/*const grey6Palette = {
    key: 'greys',
    colours: [{ r: 0, g: 0, b: 0 },
        { r: 50, g: 50, b: 50 },
        { r: 100, g: 100, b: 100 },
        { r: 150, g: 150, b: 150 },
        { r: 200, g: 200, b: 200 },
        { r: 255, g: 255, b: 255 }]
};*/

const redPalette = {
    key: 'reds',
    colours: [
        { r: 0, g: 0, b: 0, name: 'black' },
        { r: 79, g: 56, b: 47, name: 'brown' },
        { r: 255, g: 0, b: 0, name: 'red' },
        { r: 255, g: 80, b: 20, name: 'orange' },
        { r: 255, g: 255, b: 0, name: 'yellow' },
        { r: 255, g: 255, b: 255, name: 'white' }
    ]
};

const bluePalette = {
    key: 'blues',
    colours: [
        { r: 0, g: 0, b: 0, name: 'black' },
        { r: 29, g: 76, b: 161, name: 'dark-blue' },
        { r: 20, g: 187, b: 223, name: 'light-blue' },
        { r: 143, g: 108, b: 173, name: 'purple' },
        { r: 255, g: 255, b: 255, name: 'white' }
    ]
};

const greenPalette = {
    key: 'greens',
    colours: [
        { r: 0, g: 0, b: 0, name: 'black' },
        { r: 9, g: 104, b: 66, name: 'dark-green' },
        { r: 50, g: 205, b: 50, name: 'light-green' },
        { r: 255, g: 255, b: 0, name: 'yellow' },
        { r: 255, g: 255, b: 255, name: 'white' }
    ]
};

const palettes = [greyPalette, redPalette, bluePalette, greenPalette];
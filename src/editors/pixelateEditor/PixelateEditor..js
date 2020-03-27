import React from "react";
// ui
import { Slider } from '@rmwc/slider';
import { Typography } from "@rmwc/typography";
import PixelTypeSelector from "./pixelTypeSelector/PixelTypeSelector";
import ColourPicker
    from "../../components/appControls/colourPicker/ColourPicker";

const PixelateEditor = ({ editData, onChange }) => {

    const { pixelsWide, pixelType = pixelTypes[0], pixelsBgColour = "#fff" } = editData;
    let pixelTypeData = pixelTypes.filter(type => type.key === pixelType)[0];
    if (!pixelTypeData) pixelTypeData = pixelTypes[0];

    return (
        <div className={'editor--controls'}>

            <div className={'editor--controls--set'}>

                <Typography use={'button'}
                            style={{width: 20}}>
                    Bg:
                </Typography>

                <ColourPicker colour={pixelsBgColour}
                              onChange={selectedColour => onChange({ ...editData, pixelsBgColour: selectedColour })}/>

                <PixelTypeSelector pixelTypes={pixelTypes}
                                   currentPixelType={pixelTypeData}
                                   onSelect={selectedPixelType => onChange({ ...editData, pixelType: selectedPixelType.key })}
                />


            </div>

            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                            tag={'div'}
                            style={{ width: 200 }}
                            className={'editor--controls--set--label'}>
                    Pixels Wide:
                </Typography>

                <Slider
                    min={1} max={100}
                    step={1}
                    value={pixelsWide}
                    onInput={e => onChange({ ...editData, pixelsWide: e.detail.value })}
                />
            </div>
        </div>
    );
};

export default PixelateEditor;

const pixelTypes = [
    { name: 'Square', key: 'square' },
    { name: 'Round', key: 'round' },
    { name: 'Box', key: 'box' },
    { name: 'Tube', key: 'tube' },
    { name: 'Diagonal', key: 'diagonal' },
    { name: 'Cross', key: 'cross' },
    { name: 'Text', key: 'text' }
];

import React from "react";
// ui
import { Slider } from '@rmwc/slider';
import { Typography } from "@rmwc/typography";
// import PixelTypeSelector from "./pixelTypeSelector/PixelTypeSelector";
// import ColourPicker from "../../components/appControls/colourPicker/ColourPicker";
import PixelNumberSheets from "./pixelNumberSheets/PixelNumberSheets";

const PixelPortraitMaker = ({ editData, onChange, sourceCanvas }) => {

    const { pixelsWide, pixelType = pixelTypes[0], pixelsBgColour = "#fff", contrast = 0, brightnessAdjust = 0 } = editData;
    let pixelTypeData = pixelTypes.filter(type => type.key === pixelType)[0];
    if (!pixelTypeData) pixelTypeData = pixelTypes[0];

    return (
        <div className={'editor--controls'}>

            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                    tag={'div'}
                    style={{ width: 150 }}
                    className={'editor--controls--set--label'}>
                    Brightness:
                </Typography>
                <Slider
                    discrete
                    min={-50} max={50}
                    value={brightnessAdjust}
                    onInput={e => onChange({ ...editData, brightnessAdjust: e.detail.value })}
                />

            </div>
            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                    tag={'div'}
                    style={{ width: 150 }}
                    className={'editor--controls--set--label'}>
                    Contrast:
                </Typography>
                <Slider
                    discrete
                    min={0} max={100}
                    value={contrast}
                    onInput={e => onChange({ ...editData, contrast: e.detail.value })}
                />

            </div>
            {/* <div className={'editor--controls--set'}>
                <Typography use={'button'}
                            style={{ width: 20 }}>
                    Bg:
                </Typography>

                <ColourPicker colour={pixelsBgColour}
                              onChange={selectedColour => onChange({ ...editData, pixelsBgColour: selectedColour })}/>

                <PixelTypeSelector pixelTypes={pixelTypes}
                                   currentPixelType={pixelTypeData}
                                   onSelect={selectedPixelType => onChange({ ...editData, pixelType: selectedPixelType.key })}
                />
            </div> */}

            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                    tag={'div'}
                    style={{ width: 150 }}
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

            <div className={'editor--controls--set'}>
                <Typography use={'caption'}> Grid
                    size: {pixelsWide}  </Typography>
            </div>

            <div className={'editor--controls--set'}>
                <PixelNumberSheets sourceCanvas={sourceCanvas}
                    editData={editData}
                    pixelsWide={pixelsWide} />
            </div>

        </div>
    );
};

export default PixelPortraitMaker;

const pixelTypes = [
    { name: 'Square', key: 'square' },
    { name: 'Round', key: 'round' },
    { name: 'Box', key: 'box' },
    { name: 'Tube', key: 'tube' },
    { name: 'Diagonal', key: 'diagonal' },
    { name: 'Cross', key: 'cross' },
    { name: 'Text', key: 'text' }
];

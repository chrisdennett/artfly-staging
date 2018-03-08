import React, { Component } from 'react';
// styles
import './presetsControl_styles.css'
// comps
import FrameTypeOptionTile from "./FrameTypeOptionTile";
import Slider from "../slider/Slider";

const presets = [
    {
        name: 'classic',
        frameColour: { hue: 0, saturation: 53, lightness: 44 },
        mountColour: { hue: 0, saturation: 0, lightness: 100 },
        frameThicknessDecimal: 0.03, mountThicknessDecimal: 0.06
    },
    {
        name: 'thin frame',
        frameColour: { hue: 0, saturation: 53, lightness: 44 },
        mountColour: { hue: 0, saturation: 0, lightness: 100 },
        frameThicknessDecimal: 0.009, mountThicknessDecimal: 0.09
    },
    {
        name: 'monochrome',
        frameColour: { hue: 0, saturation: 44, lightness: 39 },
        mountColour: { hue: 0, saturation: 43, lightness: 44 },
        frameThicknessDecimal: 0.031, mountThicknessDecimal: 0.043
    },
    {
        name: 'no mount',
        frameColour: { hue: 0, saturation: 53, lightness: 44 },
        mountColour: { hue: 0, saturation: 0, lightness: 0 },
        frameThicknessDecimal: 0.018,
        mountThicknessDecimal: 0
    },
    {
        name: 'unframed',
        frameColour: { hue: 0, saturation: 0, lightness: 0 },
        mountColour: { hue: 0, saturation: 0, lightness: 0 },
        frameThicknessDecimal: 0,
        mountThicknessDecimal: 0
    }
];

/*const principleHueOptions = [
    21,
];*/

class PresetsControl extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPreset: presets[0]
        };

        this.onFrameTypeOptionSelected = this.onFrameTypeOptionSelected.bind(this);
        this.onFrameHueSliderChange = this.onFrameHueSliderChange.bind(this);
        this.update = this.update.bind(this);
        this.onSelectBlack = this.onSelectBlack.bind(this);
        this.onSelectWhite = this.onSelectWhite.bind(this);
    }

    componentWillMount() {
        this.update(presets[0]);
    }

    update(preset, newFrameHue, setToBlack = false, setToWhite = false) {
        const { frameColour, mountColour } = preset;

        // FRAME
        const frameHue = newFrameHue ? newFrameHue : frameColour.hue;
        let frameSaturation = frameColour.saturation;
        let frameLightness = frameColour.lightness;
        if (setToBlack) {
            frameSaturation = 0;
            frameLightness = 20;
        }
        else if (setToWhite) {
            frameSaturation = 0;
            frameLightness = 92;
        }

        // MOUNT
        let mountHue = mountColour.hue;
        let mountSaturation = mountColour.saturation;
        let mountLightness = mountColour.lightness;

        if(preset.name === 'monochrome'){
            if (setToBlack) {
                mountSaturation = 0;
                mountLightness = 20;
            }
            else if (setToWhite) {
                mountSaturation = 0;
                mountLightness = 99;
            }
            else{
                mountHue = frameHue;
            }
        }


        this.setState({ selectedPreset: preset, frameHue });

        const currentValues = {
            ...preset,
            frameColour: { ...frameColour, hue: frameHue, saturation: frameSaturation, lightness: frameLightness },
            mountColour: { ...mountColour, hue: mountHue, saturation:mountSaturation, lightness:mountLightness }
        };
        this.props.onPresetSelect(currentValues);
    }

    onFrameTypeOptionSelected(index) {
        const selectedPreset = presets[index];
        const frameHue = this.state.frameHue ? this.state.frameHue : selectedPreset.frameColour.hue;
        this.update(selectedPreset, frameHue);
    }

    onFrameHueSliderChange(e) {
        const { selectedPreset } = this.state;
        const hue = e.target.value;
        this.update(selectedPreset, hue);
    }

    onSelectBlack() {
        const { selectedPreset } = this.state;
        const frameHue = this.state.frameHue;
        this.update(selectedPreset, frameHue, true);
    }

    onSelectWhite() {
        const { selectedPreset } = this.state;
        const frameHue = this.state.frameHue;
        this.update(selectedPreset, frameHue, false, true);
    }

    render() {
        const { selectedPreset, frameHue } = this.state;

        const swatches = (
            <div>
                <div className={'presetsControl--black-block'} onClick={this.onSelectBlack}>
                    hee
                </div>
                <div className={'presetsControl--white-block'} onClick={this.onSelectWhite}>
                    hee
                </div>
            </div>
        );

        return (
            <div className={'presetsControl'}>

                <div className={'presetsControl--typeOptions'}>
                    <div className={'presetsControl--typeOptions--label'}>Style:</div>
                    {
                        presets.map((preset, index) => {
                            return <FrameTypeOptionTile key={preset.name}
                                                        isSelected={preset === selectedPreset}
                                                        index={index}
                                                        label={preset.name}
                                                        onClick={this.onFrameTypeOptionSelected}
                            />
                        })
                    }
                </div>

                <Slider label={'Change colour'}
                        id={`preset-frame-hue`}
                        min={0}
                        max={360}
                        value={frameHue}
                        onChange={this.onFrameHueSliderChange}
                        swatches={swatches}
                />

            </div>
        )
    };
}

export default PresetsControl;
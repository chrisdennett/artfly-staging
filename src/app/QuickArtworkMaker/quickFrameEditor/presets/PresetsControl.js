import React, { Component } from 'react';
// styles
import './presetsControl_styles.css'
// comps
import Swatch from "../../../global/pallete/Swatch";
import Slider from "../../../global/slider/Slider";

const presets = [
    {
        presetName: 'classic',
        frameColour: { hue: 0, saturation: 53, lightness: 44 },
        mountColour: { hue: 0, saturation: 0, lightness: 100 },
        frameThicknessDecimal: 0.03, mountThicknessDecimal: 0.06
    },
    {
        presetName: 'thin frame',
        frameColour: { hue: 0, saturation: 53, lightness: 44 },
        mountColour: { hue: 0, saturation: 0, lightness: 100 },
        frameThicknessDecimal: 0.009, mountThicknessDecimal: 0.09
    },
    {
        presetName: 'monochrome',
        frameColour: { hue: 0, saturation: 44, lightness: 39 },
        mountColour: { hue: 0, saturation: 43, lightness: 44 },
        frameThicknessDecimal: 0.031, mountThicknessDecimal: 0.043
    },
    {
        presetName: 'no mount',
        frameColour: { hue: 0, saturation: 53, lightness: 44 },
        mountColour: { hue: 0, saturation: 0, lightness: 0 },
        frameThicknessDecimal: 0.018,
        mountThicknessDecimal: 0
    },
    {
        presetName: 'unframed',
        frameColour: { hue: 0, saturation: 0, lightness: 0 },
        mountColour: { hue: 0, saturation: 0, lightness: 0 },
        frameThicknessDecimal: 0,
        mountThicknessDecimal: 0
    }
];

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
        // Sets up to show previously used preset.
        const { initialPresetName = 'classic', frameData } = this.props;
        let selectedPreset = presets.find(preset => preset.presetName === initialPresetName);
        if (!selectedPreset) selectedPreset = presets[0];

        const { frameColour } = frameData;
        const isBlack = frameColour.saturation === 0 && frameColour.lightness < 30;
        const isWhite = frameColour.saturation === 0 && frameColour.lightness > 90;

        this.update(selectedPreset, frameColour.hue, isBlack, isWhite);
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

        if (preset.presetName === 'monochrome') {
            if (setToBlack) {
                mountSaturation = 0;
                mountLightness = 20;
            }
            else if (setToWhite) {
                mountSaturation = 0;
                mountLightness = 99;
            }
            else {
                mountHue = frameHue;
            }
        }

        this.setState({ selectedPreset: preset, frameHue, isBlack: setToBlack, isWhite: setToWhite });

        const currentValues = {
            ...preset,
            frameColour: { ...frameColour, hue: frameHue, saturation: frameSaturation, lightness: frameLightness },
            mountColour: { ...mountColour, hue: mountHue, saturation: mountSaturation, lightness: mountLightness }
        };
        this.props.onPresetSelect(currentValues);
    }

    onFrameTypeOptionSelected(label) {
        const selectedPreset = presets.find(preset => preset.presetName === label);
        const frameHue = this.state.frameHue ? this.state.frameHue : selectedPreset.frameColour.hue;
        const { isBlack, isWhite } = this.state;

        this.update(selectedPreset, frameHue, isBlack, isWhite);
    }

    onFrameHueSliderChange(value) {
        const { selectedPreset } = this.state;
        const hue = value;
        this.update(selectedPreset, hue, false, false);
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
        const pageWidth = Math.max(window.innerWidth, document.documentElement.clientWidth);

        const swatches = (
            <div className={'presetsControl--blocks'}>
                <div className={'presetsControl--block presetsControl--block--black'}
                     onClick={this.onSelectBlack}/>
                <div className={'presetsControl--block presetsControl--block--white'}
                     onClick={this.onSelectWhite}/>
            </div>
        );

        return (
            <div className={'presetsControl'}>

                <div className={'presetsControl--typeOptions--label'}>Style:</div>

                {pageWidth < 600 &&
                <select onChange={e => this.onFrameTypeOptionSelected(e.target.value)}
                        value={selectedPreset.presetName}>
                    {
                        presets.map((preset) => {
                            return <option key={preset.presetName}
                                           value={preset.presetName}>
                                {preset.presetName}
                            </option>
                        })
                    })
                </select>
                }

                {pageWidth > 600 &&
                presets.map((preset) => {
                    return <Swatch key={preset.presetName}
                                   isSelected={preset === selectedPreset}
                                   label={preset.presetName}
                                   onClick={this.onFrameTypeOptionSelected}
                    />
                })
                }

                <div className={'presetsControl--typeOptions--label'}>Colour:</div>

                {swatches &&
                swatches
                }

                <Slider id={`preset-frame-hue`}
                        min={0}
                        max={360}
                        colour={`hsla(312, 65%, 63%, 0.57)`}
                        value={frameHue}
                        onChange={this.onFrameHueSliderChange}
                />

            </div>
        )
    };
}

export default PresetsControl;
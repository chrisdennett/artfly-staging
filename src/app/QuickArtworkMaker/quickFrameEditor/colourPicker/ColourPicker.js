import React, { Component } from 'react';
// comps
import Slider from "../slider/Slider";

class ColourPicker extends Component {
    constructor(props) {
        super(props);

        this.onHueRangeChange = this.onHueRangeChange.bind(this);
        this.onSaturationRangeChange = this.onSaturationRangeChange.bind(this);
        this.onLightnessRangeChange = this.onLightnessRangeChange.bind(this);
    }

    onHueRangeChange(e) {
        const hue = e.target.value;
        const {saturation, lightness} = this.props.colour;
        this.props.onColourChange({hue, saturation, lightness});
    }

    onSaturationRangeChange(e) {
        const saturation = e.target.value;
        const {hue, lightness} = this.props.colour;
        this.props.onColourChange({hue, saturation, lightness});
    }

    onLightnessRangeChange(e) {
        const lightness = e.target.value;
        const {hue, saturation} = this.props.colour;
        this.props.onColourChange({hue, saturation, lightness});
    }

    render() {
        const {id, colour} = this.props;
        const { hue, saturation, lightness, } = colour;

        return (
            <div>
                <Slider label={'colour'}
                        id={`${id}-hue`}
                        min={0} max={360}
                        value={hue}
                        onChange={this.onHueRangeChange}/>

                <Slider label={'vibrancy'}
                        id={`${id}-saturation`}
                        min={0} max={100}
                        value={saturation}
                        onChange={this.onSaturationRangeChange}/>

                <Slider label={'brightness'}
                        id={`${id}-brightness`}
                        min={0} max={100}
                        value={lightness}
                        onChange={this.onLightnessRangeChange}/>
            </div>
        )
    }
}

export default ColourPicker;
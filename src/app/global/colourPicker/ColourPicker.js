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

    onHueRangeChange(value) {
        const hue = value;
        const {saturation, lightness} = this.props.colour;
        this.props.onColourChange({hue, saturation, lightness});
    }

    onSaturationRangeChange(value) {
        const saturation = value;
        const {hue, lightness} = this.props.colour;
        this.props.onColourChange({hue, saturation, lightness});
    }

    onLightnessRangeChange(value) {
        const lightness = value;
        const {hue, saturation} = this.props.colour;
        this.props.onColourChange({hue, saturation, lightness});
    }

    render() {
        const {id, colour} = this.props;
        const { hue, saturation, lightness, } = colour;
        const labelStyle = {margin:0, color:'rgba(0,0,0,0.5)'};

        return (
            <div>
                <h5 style={labelStyle}>colour</h5>
                <Slider label={'colour'}
                        id={`${id}-hue`}
                        min={0} max={360}
                        value={hue}
                        onChange={this.onHueRangeChange}/>

                <h5 style={labelStyle}>vibrancy</h5>
                <Slider label={'vibrancy'}
                        id={`${id}-saturation`}
                        min={0} max={100}
                        value={saturation}
                        onChange={this.onSaturationRangeChange}/>

                <h5 style={labelStyle}>brightness</h5>
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
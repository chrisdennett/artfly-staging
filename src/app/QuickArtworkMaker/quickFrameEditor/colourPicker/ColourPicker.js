import React, { Component } from 'react';
import Slider from "../slider/Slider";

class ColourPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hue: 110,
            saturation: 40,
            lightness: 42,
            alpha: 1
        };

        this.onHueRangeChange = this.onHueRangeChange.bind(this);
        this.onSaturationRangeChange = this.onSaturationRangeChange.bind(this);
        this.onLightnessRangeChange = this.onLightnessRangeChange.bind(this);
        this.onAlphaRangeChange = this.onAlphaRangeChange.bind(this);
    }

    onHueRangeChange(e) {
        this.setState({ hue: e.target.value });
    }

    onSaturationRangeChange(e) {
        this.setState({ saturation: e.target.value });
    }

    onLightnessRangeChange(e) {
        this.setState({ lightness: e.target.value });
    }

    onAlphaRangeChange(e) {
        this.setState({ alpha: e.target.value });
    }

    render() {
        const {title} = this.props;
        const { hue, saturation, lightness, alpha } = this.state;
        const selectedColour = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        // const hslStyle = { backgroundColor: selectedColour };

        return (
            <div>
                <div>{title}: {selectedColour}</div>
                <Slider label={'HUE'}
                        min={0} max={360}
                        value={hue}
                        onChange={this.onHueRangeChange}/>

                <Slider label={'SATURATION'}
                        min={0} max={100}
                        value={saturation}
                        onChange={this.onSaturationRangeChange}/>

                <Slider label={'LIGHTNESS'}
                        min={0} max={100}
                        value={lightness}
                        onChange={this.onLightnessRangeChange}/>
            </div>
        )
    }
}

export default ColourPicker;
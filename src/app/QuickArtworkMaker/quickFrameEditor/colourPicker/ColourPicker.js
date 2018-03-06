import React, { Component } from 'react';
// comps
import Slider from "../slider/Slider";

class ColourPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hue: 110,
            saturation: 40,
            lightness: 42
        };

        this.onHueRangeChange = this.onHueRangeChange.bind(this);
        this.onSaturationRangeChange = this.onSaturationRangeChange.bind(this);
        this.onLightnessRangeChange = this.onLightnessRangeChange.bind(this);
        this.callUpdate = this.callUpdate.bind(this);
    }

    componentWillMount() {
        if (this.props.frameColour) {
            const { hue, saturation, brightness } = this.props.frameColour;
            this.setState({ hue, saturation, brightness });
        }
    }

    onHueRangeChange(e) {
        this.setState({ hue: e.target.value }, this.callUpdate);
    }

    onSaturationRangeChange(e) {
        this.setState({ saturation: e.target.value }, this.callUpdate);
    }

    onLightnessRangeChange(e) {
        this.setState({ lightness: e.target.value }, this.callUpdate);
    }

    callUpdate() {
        if (this.props.onColourChange) {
            const { hue, saturation, lightness } = this.state;
            this.props.onColourChange({ hue, saturation, lightness })
        }
    }

    render() {
        const { title } = this.props;
        const { hue, saturation, lightness } = this.state;
        const selectedColour = `hsla(${hue}, ${saturation}%, ${lightness}%, 1`;

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
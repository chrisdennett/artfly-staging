import React, { Component } from "react";
// ui
import { Slider } from 'rmwc/Slider';
import { Typography } from 'rmwc/Typography';
// styles
import './frameEditor_styles.css';
// comps
import GalleryArtwork from "../../gallery/GalleryArtwork";
import LoadingThing from "../../../components/loadingThing/LoadingThing";
import ColourPicker from "./ColourPicker";
import { EditAppBar } from "../../../components/appBar/AppBar";

class FrameEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onSaveClick = this.onSaveClick.bind(this);
        this.setInitialValues = this.setInitialValues.bind(this);
    }

    componentWillMount() {
       this.setInitialValues();
    }

    setInitialValues(){
        const { frameData } = this.props.artworkData;
        const { frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour } = frameData;
        this.setState({frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour});
    }

    onSaveClick() {
        const { frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour } = this.state;

        const mergedArtworkData = {
            ...this.props.artworkData,
            frameData: {
                frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour
            }
        };

        this.props.onSaveClick(mergedArtworkData);
    }

    render() {
        if (!this.props.artworkData || !this.props.artworkData.frameData) {
            return <LoadingThing/>
        }

        const { frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour } = this.state;

        const mergedArtworkData = {
            ...this.props.artworkData,
            frameData: {
                frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour
            }
        };

        const hasChanges = checkIfChanged(this.props.artworkData.frameData, { frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour });


        return (
            <div className={'labApp'}>

                <EditAppBar title={'Colour Splitter'}
                            hasChanges={hasChanges}
                            onCloseClick={this.props.onCloseClick}
                            onSaveClick={this.onSaveClick}
                            onCancelClick={this.setInitialValues}/>

                <GalleryArtwork artworkData={mergedArtworkData}/>

                <div className={'frameEditor--controls'}>

                    <div className={'frameEditor--controls--set'}>
                        <Typography use={'button'}
                                    tag={'div'}
                                    className={'frameEditor--controls--set--label'}>
                            Frame:
                        </Typography>
                        <ColourPicker colour={frameColour}
                                      onChange={({ hue, saturation, lightness }) => this.setState({ frameColour: { hue, saturation, lightness } })}
                        />
                        <Slider
                            min={0} max={0.2}
                            value={frameThicknessDecimal}
                            onInput={e => this.setState({ frameThicknessDecimal: e.detail.value })}
                        />
                    </div>

                    <div className={'frameEditor--controls--set'}>

                        <Typography use={'button'} tag={'div'} className={'frameEditor--controls--set--label'}>
                            Mount:
                        </Typography>

                        <ColourPicker colour={mountColour}
                                      onChange={({ hue, saturation, lightness }) => this.setState({ mountColour: { hue, saturation, lightness } })}
                        />

                        <Slider
                            min={0} max={0.2}
                            value={mountThicknessDecimal}
                            onInput={e => this.setState({ mountThicknessDecimal: e.detail.value })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FrameEditor;

const checkIfChanged = (initialValues, currentValues) => {
    let hasChanges = false;
    const keys = Object.keys(initialValues);

    for(let key of keys){
        if(initialValues[key] !== currentValues[key]){
            hasChanges = true;
            break;
        }
    }

    return hasChanges;
};
import React, { Component } from "react";
import faImage from "@fortawesome/fontawesome-pro-solid/faImage";
// styles
import './frameEditor_styles.css';
// comps
import ColourAndSizeControl from "../../global/colourAndSizeControl/ColourAndSizeControl";
import PresetsControl from "./presets/PresetsControl";
import Butt from "../../global/Butt/Butt";
import ToolControlPanel from "../../global/toolControlPanel/ToolControlPanel";

class FrameEditor extends Component {

    constructor(props) {
        super(props);

        this.onDoneClick = this.onDoneClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);

        this.onPresetsSelected = this.onPresetsSelected.bind(this);
        this.onFrameEditSelected = this.onFrameEditSelected.bind(this);
        this.onMountEditSelected = this.onMountEditSelected.bind(this);

        this.onFrameThicknessChange = this.onFrameThicknessChange.bind(this);
        this.onFrameColourChange = this.onFrameColourChange.bind(this);
        this.onMountThicknessChange = this.onMountThicknessChange.bind(this);
        this.onMountColourChange = this.onMountColourChange.bind(this);
    }

    componentWillMount() {
        const { frameData } = this.props;
        const currentTool = frameData.presetName === 'custom' ? 'frame' : 'presets';

        if (frameData) {
            this.setState({ initialData: frameData, currentTool });
        }
    }

    // Tool selector events
    onPresetsSelected() {
        this.setState({ currentTool: 'presets' });
    }

    onFrameEditSelected() {
        this.setState({ currentTool: 'frame' });
    }

    onMountEditSelected() {
        this.setState({ currentTool: 'mount' });
    }

    // CUSTOM FRAME EDITING EVENTS
    onFrameColourChange(frameColour) {
        const newFrameData = {...this.props.frameData, frameColour};
        this.props.onDataChange({ frameData: newFrameData });
    }

    onMountColourChange(mountColour) {
        const newFrameData = {...this.props.frameData, mountColour};
        this.props.onDataChange({ frameData: newFrameData });
    }

    onFrameThicknessChange(value) {
        const newFrameData = {...this.props.frameData, frameThicknessDecimal:value}
        this.props.onDataChange({ frameData: newFrameData });
    }

    onMountThicknessChange(value) {
        const newFrameData = {...this.props.frameData, mountThicknessDecimal:value}
        this.props.onDataChange({ frameData: newFrameData });
    }

    // Global events
    onDoneClick() {
        this.props.onDone();
    }

    onResetClick() {
        this.props.onDataChange({ frameData: this.state.initialData });
    }

    render() {
        const { frameData, onDataChange } = this.props;
        const { frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour, presetName } = frameData;

        const dataChanged = this.state.initialData !== frameData;

        const globalButts = [
            <Butt key="done" fullWidth={true} style={{ fontSize: '1rem' }} label={'DONE'} green
                  onClick={this.onDoneClick}/>,
            <Butt key="cancel" fullWidth={true} style={{ fontSize: '1rem' }} label={'RESET'}
                  red
                  disabled={!dataChanged}
                  onClick={this.onResetClick}/>
        ];

        const toolOptions = [
            {
                label: 'PRESETS',
                content: <PresetsControl frameData={frameData}
                                         initialPresetName={presetName}
                                         onDataChange={onDataChange}
                                         onPresetSelect={this.onPresetOptionSelected}/>
            },
            {
                label: 'FRAME',
                content: <ColourAndSizeControl title={'Frame'}
                                               id={'frame'}
                                               size={frameThicknessDecimal}
                                               colour={frameColour}
                                               onSizeChange={this.onFrameThicknessChange}
                                               onColourChange={this.onFrameColourChange}/>
            },
            {
                label: 'MOUNT',
                content: <ColourAndSizeControl title={'Mount'}
                                               id={'mount'}
                                               size={mountThicknessDecimal}
                                               colour={mountColour}
                                               onSizeChange={this.onMountThicknessChange}
                                               onColourChange={this.onMountColourChange}/>
            }
        ];

        return (
            <div className={'quickFrameEditor'}>

                <ToolControlPanel title={'FRAME'}
                                  minWidth={225}
                                  titleIcon={faImage}
                                  globalButts={globalButts}
                                  toolOptions={toolOptions}/>

            </div>
        );
    }
}

export default FrameEditor;

/*<div style={{ backgroundColor: '#fff', padding: 10 }}>
                            {`
                                frameColour: { hue:${frameColour.hue},saturation:${frameColour.saturation},lightness:${frameColour.lightness}},
                                mountColour: {hue:${mountColour.hue},saturation:${mountColour.saturation},lightness:${mountColour.lightness}},
                                frameThicknessDecimal: ${frameThicknessDecimal},
                                mountThicknessDecimal: ${mountThicknessDecimal}
                            `}
                        </div>*/
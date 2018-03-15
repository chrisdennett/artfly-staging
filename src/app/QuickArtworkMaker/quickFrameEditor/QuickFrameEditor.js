import React, { Component } from "react";
import faThReg from "@fortawesome/fontawesome-pro-regular/faTh";
import faSquareReg from "@fortawesome/fontawesome-pro-regular/faSquare";
import faSquare from "@fortawesome/fontawesome-pro-solid/faSquare";
import faImage from "@fortawesome/fontawesome-pro-solid/faImage";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './quickFrame_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import ColourAndSizeControl from "../../global/colourAndSizeControl/ColourAndSizeControl";
import PresetsControl from "./presets/PresetsControl";
import Butt from "../../global/Butt/Butt";
import ToolControlPanel from "../../global/toolControlPanel/ToolControlPanel";


class QuickFrameEditor extends Component {

    constructor(props) {
        super(props);

        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);

        this.onPresetsSelected = this.onPresetsSelected.bind(this);
        this.onFrameEditSelected = this.onFrameEditSelected.bind(this);
        this.onMountEditSelected = this.onMountEditSelected.bind(this);

        this.onFrameThicknessChange = this.onFrameThicknessChange.bind(this);
        this.onFrameColourChange = this.onFrameColourChange.bind(this);
        this.onMountThicknessChange = this.onMountThicknessChange.bind(this);
        this.onMountColourChange = this.onMountColourChange.bind(this);
        this.onPresetOptionSelected = this.onPresetOptionSelected.bind(this);
    }

    componentWillMount() {
        const { artworkData } = this.props;
        const currentTool = artworkData.frameData.presetName === 'custom' ? 'frame' : 'presets';

        if (artworkData) {
            this.setState({ ...artworkData.frameData, currentTool });
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
        this.setState({ frameColour, presetName: 'custom' })
    }

    onMountColourChange(mountColour) {
        this.setState({ mountColour, presetName: 'custom' })
    }

    onFrameThicknessChange(value) {
        this.setState({ frameThicknessDecimal: value, presetName: 'custom' });
    }

    onMountThicknessChange(value) {
        this.setState({ mountThicknessDecimal: value, presetName: 'custom' });
    }

    // PRESET FRAME EVENT
    onPresetOptionSelected(presetData) {
        this.setState({ ...presetData });
    }

    // Global events
    onDoneClick() {
        const { frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour, presetName } = this.state;
        const frameData = { presetName, frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour };

        this.props.onDone(frameData);
    }

    onCancelClick() {
        this.props.onCancel();
    }

    render() {
        const { height, width, artworkData, masterCanvas } = this.props;
        const { currentTool, frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour, presetName } = this.state;

        const frameData = { frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour };
        const unsavedArtworkData = { ...artworkData, frameData, titlesData: null };

        /*<div style={{ backgroundColor: '#fff', padding: 10 }}>
                            {`
                                frameColour: { hue:${frameColour.hue},saturation:${frameColour.saturation},lightness:${frameColour.lightness}},
                                mountColour: {hue:${mountColour.hue},saturation:${mountColour.saturation},lightness:${mountColour.lightness}},
                                frameThicknessDecimal: ${frameThicknessDecimal},
                                mountThicknessDecimal: ${mountThicknessDecimal}
                            `}
                        </div>*/

        const globalButts = [
            <Butt key="done" fullWidth={true} style={{ fontSize: '1rem' }} label={'DONE'} green
                  onClick={this.onDoneClick}/>,
            <Butt key="cancel" fullWidth={true} style={{ fontSize: '1rem' }} label={'CANCEL'} red
                  onClick={this.onCancelClick}/>
        ];

        const optionButts = [
            <ControlPanelButt onClick={this.onPresetsSelected}
                              key="presets"
                              isSelected={currentTool === 'presets'}
                              icon={faThReg}
                              style={{ margin: 0 }}
                              label={'PRESETS'}/>,

            <ControlPanelButt onClick={this.onFrameEditSelected}
                              key="frame"
                              isSelected={currentTool === 'frame'}
                              icon={faSquareReg}
                              style={{ margin: 0 }}
                              label={'FRAME'}/>,

            <ControlPanelButt onClick={this.onMountEditSelected}
                              key="mount"
                              isSelected={currentTool === 'mount'}
                              icon={faSquare}
                              style={{ margin: 0 }}
                              label={'MOUNT'}/>
        ];

        const title = <h1><FontAwesomeIcon icon={faImage}/> FRAME</h1>;

        return (
            <div className={'quickFrameEditor'}>

                <ToolControlPanel title={title}
                                  globalButts={globalButts}
                                  optionButts={optionButts}>

                    {currentTool === 'presets' &&
                    <PresetsControl frameData={frameData}
                                    initialPresetName={presetName}
                                    onPresetSelect={this.onPresetOptionSelected}
                    />
                    }

                    {currentTool === 'frame' &&
                    <ColourAndSizeControl title={'Frame'}
                                          id={'frame'}
                                          size={frameThicknessDecimal}
                                          colour={frameColour}
                                          onSizeChange={this.onFrameThicknessChange}
                                          onColourChange={this.onFrameColourChange}
                    />
                    }

                    {currentTool === 'mount' &&
                    <ColourAndSizeControl title={'Mount'}
                                          id={'mount'}
                                          size={mountThicknessDecimal}
                                          colour={mountColour}
                                          onSizeChange={this.onMountThicknessChange}
                                          onColourChange={this.onMountColourChange}
                    />
                    }
                </ToolControlPanel>

                {/*<div className={'quickFrameEditor--toolHolder'}>
                    <div className={'quickFrameEditor--toolHolder--controls'}>

                        {currentTool === 'presets' &&
                        <PresetsControl frameData={frameData}
                                        initialPresetName={presetName}
                                        onPresetSelect={this.onPresetOptionSelected}
                        />
                        }

                        {currentTool === 'frame' &&
                        <ColourAndSizeControl title={'Frame'}
                                              id={'frame'}
                                              size={frameThicknessDecimal}
                                              colour={frameColour}
                                              onSizeChange={this.onFrameThicknessChange}
                                              onColourChange={this.onFrameColourChange}
                        />
                        }

                        {currentTool === 'mount' &&
                        <ColourAndSizeControl title={'Mount'}
                                              id={'mount'}
                                              size={mountThicknessDecimal}
                                              colour={mountColour}
                                              onSizeChange={this.onMountThicknessChange}
                                              onColourChange={this.onMountColourChange}
                        />
                        }
                    </div>

                    <div className={'quickFrameEditor--toolHolder--selectors'}>

                        <ControlPanelButt onClick={this.onPresetsSelected}
                                          isSelected={currentTool === 'presets'}
                                          icon={faThReg}
                                          style={{ margin: 0 }}
                                          label={'PRESETS'}/>

                        <ControlPanelButt onClick={this.onFrameEditSelected}
                                          isSelected={currentTool === 'frame'}
                                          icon={faSquareReg}
                                          style={{ margin: 0 }}
                                          label={'FRAME'}/>

                        <ControlPanelButt onClick={this.onMountEditSelected}
                                          isSelected={currentTool === 'mount'}
                                          icon={faSquare}
                                          style={{ margin: 0 }}
                                          label={'MOUNT'}/>

                        <div className={'quickFrameEditor--toolHolder--selectors--globalButts'}>

                            <ControlPanelButt onClick={this.onDoneClick}
                                              icon={faCheckSquare}
                                              style={{ margin: 0, color: '#8ca630' }}
                                              label={'SAVE'}/>

                            <ControlPanelButt onClick={this.onCancelClick}
                                              icon={faCheckSquare}
                                              style={{ margin: 0, color: '#ce373e' }}
                                              label={'CANCEL'}/>
                        </div>

                    </div>


                </div>*/}

                <QuickArtwork height={height}
                              width={width}
                              artworkData={unsavedArtworkData}
                              isFixed={true}
                              masterCanvas={masterCanvas}
                />

            </div>
        );
    }
}

export default QuickFrameEditor;
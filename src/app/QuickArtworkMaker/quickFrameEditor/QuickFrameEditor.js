import React, { Component } from "react";
import faThReg from "@fortawesome/fontawesome-pro-regular/faTh";
import faSquareReg from "@fortawesome/fontawesome-pro-regular/faSquare";
import faSquare from "@fortawesome/fontawesome-pro-solid/faSquare";
import faCheckSquare from "@fortawesome/fontawesome-pro-solid/faCheckSquare";
// styles
import './quickFrame_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import ColourAndSizeControl from "./colourAndSizeControl/ColourAndSizeControl";
import PresetsControl from "./presets/PresetsControl";


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
        this.setState({ frameColour, presetName:'custom' })
    }

    onMountColourChange(mountColour) {
        this.setState({ mountColour, presetName:'custom' })
    }

    onFrameThicknessChange(e) {
        this.setState({ frameThicknessDecimal: e.target.value, presetName:'custom' });
    }

    onMountThicknessChange(e) {
        this.setState({ mountThicknessDecimal: e.target.value, presetName:'custom' });
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

        return (
            <div className={'quickFrameEditor'}>

                <div className={'quickFrameEditor--toolHolder'}>
                    <div className={'quickFrameEditor--toolHolder--controls'}>

                        {/*<div style={{ backgroundColor: '#fff', padding: 10 }}>
                            {`
                                frameColour: { hue:${frameColour.hue},saturation:${frameColour.saturation},lightness:${frameColour.lightness}},
                                mountColour: {hue:${mountColour.hue},saturation:${mountColour.saturation},lightness:${mountColour.lightness}},
                                frameThicknessDecimal: ${frameThicknessDecimal},
                                mountThicknessDecimal: ${mountThicknessDecimal}
                            `}
                        </div>*/}

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
                        {/*<div className={'quickFrameEditor--toolHolder--selectors--options'}>*/}

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


                </div>

                <QuickArtwork height={height}
                              width={width}
                              artworkData={unsavedArtworkData}
                              isFixed={true}
                              masterCanvas={masterCanvas}
                />

                {/*<div className={`quickFrame--controls--holder`}>
                    <div className={'quickFrame--controls'}>

                        <ControlPanelButt onClick={this.onFrameEditSelected}
                                          isSelected={currentTool === 'frame'}
                                          icon={faPenSquareReg}
                                          label={'FAME'}/>

                        <ControlPanelButt onClick={this.onMountEditSelected}
                                          isSelected={currentTool === 'mount'}
                                          icon={faPenSquare}
                                          label={'MOUNT'}/>

                        <div className={'quickFrame--controls--butts'}>
                            <FontAwesomeButt style={{ backgroundColor: '#abc843' }} onClick={this.onDoneClick}
                                             icon={faCheck}/>
                            <FontAwesomeButt style={{ backgroundColor: '#ce373e' }} onClick={this.onCancelClick}
                                             icon={faTimes}/>
                        </div>
                    </div>
                </div>*/}
            </div>
        );
    }
}

export default QuickFrameEditor;
import React, { Component } from "react";
import faThReg from "@fortawesome/fontawesome-pro-regular/faTh";
import faSquareReg from "@fortawesome/fontawesome-pro-regular/faSquare";
import faSquare from "@fortawesome/fontawesome-pro-solid/faSquare";
import faCheckSquare from "@fortawesome/fontawesome-pro-solid/faCheckSquare";
// styles
import './quickRoom_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import ColourAndSizeControl from "./colourAndSizeControl/ColourAndSizeControl";
import RoomPresets from "./presets/RoomPresets";

class QuickRoomEditor extends Component {

    constructor(props) {
        super(props);

        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);

        this.onPresetsSelected = this.onPresetsSelected.bind(this);
        this.onWallEditSelected = this.onWallEditSelected.bind(this);
        this.onFloorEditSelected = this.onFloorEditSelected.bind(this);

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

    onWallEditSelected() {
        this.setState({ currentTool: 'wall' });
    }

    onFloorEditSelected() {
        this.setState({ currentTool: 'floor' });
    }

    // CUSTOM FRAME EDITING EVENTS
    onFrameColourChange(frameColour) {
        this.setState({ frameColour, presetName:'custom' })
    }

    onMountColourChange(mountColour) {
        this.setState({ mountColour, presetName:'custom' })
    }

    onFrameThicknessChange(value) {
        this.setState({ frameThicknessDecimal: value, presetName:'custom' });
    }

    onMountThicknessChange(value) {
        this.setState({ mountThicknessDecimal: value, presetName:'custom' });
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
            <div className={'quickRoomEditor'}>

                <div className={'quickRoomEditor--toolHolder'}>
                    <div className={'quickRoomEditor--toolHolder--controls'}>

                        {/*<div style={{ backgroundColor: '#fff', padding: 10 }}>
                            {`
                                frameColour: { hue:${frameColour.hue},saturation:${frameColour.saturation},lightness:${frameColour.lightness}},
                                mountColour: {hue:${mountColour.hue},saturation:${mountColour.saturation},lightness:${mountColour.lightness}},
                                frameThicknessDecimal: ${frameThicknessDecimal},
                                mountThicknessDecimal: ${mountThicknessDecimal}
                            `}
                        </div>*/}

                        {currentTool === 'presets' &&
                        <RoomPresets frameData={frameData}
                                        initialPresetName={presetName}
                                        onPresetSelect={this.onPresetOptionSelected}
                        />
                        }

                        {currentTool === 'wall' &&
                        <ColourAndSizeControl title={'Wall'}
                                              id={'wall'}
                                              size={frameThicknessDecimal}
                                              colour={frameColour}
                                              onSizeChange={this.onFrameThicknessChange}
                                              onColourChange={this.onFrameColourChange}
                        />
                        }

                        {currentTool === 'floor' &&
                        <ColourAndSizeControl title={'Mount'}
                                              id={'mount'}
                                              size={mountThicknessDecimal}
                                              colour={mountColour}
                                              onSizeChange={this.onMountThicknessChange}
                                              onColourChange={this.onMountColourChange}
                        />
                        }
                    </div>

                    <div className={'quickRoomEditor--toolHolder--selectors'}>

                        <ControlPanelButt onClick={this.onPresetsSelected}
                                          isSelected={currentTool === 'presets'}
                                          icon={faThReg}
                                          style={{ margin: 0 }}
                                          label={'PRESETS'}/>

                        <ControlPanelButt onClick={this.onWallEditSelected}
                                          isSelected={currentTool === 'frame'}
                                          icon={faSquareReg}
                                          style={{ margin: 0 }}
                                          label={'WALL'}/>

                        <ControlPanelButt onClick={this.onFloorEditSelected}
                                          isSelected={currentTool === 'mount'}
                                          icon={faSquare}
                                          style={{ margin: 0 }}
                                          label={'FLOOR'}/>

                        <div className={'quickRoomEditor--toolHolder--selectors--globalButts'}>

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

            </div>
        );
    }
}

export default QuickRoomEditor;
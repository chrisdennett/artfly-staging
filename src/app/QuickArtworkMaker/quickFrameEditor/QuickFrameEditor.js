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
import PresetsControl from "./colourAndSizeControl/PresetsControl";

const defaultFrameThickness = 0.04;
const defaultMountThickness = 0.06;
const defaultFrameColour = { hue: 96, saturation: 0, lightness: 29 };
const defaultMountColour = { hue: 96, saturation: 0, lightness: 100 };

class QuickFrameEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            frameThicknessDecimal: defaultFrameThickness,
            frameColour: defaultFrameColour,
            mountThicknessDecimal: defaultMountThickness,
            mountColour: defaultMountColour,
            currentTool: 'frame'
        };

        this.onDoneClick = this.onDoneClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);

        this.onPresetsSelected = this.onPresetsSelected.bind(this);
        this.onFrameEditSelected = this.onFrameEditSelected.bind(this);
        this.onMountEditSelected = this.onMountEditSelected.bind(this);

        this.onFrameThicknessChange = this.onFrameThicknessChange.bind(this);
        this.onFrameColourChange = this.onFrameColourChange.bind(this);

        this.onMountThicknessChange = this.onMountThicknessChange.bind(this);
        this.onMountColourChange = this.onMountColourChange.bind(this);
    }

    componentWillMount() {
        const { artworkData } = this.props;
        if (artworkData) {
            this.setState({ ...artworkData.frameData });
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

    // Tool events
    onFrameColourChange(frameColour) {
        this.setState({ frameColour })
    }

    onMountColourChange(mountColour) {
        this.setState({ mountColour })
    }

    onFrameThicknessChange(e) {
        this.setState({ frameThicknessDecimal: e.target.value });
    }

    onMountThicknessChange(e) {
        this.setState({ mountThicknessDecimal: e.target.value });
    }

    // Global control events
    onDoneClick() {
        const { frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour } = this.state;
        const frameData = { frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour };

        this.props.onDone(frameData);
    }

    onClearClick() {
        this.setState({ frameThicknessDecimal: defaultFrameThickness });
    }

    onCancelClick() {
        this.props.onCancel();
    }

    render() {
        const { height, width, artworkData, masterCanvas } = this.props;
        const { currentTool, frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour } = this.state;

        const frameData = { frameThicknessDecimal, frameColour, mountThicknessDecimal, mountColour };
        const unsavedArtworkData = { ...artworkData, frameData, titlesData: null };

        return (
            <div className={'quickFrameEditor'}>

                <div className={'quickFrameEditor--toolHolder'}>
                    <div className={'quickFrameEditor--toolHolder--controls'}>

                        {currentTool === 'presets' &&
                        <PresetsControl frameSize={frameThicknessDecimal}
                                        mountSize={mountThicknessDecimal}
                                        onFrameSizeChange={this.onFrameThicknessChange}
                                        onMountSizeChange={this.onMountThicknessChange}
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
import React, { Component } from "react";
import faPenSquare from "@fortawesome/fontawesome-pro-solid/faPenSquare";
import faPenSquareReg from "@fortawesome/fontawesome-pro-regular/faPenSquare"
import faCheck from "@fortawesome/fontawesome-pro-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-pro-solid/faTimes";
// styles
import './quickFrame_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import FontAwesomeButt from "../../global/Butt/FontAwesomeButt";
import ColourAndSizeControl from "./colourAndSizeControl/ColourAndSizeControl";
import Butt from "../../global/Butt/Butt";

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
                        <div className={'quickFrameEditor--toolHolder--selectors--options'}>

                            <ControlPanelButt onClick={this.onFrameEditSelected}
                                              isSelected={currentTool === 'frame'}
                                              icon={faPenSquareReg}
                                              label={'FAME'}/>
                            <ControlPanelButt onClick={this.onMountEditSelected}
                                              isSelected={currentTool === 'mount'}
                                              icon={faPenSquare}
                                              label={'MOUNT'}/>
                        </div>
                        {/* <FontAwesomeButt style={{ backgroundColor: '#abc843' }} onClick={this.onDoneClick}
                                         icon={faCheck}/>
                        <FontAwesomeButt style={{ backgroundColor: '#ce373e' }} onClick={this.onCancelClick}
                                         icon={faTimes}/>*/}

                        <div className={'quickFrameEditor--toolHolder--selectors--globalButts'}>
                            <Butt fullWidth={true} label={'DONE'} green onClick={this.onDoneClick}/>
                            <Butt fullWidth={true} label={'CANCEL'} red onClick={this.onCancelClick}/>
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
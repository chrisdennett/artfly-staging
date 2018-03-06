import React, { Component } from "react";
import faSlidersHSquare from "@fortawesome/fontawesome-pro-solid/faSlidersHSquare";
import faPenSquare from "@fortawesome/fontawesome-pro-solid/faPenSquare";
import faPenSquareReg from "@fortawesome/fontawesome-pro-regular/faPenSquare"
import faCheck from "@fortawesome/fontawesome-pro-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-pro-solid/faTimes";
// styles
import './quickFrame_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import ColourPicker from "./colourPicker/ColourPicker";
import Slider from "./slider/Slider";
import FontAwesomeButt from "../../global/Butt/FontAwesomeButt";

const defaultFrameThickness = 0.04;
const defaultFrameColour = {hue:96, saturation:0, lightness:29};

class QuickFrameEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            frameThicknessDecimal: defaultFrameThickness,
            frameColour: defaultFrameColour,
            currentTool: 'frameColour' };

        this.onFrameWidthChange = this.onFrameWidthChange.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onFrameSizeSelected = this.onFrameSizeSelected.bind(this);
        this.onFrameColourSelected = this.onFrameColourSelected.bind(this);
        this.onMountColourSelected = this.onMountColourSelected.bind(this);
        this.onFrameColourChange = this.onFrameColourChange.bind(this);
    }

    componentWillMount() {
        if (this.props.frameData) {
            this.setState({ ...this.props.frameData });
        }
    }

    onFrameColourChange(frameColour){
        this.setState({frameColour})
    }

    onFrameSizeSelected() {
        this.setState({ currentTool: 'frameAndMountSize' });
    }

    onFrameColourSelected() {
        this.setState({ currentTool: 'frameColour' });
    }

    onMountColourSelected() {
        this.setState({ currentTool: 'mountColour' });
    }

    onFrameWidthChange(e) {
        this.setState({ frameThicknessDecimal: e.target.value });
    }

    onDoneClick() {
        const { frameThicknessDecimal, frameColour } = this.state;
        const frameData = { frameThicknessDecimal, frameColour};

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
        const { frameThicknessDecimal, currentTool, frameColour } = this.state;

        console.log("frameColour: ", frameColour);

        const frameData = { frameThicknessDecimal, frameColour };
        const unsavedArtworkData = { ...artworkData, frameData, titles: null };

        return (
            <div className={'quickFrameEditor'}>

                <div className={'quickFrameEditor--toolHolder'}>

                    {currentTool === 'frameAndMountSize' &&
                    <div>
                        <Slider label={'FRAME'}
                                min={0.01} max={0.1} step={0.001}
                                value={frameThicknessDecimal}
                                onChange={this.onFrameWidthChange}/>


                        {/*<Slider label={'MOUNT'}
                                 min={10} max={100}
                                 value={frameThicknessDecimal}
                                 onChange={this.onFrameWidthChange}/>*/}
                    </div>
                    }

                    {currentTool === 'frameColour' &&
                    <ColourPicker title={'FRAME COLOUR'}
                                  frameColour={frameColour}
                                  onColourChange={this.onFrameColourChange}/>
                    }

                    {currentTool === 'mountColour' &&
                    <ColourPicker title={'MOUNT COLOUR'}/>
                    }

                </div>

                <QuickArtwork height={height}
                              width={width}
                              artworkData={unsavedArtworkData}
                              isFixed={true}
                              masterCanvas={masterCanvas}
                />

                <div className={`quickFrame--controls--holder`}>
                    <div className={'quickFrame--controls'}>
                        {/*<h3>{'FRAMING'}</h3>*/}
                        {/*<p>{'< back'}</p>*/}

                        <ControlPanelButt onClick={this.onFrameSizeSelected}
                                          isSelected={currentTool === 'frameAndMountSize'}
                                          icon={faSlidersHSquare}
                                          label={'FAME & MOUNT SIZE'}/>

                        <ControlPanelButt onClick={this.onFrameColourSelected}
                                          isSelected={currentTool === 'frameColour'}
                                          icon={faPenSquareReg}
                                          label={'FAME COLOUR'}/>

                        <ControlPanelButt onClick={this.onMountColourSelected}
                                          isSelected={currentTool === 'mountColour'}
                                          icon={faPenSquare}
                                          label={'MOUNT COLOUR'}/>

                        <div className={'quickFrame--controls--butts'}>
                            <FontAwesomeButt style={{ backgroundColor: '#abc843' }} onClick={this.onDoneClick}
                                             icon={faCheck}/>
                            <FontAwesomeButt style={{ backgroundColor: '#ce373e' }} onClick={this.onCancelClick}
                                             icon={faTimes}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickFrameEditor;
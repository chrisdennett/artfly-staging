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

class QuickFrameEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { frameThicknessDecimal: defaultFrameThickness };

        this.onFrameWidthChange = this.onFrameWidthChange.bind(this);
        this.onDoneClick = this.onDoneClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onFrameSizeSelected = this.onFrameSizeSelected.bind(this);
        this.onFrameColourSelected = this.onFrameColourSelected.bind(this);
        this.onMountColourSelected = this.onMountColourSelected.bind(this);
    }

    componentWillMount() {
        if (this.props.frameData) {
            this.setState({ ...this.props.frameData });
        }
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
        const frameWidthPercentage = e.target.value;
        const frameWidthDecimal = frameWidthPercentage / 1000;
        this.setState({ frameThicknessDecimal: frameWidthDecimal });
    }

    onDoneClick() {
        const { frameThicknessDecimal } = this.state;
        const frameData = { frameThicknessDecimal };

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
        const { frameThicknessDecimal, currentTool } = this.state;
        const frameThicknessPercentage = frameThicknessDecimal * 1000;
        const frameData = { frameThicknessDecimal };
        const unsavedArtworkData = { ...artworkData, frameData, titles: null };

        return (
            <div className={'quickFrameEditor'}>

                <div className={'quickFrameEditor--toolHolder'}>

                    {currentTool === 'frameAndMountSize' &&
                    <div>
                        <Slider label={'FRAME'}
                                min={10} max={100}
                                value={frameThicknessPercentage}
                                onChange={this.onFrameWidthChange}/>


                        < Slider label={'MOUNT'}
                                 min={10} max={100}
                                 value={frameThicknessPercentage}
                                 onChange={this.onFrameWidthChange}/>
                    </div>
                    }

                    {currentTool === 'frameColour' &&
                    <ColourPicker title={'FRAME COLOUR'}/>
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
                        <h3>{'FRAMING'}</h3>
                        <h4>{'< back'}</h4>

                        <ControlPanelButt onClick={this.onFrameSizeSelected}
                        icon={faSlidersHSquare}
                        label={'FAME & MOUNT SIZE'}/>

                        <ControlPanelButt onClick={this.onFrameColourSelected}
                        icon={faPenSquareReg}
                        label={'FAME COLOUR'}/>

                        <ControlPanelButt onClick={this.onMountColourSelected}
                        icon={faPenSquare}
                        label={'MOUNT COLOUR'}/>

                        <div className={'quickFrame--controls--butts'}>
                        <FontAwesomeButt style={{ backgroundColor: '#abc843' }} onClick={this.onDoneClick} icon={faCheck}/>
                        <FontAwesomeButt style={{ backgroundColor: '#ce373e' }} onClick={this.onCancelClick} icon={faTimes}/>
                        </div>
                        </div>
                        </div>
                        </div>
                        );
                        }
                    }

                    export default QuickFrameEditor;
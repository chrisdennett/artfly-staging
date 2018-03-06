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
import Butt from "../../global/Butt/Butt";
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
    }

    componentWillMount() {
        if (this.props.frameData) {
            this.setState({ ...this.props.frameData });
        }
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
        const { height, width, cropData, masterCanvas, widthToHeightRatio, heightToWidthRatio } = this.props;
        const { frameThicknessDecimal } = this.state;
        const frameThicknessPercentage = frameThicknessDecimal * 1000;
        const frameData = { frameThicknessDecimal };

        return (
            <div className={'quickFrameEditor'}>

                <div className={'quickFrameEditor--toolHolder'}>

                    <Slider label={'FRAME'}
                            min={10} max={100}
                            value={frameThicknessPercentage}
                            onChange={this.onFrameWidthChange}/>

                    <Slider label={'MOUNT'}
                            min={10} max={100}
                            value={frameThicknessPercentage}
                            onChange={this.onFrameWidthChange}/>

                    <ColourPicker title={'FRAME COLOUR'}/>

                    <ColourPicker title={'MOUNT COLOUR'}/>

                </div>

                <QuickArtwork height={height}
                              width={width}
                              frameData={frameData}
                              isFixed={true}
                              cropData={cropData}
                              masterCanvas={masterCanvas}
                              widthToHeightRatio={widthToHeightRatio}
                              heightToWidthRatio={heightToWidthRatio}
                />

                <div className={`quickFrame--controls--holder`}>
                    <div className={'quickFrame--controls'}>
                        <h3>{'FRAMING'}</h3>
                        <h4>{'< back'}</h4>

                        <ControlPanelButt icon={faSlidersHSquare} label={'FAME & MOUNT SIZE'}/>
                        <ControlPanelButt icon={faPenSquareReg} label={'FAME COLOUR'}/>
                        <ControlPanelButt icon={faPenSquare} label={'MOUNT COLOUR'}/>


                        <div className={'quickFrame--controls--butts'}>
                            <FontAwesomeButt style={{backgroundColor: '#abc843'}} onClick={this.onDoneClick} icon={faCheck}/>
                            <FontAwesomeButt style={{backgroundColor: '#ce373e'}} onClick={this.onCancelClick} icon={faTimes}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickFrameEditor;
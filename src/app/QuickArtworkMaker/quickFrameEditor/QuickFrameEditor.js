import React, { Component } from "react";
// styles
import './quickFrame_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import Butt from "../../global/Butt/Butt";

const defaultFrameThickness = 0.04;

class QuickFrameEditor extends Component {

    constructor(props) {
        super(props);
        
        this.state = { frameThicknessDecimal:defaultFrameThickness };

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
        const frameWidthDecimal = frameWidthPercentage/1000;
        this.setState({ frameThicknessDecimal: frameWidthDecimal});
    }

    onDoneClick() {
        const { frameThicknessDecimal } = this.state;
        const frameData = {frameThicknessDecimal};

        this.props.onDone(frameData);
    }

    onClearClick() {
        this.setState({ frameThicknessDecimal:defaultFrameThickness });
    }

    onCancelClick(){
        this.props.onCancel();
    }

    render() {
        const { titles, height, width, cropData, masterCanvas, widthToHeightRatio, heightToWidthRatio } = this.props;
        const { frameThicknessDecimal } = this.state;
        const frameThicknessPercentage = frameThicknessDecimal * 1000;
        const frameData = {frameThicknessDecimal};

        const showArtwork = width > 800;
        let controlsClass = 'quickTitles--controls--holder--partView';
        if(!showArtwork){
            controlsClass = 'quickTitles--controls--holder--fullView'
        }

        return (
            <div className={'quickTitles'}>

                {showArtwork &&
                <QuickArtwork height={height}
                              width={width}
                              frameData={frameData}
                              isFixed={true}
                              titles={titles}
                              cropData={cropData}
                              masterCanvas={masterCanvas}
                              widthToHeightRatio={widthToHeightRatio}
                              heightToWidthRatio={heightToWidthRatio}
                />
                }

                <div className={`quickTitles--controls--holder ${controlsClass}`}>
                    <div className={'quickTitles--controls'}>
                        <h2>Frame & Mount:</h2>

                        <div className="quickFrameEditor--sliderHolder">
                            <input type="range"
                                   className="quickFrameEditor--slider"
                                   min="10"
                                   max="100"
                                   value={frameThicknessPercentage}
                                   onChange={this.onFrameWidthChange}
                                   id="frameThicknessRange"/>
                        </div>

                        <div className={'quickTitles--controls--butts'}>
                            <Butt fullWidth={true} label={'DONE'} green onClick={this.onDoneClick}/>
                            <Butt fullWidth={true} label={'CLEAR ALL'} onClick={this.onClearClick}/>
                            <Butt fullWidth={true} label={'CANCEL'} red onClick={this.onCancelClick}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuickFrameEditor;
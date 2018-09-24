import React, { Component } from "react";
// styles
import './colourSplitter_styles.css'
// images
import graphPaperTile from './hip-square-small.png';
// helpers
import { EditAppBar } from "../../../components/appBar/AppBar";
import {
    copyToCanvas,
    createColourSplitCanvas,
    getDimensionRatios
} from "../../../components/global/ImageHelper";
// comps
import LoadingThing from "../../../components/loadingThing/LoadingThing";
import SliderControl from "../../../components/appControls/SliderControl";

class ColourSplitter extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.combineCanvases = this.combineCanvases.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    componentDidMount() {
        const { initialEditValues, editKey } = this.props;

        // set the initial values
        const { cyanXPercent, magentaXPercent, yellowXPercent } = initialEditValues;
        this.setState({ isSetUp: true, editKey, cyanXPercent, magentaXPercent, yellowXPercent }, this.combineCanvases);
    }

    combineCanvases() {
        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.state;
        const { sourceCanvas } = this.props;

        const combinedCanvas = createColourSplitCanvas(sourceCanvas, { cyanXPercent, magentaXPercent, yellowXPercent });

        copyToCanvas(combinedCanvas, this.canvas);

        this.setState({ isLoaded: true });
    }

    onSaveClick() {
        const { initialEditValues, editKey } = this.props;
        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.state;

        const newEditValues = { ...initialEditValues, cyanXPercent, magentaXPercent, yellowXPercent };

        // need to work out width and height ratios with crop taken into account
        const { width, height } = this.canvas;
        const { widthToHeightRatio, heightToWidthRatio} = getDimensionRatios(width, height);

        this.props.onSaveClick(this.canvas, editKey, newEditValues, widthToHeightRatio, heightToWidthRatio);
    }

    onCancelClick() {
        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.props.initialEditValues;
        this.setState({ cyanXPercent, magentaXPercent, yellowXPercent }, this.combineCanvases);
    }

    render() {
        const { onCloseClick, initialEditValues } = this.props;

        if (!this.state.isSetUp) {
            return <LoadingThing/>
        }

        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.state;

        const hasChanges = checkIfChanged(initialEditValues, { cyanXPercent, magentaXPercent, yellowXPercent });
        const style = { backgroundImage: `url(${graphPaperTile})` };

        return (
            <div className={'labApp'} style={style}>

                <EditAppBar title={'Colour Splitter'}
                            hasChanges={hasChanges}
                            onCloseClick={onCloseClick}
                            onSaveClick={this.onSaveClick}
                            onCancelClick={this.onCancelClick}/>

                {!this.state.isLoaded &&
                <LoadingThing label={'Loading Source Image'}/>
                }

                <div className={'labApp--content'}>
                    <canvas ref={canvas => this.canvas = canvas}
                            className={'rgb--output-canvas'}/>
                </div>

                <div className={'appControls'}>
                    <div className={'appControls--inner'}>

                        <SliderControl label={'Cyan:'}
                                       min={0}
                                       max={100}
                                       value={cyanXPercent}
                                       onChange={value => this.setState({ cyanXPercent: value }, this.combineCanvases)}/>

                        <SliderControl label={'Magenta:'}
                                       min={0}
                                       max={100}
                                       value={magentaXPercent}
                                       onChange={value => this.setState({ magentaXPercent: value }, this.combineCanvases)}/>

                        <SliderControl label={'Yellow:'}
                                       min={0}
                                       max={100}
                                       value={yellowXPercent}
                                       onChange={value => this.setState({ yellowXPercent: value }, this.combineCanvases)}/>

                    </div>
                </div>

            </div>
        );
    }
}

export default ColourSplitter;

const checkIfChanged = (initialValues, currentValues) => {
    const { cyanXPercent: initialCyan, magentaXPercent: initialMagenta, yellowXPercent: initialYellow } = initialValues;
    const { cyanXPercent, magentaXPercent, yellowXPercent } = currentValues;

    return cyanXPercent !== initialCyan || magentaXPercent !== initialMagenta || yellowXPercent !== initialYellow;
};
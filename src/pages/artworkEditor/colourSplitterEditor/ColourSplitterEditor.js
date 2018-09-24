import React, { Component } from "react";
// styles
import './colourSplitter_styles.css'
// images
import graphPaperTile from './hip-square-small.png';
// constants
import { DEFAULT_COLOUR_SPLITTER_VALUES } from "../../../GLOBAL_CONSTANTS";
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
import { generateUID } from "../../../components/global/UTILS";

class ColourSplitter extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.combineCanvases = this.combineCanvases.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    componentDidMount() {
        const { editValues:initialEditValues, editKey:initialEditKey } = this.props;

        let editKey, editValues;

        if(initialEditKey === "new"){
            editKey = generateUID();
            editValues = {...initialEditValues, ...DEFAULT_COLOUR_SPLITTER_VALUES};
        }
        else{
            editKey = initialEditKey;
            editValues = initialEditValues;
        }

        // set the initial values
        const {  cyanXPercent, magentaXPercent, yellowXPercent } = editValues;
        this.setState({ isSetUp:true, editKey, editValues, cyanXPercent, magentaXPercent, yellowXPercent }, this.combineCanvases);
    }

    combineCanvases() {
        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.state;

        const combinedCanvas = createColourSplitCanvas(this.props.sourceCanvas, { cyanXPercent, magentaXPercent, yellowXPercent });
        copyToCanvas(combinedCanvas, this.canvas);

        this.setState({ isLoaded: true });
    }

    onSaveClick() {
        const { artworkData } = this.props;
        const { cyanXPercent, magentaXPercent, yellowXPercent, editValues, editKey } = this.state;

        const { edits } = artworkData;
        const newEditValues = { ...editValues, cyanXPercent, magentaXPercent, yellowXPercent };
        const updatedEdits = { ...edits, [editKey]: newEditValues };

        // need to work out width and height ratios with crop taken into account
        const { width, height } = this.canvas;
        const { widthToHeightRatio: outputWidthToHeightRatio, heightToWidthRatio: outputHeightToWidthRatio } = getDimensionRatios(width, height);

        const newArtworkData = { ...artworkData, edits: updatedEdits, outputWidthToHeightRatio, outputHeightToWidthRatio };


        this.props.onSaveClick(this.canvas, newArtworkData);
    }

    onCancelClick() {
        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.state.editValues;
        this.setState({ cyanXPercent, magentaXPercent, yellowXPercent }, this.combineCanvases);
    }

    render() {
        const { onCloseClick, artworkData } = this.props;

        if (!artworkData || !this.state.isSetUp) {
            return <LoadingThing/>
        }

        const { cyanXPercent, magentaXPercent, yellowXPercent, editValues } = this.state;
        
        const hasChanges = checkIfChanged(editValues, { cyanXPercent, magentaXPercent, yellowXPercent });
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
                    <canvas ref={(canvas) => this.canvas = canvas}
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
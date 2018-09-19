import React, { Component } from "react";
import isEqual from 'lodash/isEqual';
// styles
import './colourSplitter_styles.css'
// images
import graphPaperTile from './hip-square-small.png';
// helpers
import * as ImageHelper from '../../../components/global/ImageHelper';
// comps
import SliderControl from "../../../components/appControls/SliderControl";
import { EditAppBar } from "../../../components/appBar/AppBar";
import LoadingThing from "../../../components/loadingThing/LoadingThing";
import { LARGE_IMG_SIZE } from "../../../GLOBAL_CONSTANTS";
import { copyToCanvas } from "../../../components/global/ImageHelper";
import { getColourSplitterValues } from "../../../components/global/ImageHelper";
import { createColourSplitCanvas } from "../../../components/global/ImageHelper";
import { loadImage } from "../../../components/global/ImageHelper";
import { drawToCanvasWithMaxSize } from "../../../components/global/ImageHelper";
import { drawOrientatedCanvas } from "../../../components/global/ImageHelper";
import { drawCroppedCanvas } from "../../../components/global/ImageHelper";

class ColourSplitter extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.combineCanvases = this.combineCanvases.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    componentDidMount() {
        const { editValues } = this.props;
        const { sourceUrl, orientation, cropData } = this.props.artworkData;

        loadImage(sourceUrl, (sourceImg) => {
            const resizedCanvas = drawToCanvasWithMaxSize(sourceImg, LARGE_IMG_SIZE, LARGE_IMG_SIZE);
            const orientatedCanvas = drawOrientatedCanvas(resizedCanvas, orientation);
            this.sourceCanvas = drawCroppedCanvas(orientatedCanvas, cropData);

            const { cyanXPercent, magentaXPercent, yellowXPercent } = editValues;

            this.setState({ cyanXPercent, magentaXPercent, yellowXPercent });

            this.combineCanvases();
        });
    }

    combineCanvases() {
        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.state;

        const combinedCanvas = createColourSplitCanvas(this.sourceCanvas, { cyanXPercent, magentaXPercent, yellowXPercent });
        copyToCanvas(combinedCanvas, this.canvas);

        this.setState({ isLoaded: true });
    }

    onSaveClick() {
        this.props.onSaveClick(this.canvas);
    }

    onCancelClick(){
        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.props.editValues;
        this.setState({cyanXPercent, magentaXPercent, yellowXPercent}, this.combineCanvases);
    }

    render() {
        const { onCloseClick, artworkData, editValues } = this.props;

        if (!artworkData || !artworkData.sourceUrl) {
            return <LoadingThing/>
        }

        const { cyanXPercent, magentaXPercent, yellowXPercent } = this.state;

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
    const { cyanXPercent:initialCyan, magentaXPercent:initialMagenta, yellowXPercent:initialYellow } = initialValues;
    const { cyanXPercent, magentaXPercent, yellowXPercent } = currentValues;

    return cyanXPercent !== initialCyan || magentaXPercent !== initialMagenta || yellowXPercent !== initialYellow;
};
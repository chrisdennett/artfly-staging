import React, { Component } from "react";
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

class ColourSplitter extends Component {

    constructor(props) {
        super(props);

        this.setupCanvases = this.setupCanvases.bind(this);
        this.onOffsetXSliderChange = this.onOffsetXSliderChange.bind(this);
        this.combineCanvases = this.combineCanvases.bind(this);
    }

    componentDidMount() {
        this.updateMasterCanvas(this.props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.sourceImg && !prevProps.sourceImg) {
            this.updateMasterCanvas(this.props);
        }
        else {
            this.combineCanvases();
        }
    }

    updateMasterCanvas(props = this.props) {
        const { sourceImg, artworkData } = props;

        // console.log("sourceImg: ", sourceImg);
        // console.log("this.sourceCanvas: ", this.sourceCanvas);
        if (!sourceImg || !this.sourceCanvas) return;

        const { orientation } = artworkData;

        const maxOutputWidth = Math.max(window.innerWidth, document.documentElement.clientWidth, 400);
        const maxCuttingBoardHeight = maxOutputWidth * (sourceImg.height / sourceImg.width);

        // const maxOutputWidth = 800;
        // const maxCuttingBoardHeight = 900;

        ImageHelper.drawToCanvas({
                sourceCanvas: sourceImg,
                outputCanvas: this.sourceCanvas,
                orientation: orientation,
                maxOutputCanvasWidth: maxOutputWidth,
                maxOutputCanvasHeight: maxCuttingBoardHeight
            },
            () => {
                // add back in the filters currently used
                ImageHelper.drawToCanvas({ sourceCanvas: this.sourceCanvas, outputCanvas: this.canvas1 });
                this.canvas2.width = this.canvas3.width = this.canvas.width = this.canvas1.width;
                this.canvas2.height = this.canvas3.height = this.canvas.height = this.canvas1.height;

                this.setupCanvases();
            })
    }

    setupCanvases() {
        splitRGBToSeparateCanvases(this.sourceCanvas, this.canvas1, this.canvas2, this.canvas3);
        this.combineCanvases();
    }

    onOffsetXSliderChange(layerName, value) {
        const colourSplitterEdits = { ...getColourSplitterValues(this.props.artworkData), [layerName]: value };
        this.props.onDataChange({ colourSplitterEdits });
    }

    combineCanvases() {
        const { cyanXPercent, magentaXPercent, yellowXPercent } = getColourSplitterValues(this.props.artworkData);
        const maxWidth = this.canvas1.width * 2;
        const cyanPos = maxWidth * (cyanXPercent / 100);
        const magentaPos = maxWidth * (magentaXPercent / 100);
        const yellowPos = maxWidth * (yellowXPercent / 100);

        // always draw from left most edge of canvas
        // left edge
        const leftEdge = Math.min(cyanPos, magentaPos, yellowPos);
        const rightEdge = Math.max(cyanPos, magentaPos, yellowPos);

        this.canvas.width = this.canvas1.width + (rightEdge - leftEdge);

        const ctx = this.canvas.getContext('2d');
        ctx.globalCompositeOperation = 'multiply';
        // ctx.globalCompositeOperation = 'hue'; // soft monochrome
        // ctx.globalCompositeOperation = 'exclusion'; // like invert
        // ctx.globalCompositeOperation = 'hard-light'; // interesting
        // ctx.globalCompositeOperation = 'overlay'; // interesting

        ctx.drawImage(this.canvas3, yellowPos - leftEdge, 0);
        ctx.drawImage(this.canvas2, magentaPos - leftEdge, 0);
        ctx.drawImage(this.canvas1, cyanPos - leftEdge, 0);
    }

    render() {
        const { hasChanges, onCloseClick, onSaveClick, onCancelClick, artworkData } = this.props;

        if (!artworkData || !artworkData.frameData) {
            return <LoadingThing/>
        }

        const { cyanXPercent, magentaXPercent, yellowXPercent } = getColourSplitterValues(artworkData);
        const style = { backgroundImage: `url(${graphPaperTile})` };

        return (
            <div className={'labApp'} style={style}>

                <EditAppBar title={'Colour Splitter'}
                            hasChanges={hasChanges}
                            onCloseClick={onCloseClick}
                            onSaveClick={() => onSaveClick(this.canvas)}
                            onCancelClick={onCancelClick}/>

                <div className={'labApp--content'}>
                    <canvas ref={(canvas) => this.canvas = canvas}
                            className={'rgb--output-canvas'}/>

                    <canvas ref={(canvas) => this.canvas1 = canvas}
                            className={'hidden-canvas'}/>

                    <canvas ref={(canvas) => this.canvas2 = canvas}
                            className={'hidden-canvas'}/>

                    <canvas ref={(canvas) => this.canvas3 = canvas}
                            className={'hidden-canvas'}/>

                    <canvas ref={(canvas) => this.sourceCanvas = canvas}
                            style={{ display: 'none' }}
                            className={'source-canvas'}/>
                </div>

                <div className={'appControls'}>
                    <div className={'appControls--inner'}>

                        <SliderControl label={'Cyan:'}
                                       min={0}
                                       max={100}
                                       value={cyanXPercent}
                                       onChange={value => this.onOffsetXSliderChange('cyanXPercent', value)}/>

                        <SliderControl label={'Magenta:'}
                                       min={0}
                                       max={100}
                                       value={magentaXPercent}
                                       onChange={value => this.onOffsetXSliderChange('magentaXPercent', value)}/>

                        <SliderControl label={'Yellow:'}
                                       min={0}
                                       max={100}
                                       value={yellowXPercent}
                                       onChange={value => this.onOffsetXSliderChange('yellowXPercent', value)}/>

                    </div>
                </div>

            </div>
        );
    }
}

export default ColourSplitter;

const getColourSplitterValues = (artworkData) => {
    if (artworkData && artworkData.colourSplitterEdits) {
        const { cyanXPercent = 0, magentaXPercent = 0, yellowXPercent = 0 } = artworkData.colourSplitterEdits;
        return { cyanXPercent, magentaXPercent, yellowXPercent };
    }
    else {
        // return a default if no data is set yet
        return { cyanXPercent: 0, magentaXPercent: 5, yellowXPercent: 10 }
    }
};

const splitRGBToSeparateCanvases = (sourceCanvas, outputCanvas1, outputCanvas2, outputCanvas3) => {
    const sourceCtx = sourceCanvas.getContext('2d');

    let imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    let imageData2 = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    let imageData3 = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    let imageData4 = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    let pixels1 = imageData.data;
    let pixels2 = imageData2.data;
    let pixels3 = imageData3.data;
    let pixels4 = imageData4.data;

    for (let i = 0; i < pixels1.length; i += 4) {
        const r = pixels1[i];     // red
        const g = pixels1[i + 1]; // green
        const b = pixels1[i + 2]; // blue

        pixels1[i] = r;
        pixels1[i + 1] = 255;
        pixels1[i + 2] = 255;

        pixels2[i] = 255;
        pixels2[i + 1] = g;
        pixels2[i + 2] = 255;

        pixels3[i] = 255;
        pixels3[i + 1] = 255;
        pixels3[i + 2] = b;

        // const avg = (r + g + b) / 3;
        const avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        pixels4[i] = avg;
        pixels4[i + 1] = avg;
        pixels4[i + 2] = avg;
    }

    // put the updated image data in the output canvas
    outputCanvas1.getContext('2d').putImageData(imageData, 0, 0);
    outputCanvas2.getContext('2d').putImageData(imageData2, 0, 0);
    outputCanvas3.getContext('2d').putImageData(imageData3, 0, 0);
}

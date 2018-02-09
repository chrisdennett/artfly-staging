import React, { Component } from "react";
import sizeMe from 'react-sizeme';
// styles
import './quickArtworkMaker_styles.css';
// helpers
import * as ImageHelper from "../ArtStudio/ImageHelper";
// comps
import QuickPhotoSelector from "./quickPhotoSelector/QuickPhotoSelector";
import QuickArtwork from "./quickArtwork/QuickArtwork";
import QuickCropAndRotate from "./quickCropAndRotate/QuickCropAndRotate";
import QuickArtMakerTools from "./quickArtMakerTools/QuickArtMakerTools";
import QuickShare from "./quickShare/QuickShare";

class QuickArtworkMaker extends Component {

    constructor(props) {
        super(props);

        this.onPhotoSelect = this.onPhotoSelect.bind(this);
        this.onToolSelect = this.onToolSelect.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.updateMasterCanvas = this.updateMasterCanvas.bind(this);

        // const cropData = { leftPercent: 0.15, rightPercent: 1, topPercent: 0.1, bottomPercent: 0.78 };
        const cropData = { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 };

        this.state = { currentTool: 'upload', cropData, orientation: 1 };
    }

    // TEST ONLY
    componentDidMount() {
        //const cropData = {leftPercent:0, rightPercent:1, topPercent:0, bottomPercent:1};
        // this.setState({ currentTool: 'view', cropData })
        // this.sourceImg = testArtworkData.sourceImg;
        // this.updateMasterCanvas(this.sourceImg, 1);
    }

    // Left nav tool selection
    onToolSelect(toolName) {
        this.setState({ currentTool: toolName })
    }

    // Photo selected
    onPhotoSelect(imgFile) {
        ImageHelper.GetImage(imgFile,
            (sourceImg, imgOrientation) => {
                this.updateMasterCanvas(sourceImg, imgOrientation);
            });
    }

    // Use Master canvas
    updateMasterCanvas(sourceImg, orientation) {
        const masterCanvas = document.createElement('canvas');
        this.sourceImg = sourceImg;

        ImageHelper.drawImageToCanvas({ sourceImg, outputCanvas: masterCanvas, orientation },
            (widthToHeightRatio, heightToWidthRatio) => {

                this.setState({
                    sourceImg,
                    masterCanvas,
                    widthToHeightRatio,
                    heightToWidthRatio,
                    currentTool: 'crop'
                });
            })
    }

    onCropAndRotateDone(orientation, cropData) {
        ImageHelper.drawImageToCanvas({ sourceImg: this.sourceImg, outputCanvas: this.state.masterCanvas, orientation },
            () => {
                this.setState({ orientation, cropData, currentTool: 'view' });
            });
    }

    onCropAndRotateCancel() {
        this.setState({ currentTool: 'view' })
    }

    render() {
        const { currentTool, orientation, cropData, sourceImg, masterCanvas, widthToHeightRatio, heightToWidthRatio } = this.state;
        const { height, width } = this.props.size;
        const sidebarWidth = 60;
        const contentWidth = width - sidebarWidth;

        let classesForMain = 'quickArtworkMaker--mainFixed';

        if(currentTool === 'share'){
            classesForMain = 'quickArtworkMaker--mainScrollable';
        }

        return (
            <div className={'quickArtworkMaker'}>

                <div className={'quickArtworkMaker--sideBar'} style={{ width: sidebarWidth }}>
                    <QuickArtMakerTools onToolSelect={this.onToolSelect}/>
                </div>

                <div className={classesForMain}>

                    {currentTool === 'view' &&
                    <QuickArtwork height={height}
                                  width={contentWidth}
                                  isFixed={true}
                                  cropData={cropData}
                                  masterCanvas={masterCanvas}
                                  widthToHeightRatio={widthToHeightRatio}
                                  heightToWidthRatio={heightToWidthRatio}
                    />
                    }

                    {currentTool === 'crop' &&
                    <QuickCropAndRotate cropData={cropData}
                                        orientation={orientation}
                                        sourceImg={sourceImg}
                                        widthToHeightRatio={widthToHeightRatio}
                                        heightToWidthRatio={heightToWidthRatio}
                                        onCancel={this.onCropAndRotateCancel}
                                        onDone={this.onCropAndRotateDone}
                                        width={contentWidth}
                                        height={height}/>
                    }

                    {currentTool === 'share' &&
                    <QuickShare cropData={cropData}
                                masterCanvas={masterCanvas}
                                widthToHeightRatio={widthToHeightRatio}
                                heightToWidthRatio={heightToWidthRatio}
                                width={contentWidth}
                                height={height}/>
                    }

                    {currentTool === 'upload' &&
                    <QuickPhotoSelector onPhotoSelected={this.onPhotoSelect}/>
                    }
                </div>
            </div>
        );
    }
}

export default sizeMe({ monitorHeight: true })(QuickArtworkMaker);
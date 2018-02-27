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
import QuickArtMakerToolBar from "./quickArtMakerToolBar/QuickArtMakerToolBar";
import QuickShare from "./quickShare/QuickShare";
import QuickTitlesEditor from "./quickTitlesEditor/QuickTitlesEditor";
// DEV ONLY
import {TEST_SOURCE_IMG} from './DEV_TEST_SOURCE_IMG';

class QuickArtworkMaker extends Component {

    constructor(props) {
        super(props);

        this.onPhotoSelect = this.onPhotoSelect.bind(this);
        this.onToolSelect = this.onToolSelect.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.updateMasterCanvas = this.updateMasterCanvas.bind(this);
        this.onTitlesEditorDone = this.onTitlesEditorDone.bind(this);

        const cropData = { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 };
        this.state = { currentTool: 'upload', cropData, orientation: 1 };
    }

    // TEST ONLY
    componentDidMount() {
        this.sourceImg = TEST_SOURCE_IMG;
        // this.toolToShowAfterUpdate = 'add-titles';
        const titles = {title:'My Nautilus', artist:'Christopher Dennett', description:'The amazing work of a genius. Or could it be the beginning of the end.'};
        this.setState({titles});
        this.updateMasterCanvas(this.sourceImg, 1);
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
        if(!this.toolToShowAfterUpdate) this.toolToShowAfterUpdate = 'view';

        ImageHelper.drawImageToCanvas({ sourceImg, outputCanvas: masterCanvas, orientation },
            (widthToHeightRatio, heightToWidthRatio) => {

                this.setState({
                    sourceImg,
                    masterCanvas,
                    widthToHeightRatio,
                    heightToWidthRatio,
                    currentTool: this.toolToShowAfterUpdate
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

    onTitlesEditorDone(titles){
        this.setState({ titles, currentTool: 'view' })
    }

    render() {
        const { currentTool, titles, orientation, cropData, sourceImg, masterCanvas, widthToHeightRatio, heightToWidthRatio } = this.state;
        const { height, width } = this.props.size;
        const sidebarWidth = 60;
        const contentWidth = width - sidebarWidth;
        const disableEditing = !this.sourceImg;

        let classesForMain = 'quickArtworkMaker--mainFixed';

        if(currentTool === 'share'){
            classesForMain = 'quickArtworkMaker--mainScrollable';
        }

        return (
            <div className={'quickArtworkMaker'}>

                <div className={'quickArtworkMaker--sideBar'} style={{ width: sidebarWidth }}>
                    <QuickArtMakerToolBar onToolSelect={this.onToolSelect}
                                          disableEditing={disableEditing}
                                          currentTool={currentTool}/>
                </div>

                <div className={classesForMain}>

                    {currentTool === 'view' &&
                    <QuickArtwork height={height}
                                  width={contentWidth}
                                  titles={titles}
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

                    {currentTool === 'add-titles' &&
                    <QuickTitlesEditor height={height}
                                       width={contentWidth}
                                       initialTitles={titles}
                                       cropData={cropData}
                                       masterCanvas={masterCanvas}
                                       onDone={this.onTitlesEditorDone}
                                       widthToHeightRatio={widthToHeightRatio}
                                       heightToWidthRatio={heightToWidthRatio}/>
                    }


                    {currentTool === 'share' &&
                    <QuickShare cropData={cropData}
                                titles={titles}
                                masterCanvas={masterCanvas}
                                widthToHeightRatio={widthToHeightRatio}
                                heightToWidthRatio={heightToWidthRatio}
                                width={contentWidth}
                                height={height}/>
                    }

                    {currentTool === 'upload' &&
                    <QuickPhotoSelector onPhotoSelected={this.onPhotoSelect}
                                        height={height}
                                        width={contentWidth}/>
                    }
                </div>
            </div>
        );
    }
}

export default sizeMe({ monitorHeight: true })(QuickArtworkMaker);
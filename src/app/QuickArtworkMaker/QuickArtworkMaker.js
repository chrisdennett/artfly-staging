import React, { Component } from "react";
import { connect } from 'react-redux';
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
import { TEST_SOURCE_IMG } from './DEV_TEST_SOURCE_IMG';
import QuickFrameEditor from "./quickFrameEditor/QuickFrameEditor";

class QuickArtworkMaker extends Component {

    constructor(props) {
        super(props);

        this.onPhotoSelect = this.onPhotoSelect.bind(this);
        this.onToolSelect = this.onToolSelect.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.updateMasterCanvas = this.updateMasterCanvas.bind(this);
        this.onTitlesEditorDone = this.onTitlesEditorDone.bind(this);
        this.onTitlesEditorCancel = this.onTitlesEditorCancel.bind(this);
        this.onFrameDone = this.onFrameDone.bind(this);
        this.onFrameCancel = this.onFrameCancel.bind(this);

        const cropData = { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 };
        this.state = { currentTool: 'upload', cropData, orientation: 1 };
    }

    // TEST ONLY
    componentDidMount() {
        this.sourceImg = TEST_SOURCE_IMG;
        this.toolToShowAfterUpdate = 'share';
        const description = "This work encapsulates the juxtaposition of disparate strands of pain and desire.  Reflecting on the strain between perfection and hopelessness, Chris draws us into the literal and metaphorical depths of the piece.";
        const titles = { title: 'Nauti by Nature', artist: 'Christophe Dennett', description, date: 'APRIL 2009' };
        this.setState({ titles });
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
        if (!this.toolToShowAfterUpdate) this.toolToShowAfterUpdate = 'crop';

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
                this.setState({ orientation, cropData, currentTool: 'titles' });
            });
    }

    onCropAndRotateCancel() {
        this.setState({ currentTool: 'view' })
    }

    onTitlesEditorDone(titles) {
        this.setState({ titles, currentTool: 'view' })
    }

    onTitlesEditorCancel() {
        this.setState({ currentTool: 'view' })
    }

    onFrameDone(frameData) {
        console.log("frameData: ", frameData);
        this.setState({ frameData, currentTool: 'view' })
    }

    onFrameCancel() {
        this.setState({ currentTool: 'view' })
    }


    render() {
        const { currentTool, titles, frameData, orientation, cropData, sourceImg, masterCanvas, widthToHeightRatio, heightToWidthRatio } = this.state;
        const { height, width } = this.props;
        const sidebarWidth = 60;
        const contentWidth = width - sidebarWidth;
        const disableEditing = !this.sourceImg;

        let classesForMain = 'quickArtworkMaker--mainFixed';

        if (currentTool === 'share') {
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
                                  frameData={frameData}
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

                    {currentTool === 'titles' &&
                    <QuickTitlesEditor height={height}
                                       width={contentWidth}
                                       initialTitles={titles}
                                       cropData={cropData}
                                       frameData={frameData}
                                       masterCanvas={masterCanvas}
                                       onDone={this.onTitlesEditorDone}
                                       onCancel={this.onTitlesEditorCancel}
                                       widthToHeightRatio={widthToHeightRatio}
                                       heightToWidthRatio={heightToWidthRatio}/>
                    }

                    {currentTool === 'frame' &&
                    <QuickFrameEditor height={height}
                                      width={contentWidth}
                                      titles={titles}
                                      frameData={frameData}
                                      cropData={cropData}
                                      masterCanvas={masterCanvas}
                                      onDone={this.onFrameDone}
                                      onCancel={this.onFrameCancel}
                                      widthToHeightRatio={widthToHeightRatio}
                                      heightToWidthRatio={heightToWidthRatio}/>
                    }


                    {currentTool === 'share' &&
                    <QuickShare cropData={cropData}
                                titles={titles}
                                frameData={frameData}
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

const mapStateToProps = (state) => {
    let width = 100, height = 100;
    if (state.ui.windowSize) {
        width = state.ui.windowSize.windowWidth;
        height = state.ui.windowSize.windowHeight;
    }

    return { width, height }
};

export default connect(mapStateToProps)(QuickArtworkMaker);
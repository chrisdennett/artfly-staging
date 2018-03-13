import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './quickArtworkMaker_styles.css';
// helpers
import * as ImageHelper from "../ArtStudio/ImageHelper";
import DefaultArtworkDataGenerator from "./DefaultArtworkDataGenerator";
// comps
import QuickPhotoSelector from "./quickPhotoSelector/QuickPhotoSelector";
import QuickArtwork from "./quickArtwork/QuickArtwork";
import QuickCropAndRotate from "./quickCropAndRotate/QuickCropAndRotate";
import QuickArtMakerToolBar from "./quickArtMakerToolBar/QuickArtMakerToolBar";
import QuickShare from "./quickShare/QuickShare";
import QuickTitlesEditor from "./quickTitlesEditor/QuickTitlesEditor";
import QuickFrameEditor from "./quickFrameEditor/QuickFrameEditor";
// DEV ONLY
import { TEST_SOURCE_IMG } from './DEV_TEST_SOURCE_IMG';
import QuickRoomEditor from "./quickRoomEditor/QuickRoomEditor";

// Constants
const defaultArtworkData = DefaultArtworkDataGenerator();

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
        this.onRoomDone = this.onRoomDone.bind(this);
        this.onRoomCancel = this.onRoomCancel.bind(this);

        this.state = { currentTool: 'upload', artworkData: defaultArtworkData };
    }

    // TEST ONLY
    componentDidMount() {
        this.sourceImg = TEST_SOURCE_IMG;
        this.toolToShowAfterUpdate = 'room';
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

                this.setState((state) => {
                    return {
                        sourceImg,
                        masterCanvas,
                        artworkData: { ...state.artworkData, widthToHeightRatio, heightToWidthRatio },
                        currentTool: this.toolToShowAfterUpdate
                    }
                });
            })
    }

    onCropAndRotateDone(orientation, cropData) {
        ImageHelper.drawImageToCanvas({ sourceImg: this.sourceImg, outputCanvas: this.state.masterCanvas, orientation },
            () => {
                this.setState((state) => {
                    return {
                        artworkData: { ...state.artworkData, orientation, cropData },
                        currentTool: 'view'
                    }
                });
            });
    }

    onCropAndRotateCancel() {
        this.setState({ currentTool: 'view' })
    }

    onTitlesEditorDone(titlesData) {
        this.setState((state) => {
            return {
                artworkData: { ...state.artworkData, titlesData },
                currentTool: 'view'
            }
        })
    }

    onTitlesEditorCancel() {
        this.setState({ currentTool: 'view' })
    }

    onFrameDone(frameData) {
        this.setState((state) => {
            return {
                artworkData: { ...state.artworkData, frameData },
                currentTool: 'view'
            }
        })
    }

    onFrameCancel() {
        this.setState({ currentTool: 'view' })
    }

    onRoomDone(roomData) {
        this.setState((state) => {
            return {
                artworkData: { ...state.artworkData, roomData },
                currentTool: 'view'
            }
        })
    }

    onRoomCancel() {
        this.setState({ currentTool: 'view' })
    }

    render() {
        const { currentTool, artworkData, sourceImg, masterCanvas } = this.state;
        const { height, width } = this.props;
        const sidebarWidth = 60;
        const disableEditing = !this.sourceImg;

        const showSideControls = true; //currentTool !== 'frame';
        const contentWidth = showSideControls ? width - sidebarWidth : width;

        let classesForMain = 'quickArtworkMaker--mainFixed';

        if (currentTool === 'share') {
            classesForMain = 'quickArtworkMaker--mainScrollable';
        }

        return (
            <div className={'quickArtworkMaker'}>

                {showSideControls &&
                <div className={'quickArtworkMaker--sideBar'} style={{ width: sidebarWidth }}>
                    <QuickArtMakerToolBar onToolSelect={this.onToolSelect}
                                          disableEditing={disableEditing}
                                          currentTool={currentTool}/>
                </div>
                }

                <div className={classesForMain}>

                    {currentTool === 'view' &&
                    <QuickArtwork height={height}
                                  width={contentWidth}
                                  isFixed={true}
                                  artworkData={artworkData}
                                  masterCanvas={masterCanvas}
                    />
                    }

                    {currentTool === 'crop' &&
                    <QuickCropAndRotate sourceImg={sourceImg}
                                        artworkData={artworkData}
                                        onCancel={this.onCropAndRotateCancel}
                                        onDone={this.onCropAndRotateDone}
                                        width={contentWidth}
                                        height={height}/>
                    }

                    {currentTool === 'titles' &&
                    <QuickTitlesEditor height={height}
                                       width={contentWidth}
                                       artworkData={artworkData}
                                       masterCanvas={masterCanvas}
                                       onDone={this.onTitlesEditorDone}
                                       onCancel={this.onTitlesEditorCancel}
                    />
                    }

                    {currentTool === 'frame' &&
                    <QuickFrameEditor height={height}
                                      width={contentWidth}
                                      artworkData={artworkData}
                                      masterCanvas={masterCanvas}
                                      onDone={this.onFrameDone}
                                      onCancel={this.onFrameCancel}/>
                    }

                    {currentTool === 'room' &&
                    <QuickRoomEditor height={height}
                                      width={contentWidth}
                                      artworkData={artworkData}
                                      masterCanvas={masterCanvas}
                                      onDone={this.onRoomDone}
                                      onCancel={this.onRoomCancel}/>
                    }

                    {currentTool === 'share' &&
                    <QuickShare masterCanvas={masterCanvas}
                                artworkData={artworkData}
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
import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './quickArtworkMaker_styles.css';
// actions
import { addArtwork, getArtworkDataOnce } from "../../actions/UserDataActions";
// helpers
import * as ImageHelper from "../global/ImageHelper";
// comps
import QuickPhotoSelector from "./quickPhotoSelector/QuickPhotoSelector";
import QuickArtwork from "./quickArtwork/QuickArtwork";
import QuickCropAndRotate from "./quickCropAndRotate/QuickCropAndRotate";
import QuickArtMakerToolBar from "./quickArtMakerToolBar/QuickArtMakerToolBar";
import QuickShare from "./quickShare/QuickShare";
import QuickTitlesEditor from "./quickTitlesEditor/QuickTitlesEditor";
import QuickFrameEditor from "./quickFrameEditor/QuickFrameEditor";
import QuickRoomEditor from "./quickRoomEditor/QuickRoomEditor";
// DEV ONLY
// import { TEST_SOURCE_IMG } from './DEV_TEST_SOURCE_IMG';

class QuickArtworkMaker extends Component {

    constructor(props) {
        super(props);

        this.onToolSelect = this.onToolSelect.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.updateMasterCanvas = this.updateMasterCanvas.bind(this);
        this.onEditDone = this.onEditDone.bind(this);

        this.state = { currentTool: 'upload' };
    }

    // TEST ONLY
    /*componentDidMount() {
        this.toolToShowAfterUpdate = 'room';
        this.updateMasterCanvas(TEST_SOURCE_IMG, 1);
    }*/

    // Left nav tool selection
    onToolSelect(toolName) {
        this.setState({ currentTool: toolName })
    }

    // Use Master canvas
    updateMasterCanvas(sourceImg, orientation) {
        const masterCanvas = document.createElement('canvas');
        if (!this.toolToShowAfterUpdate) this.toolToShowAfterUpdate = 'crop';

        ImageHelper.drawImageToCanvas({ sourceImg, outputCanvas: masterCanvas, orientation },
            (widthToHeightRatio, heightToWidthRatio) => {

                this.setState((state) => {
                    return {
                        sourceImg,
                        masterCanvas,

                        artworkData: { ...state.artworkData, widthToHeightRatio, heightToWidthRatio, orientation },
                        currentTool: this.toolToShowAfterUpdate
                    }
                });
            })
    }

    onCropAndRotateDone(newData) {
        // if the orientation is the same, just update the artwork data
        if (newData.orientation === this.props.artworkData.orientation) {
            this.props.onArtworkDataChange(newData);
        }
        // otherwise the master canvas needs to be updated as well
        else{
            this.props.onCanvasOrientationChange(newData);
        }
    }

    onCropAndRotateCancel() {
        this.setState({ currentTool: 'view' })
    }

    onEditDone() {
        this.setState({ currentTool: 'view' })
    }

    render() {
        const { currentTool } = this.state;
        const {
                  height, width, user, artworkData,
                  sourceImg, masterCanvas,
                  onArtworkDataChange, onArtworkSave, onPhotoSelected
              } = this.props;

        const sidebarWidth = 60;
        const disableEditing = !sourceImg;

        const { loginStatus } = user;
        const showSideControls = true; //currentTool !== 'frame';
        const contentWidth = showSideControls ? width - sidebarWidth : width;

        let classesForMain = 'quickArtworkMaker--mainFixed';

        if (currentTool === "share") {
            classesForMain = 'quickArtworkMaker--mainScrollable';
        }

        const hideArtwork = currentTool === 'crop' || currentTool === 'upload' || currentTool === 'share';

        return (
            <div className={'quickArtworkMaker'}>

                {showSideControls &&
                <div className={'quickArtworkMaker--sideBar'} style={{ width: sidebarWidth }}>
                    <QuickArtMakerToolBar onToolSelect={this.onToolSelect}
                                          showArtworkControls={loginStatus === 'loggedIn'}
                                          disableEditing={disableEditing}
                                          onSave={onArtworkSave}
                                          currentTool={currentTool}/>
                </div>
                }

                <div className={classesForMain}>

                    {!hideArtwork &&
                    <QuickArtwork height={height}
                                  width={contentWidth}
                                  isFixed={true}
                                  artworkData={artworkData}
                                  masterCanvas={masterCanvas}
                    />
                    }

                    {currentTool === 'upload' &&
                    <QuickPhotoSelector onPhotoSelected={onPhotoSelected}
                                        height={height}
                                        width={contentWidth}/>
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
                                       titlesData={artworkData.titlesData}
                                       onDataChange={onArtworkDataChange}
                                       onDone={this.onEditDone}
                    />
                    }

                    {currentTool === 'frame' &&
                    <QuickFrameEditor height={height}
                                      width={contentWidth}
                                      frameData={artworkData.frameData}
                                      onDataChange={onArtworkDataChange}
                                      onDone={this.onEditDone}/>
                    }

                    {currentTool === 'room' &&
                    <QuickRoomEditor height={height}
                                     width={contentWidth}
                                     roomData={artworkData.roomData}
                                     onDataChange={onArtworkDataChange}
                                     onDone={this.onEditDone}/>
                    }

                    {currentTool === 'share' &&
                    <QuickShare masterCanvas={masterCanvas}
                                artworkData={artworkData}
                                width={contentWidth}
                                height={height}/>
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

    return {
        artworks: state.artworks,
        user: state.user,
        width,
        height
    }
};

const mapActionsToProps = { addArtwork, getArtworkDataOnce };

export default connect(mapStateToProps, mapActionsToProps)(QuickArtworkMaker);

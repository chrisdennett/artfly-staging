import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './quickArtworkMaker_styles.css';
// actions
import { addArtwork, getArtworkDataOnce } from "../../actions/UserDataActions";
// helpers
import * as ImageHelper from "../global/ImageHelper";
import DefaultArtworkDataGenerator from "./DefaultArtworkDataGenerator";
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
        this.onEditDone = this.onEditDone.bind(this);
        this.onArtworkDataChange = this.onArtworkDataChange.bind(this);
        this.onArtworkSaveClick = this.onArtworkSaveClick.bind(this);

        this.state = { currentTool: 'upload', artworkData: defaultArtworkData };
    }

    componentWillMount() {
        const { artworkId } = this.props;

        // If there's an artwork id in the url, load in the artwork
        if (artworkId) {
            this.props.getArtworkDataOnce(artworkId, (artworkData) => {
                this.setState({ artworkData }, () => {
                    let img = new Image();
                    img.src = artworkData.url;
                    img.onload = () => {
                        this.updateMasterCanvas(img, artworkData.orientation)
                    }
                })
            })

        }
    }

    // TEST ONLY
    /*componentDidMount() {
        this.sourceImg = TEST_SOURCE_IMG;
        this.toolToShowAfterUpdate = 'room';
        this.updateMasterCanvas(this.sourceImg, 1);
    }*/

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

    onEditDone() {
        this.setState({ currentTool: 'view' })
    }

    onArtworkDataChange(newPartialData) {
        this.setState((state) => {
            return {
                artworkData: { ...state.artworkData, ...newPartialData }
            }
        })
    }

    onArtworkSaveClick() {
        const { user } = this.props;

        const { artworkData } = this.state;
        const { orientation, cropData } = artworkData;
        this.getImageBlob(this.sourceImg, orientation, cropData, 3000, (maxBlob) => {
            this.props.addArtwork("picture", user.uid, maxBlob, artworkData, (saveReturnData) => {
                console.log("saveReturnData: ", saveReturnData);
            });
        })
    }

    getImageBlob(sourceImg, rotation, cropData, maxSize, callback) {
        const canvas = document.createElement('canvas');

        ImageHelper.drawToCanvas({
            sourceCanvas: sourceImg,
            outputCanvas: canvas,
            orientation: rotation,
            cropPercents: cropData,
            maxOutputCanvasWidth: maxSize,
            maxOutputCanvasHeight: maxSize
        }, (widthToHeightRatio, heightToWidthRatio) => {

            canvas.toBlob((canvasBlobData) => {
                callback(canvasBlobData, widthToHeightRatio, heightToWidthRatio)
            }, 'image/jpeg', 0.95);

        });
    }

    render() {
        const { currentTool, artworkData, sourceImg, masterCanvas } = this.state;
        const { height, width, user } = this.props;

        const sidebarWidth = 60;
        const disableEditing = !sourceImg;

        // console.log("user: ", user);
        const { loginStatus } = user;
        const showSideControls = true; //currentTool !== 'frame';
        const contentWidth = showSideControls ? width - sidebarWidth : width;

        let classesForMain = 'quickArtworkMaker--mainFixed';

        if (currentTool === 'share') {
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
                                          onSave={this.onArtworkSaveClick}
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
                                       onDataChange={this.onArtworkDataChange}
                                       onDone={this.onEditDone}
                    />
                    }

                    {currentTool === 'frame' &&
                    <QuickFrameEditor height={height}
                                      width={contentWidth}
                                      frameData={artworkData.frameData}
                                      onDataChange={this.onArtworkDataChange}
                                      onDone={this.onEditDone}/>
                    }

                    {currentTool === 'room' &&
                    <QuickRoomEditor height={height}
                                     width={contentWidth}
                                     roomData={artworkData.roomData}
                                     onDataChange={this.onArtworkDataChange}
                                     onDone={this.onEditDone}/>
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

const mapActionsToProps = { addArtwork, getArtworkDataOnce };

export default connect(mapStateToProps, mapActionsToProps)(QuickArtworkMaker);

import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './artworkOptions_styles.css';
// actions
import { addArtwork, getArtworkDataOnce } from "../../actions/UserDataActions";
// comps
import QuickPhotoSelector from "./photoSelector/PhotoSelector";
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
// import ArtworkOptionsToolBar from "./artworkOptionsToolBar/ArtworkOptionsToolBar";
import QuickShare from "./sharingOptions/SharingOptions";
import TitlesEditor from "./titlesEditor/TitlesEditor";
import FrameEditor from "./frameEditor/FrameEditor";
import RoomEditor from "./roomEditor/RoomEditor";

class ArtworkOptions extends Component {

    constructor(props) {
        super(props);

        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.onCropAndRotateCancel = this.onCropAndRotateCancel.bind(this);
        this.onEditDone = this.onEditDone.bind(this);
        // this.onPhotoSelected = this.onPhotoSelected.bind(this);

        // this.state = { currentTool: 'view' };
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

        // this.setState({ currentTool: 'view' });
    }

    onCropAndRotateCancel() {
        // this.setState({ currentTool: 'view' });
    }

    onEditDone() {
        this.props.onCloseCurrentTool();
    }

    render() {
        const {   height, width, artworkData,
                  sourceImg, masterCanvas, currentTool,
                  onArtworkDataChange  } = this.props;

        const sidebarWidth = 60;
        const contentWidth = width - sidebarWidth;

        let classesForMain = 'quickArtworkMaker--mainFixed';

        if (currentTool === "share") {
            classesForMain = 'quickArtworkMaker--mainScrollable';
        }

        return (
            <div className={'quickArtworkMaker'}>

                <div className={classesForMain}>

                    {currentTool === 'crop' &&
                    <CropAndRotateEditor sourceImg={sourceImg}
                                         artworkData={artworkData}
                                         onCancel={this.onEditDone}
                                         onDone={this.onCropAndRotateDone}
                                         width={contentWidth}
                                         height={height}/>
                    }

                    {currentTool === 'titles' &&
                    <TitlesEditor height={height}
                                  width={contentWidth}
                                  titlesData={artworkData.titlesData}
                                  onDataChange={onArtworkDataChange}
                                  onDone={this.onEditDone}
                    />
                    }

                    {currentTool === 'frame' &&
                    <FrameEditor height={height}
                                 width={contentWidth}
                                 frameData={artworkData.frameData}
                                 onDataChange={onArtworkDataChange}
                                 onDone={this.onEditDone}/>
                    }

                    {currentTool === 'room' &&
                    <RoomEditor height={height}
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

export default connect(mapStateToProps, mapActionsToProps)(ArtworkOptions);

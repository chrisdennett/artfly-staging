import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './artworkOptions_styles.css';
// actions
import { addArtwork, getArtworkDataOnce } from "../../actions/UserDataActions";
// comps
// import QuickPhotoSelector from "./photoSelector/PhotoSelector";
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
// import ArtworkOptionsToolBar from "./artworkOptionsToolBar/ArtworkOptionsToolBar";
// import QuickShare from "./sharingOptions/SharingOptions";
import TitlesEditor from "./titlesEditor/TitlesEditor";
import FrameSizeOptions from "./frameEditor/FrameSizeOptions";
import RoomEditor from "./roomEditor/RoomEditor";
import DeleteArtworkPanel from "./deleteArtworkPanel/DeleteArtworkPanel";
import FrameColourOptions from "./frameEditor/FrameColourOptions";

class ArtworkOptions extends Component {

    constructor(props) {
        super(props);

        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
    }

    onCropAndRotateDone(newData) {
        // if the orientation is the same, just update the artwork data
        if (newData.orientation === this.props.artworkData.orientation) {
            this.props.onArtworkDataChange(newData);
        }
        // otherwise the master canvas needs to be updated as well
        else {
            this.props.onCanvasOrientationChange(newData);
        }
        this.props.onCloseCurrentTool();
    }

    render() {
        const {
                  height, width, artworkData,
                  sourceImg, currentTool,
                  onArtworkDataChange, onCloseCurrentTool, onArtworkDelete
              } = this.props;

        return (
            <div className={'artworkOptions'}>

                {currentTool === 'delete' &&
                <DeleteArtworkPanel artworkId={artworkData.artworkId}
                                    onArtworkDeleteCancel={onCloseCurrentTool}
                                    onArtworkDelete={onArtworkDelete}/>
                }

                {currentTool === 'crop' &&
                <CropAndRotateEditor sourceImg={sourceImg}
                                     artworkData={artworkData}
                                     onCancel={onCloseCurrentTool}
                                     onDone={this.onCropAndRotateDone}
                                     width={width}
                                     height={height}/>
                }

                {currentTool === 'titles' &&
                <TitlesEditor height={height}
                              width={width}
                              titlesData={artworkData.titlesData}
                              onDataChange={onArtworkDataChange}
                              onDone={onCloseCurrentTool}
                />
                }

                {currentTool === 'frame' &&
                <FrameSizeOptions frameData={artworkData.frameData}
                                  onDataChange={onArtworkDataChange}/>
                }

                {currentTool === 'frameColour' &&
                <FrameColourOptions frameData={artworkData.frameData}
                                  onDataChange={onArtworkDataChange}/>
                }

                {currentTool === 'room' &&
                <RoomEditor height={height}
                            width={width}
                            roomData={artworkData.roomData}
                            onDataChange={onArtworkDataChange}
                            onDone={onCloseCurrentTool}/>
                }

                {/*{currentTool === 'share' &&
                    <QuickShare masterCanvas={masterCanvas}
                                artworkData={artworkData}
                                width={contentWidth}
                                height={height}/>
                    }*/}
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

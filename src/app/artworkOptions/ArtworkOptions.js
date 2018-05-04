import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './artworkOptions_styles.css';
// actions
import { addArtwork, getArtworkDataOnce } from "../../actions/UserDataActions";
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import FrameSizeOptions from "./frameEditor/FrameSizeOptions";
import FrameColourOptions from "./frameEditor/FrameColourOptions";
import PeopleOptions from "./peopleOptions/PeoplesOptions";
import ArtworkOptionsToolBar from "./artworkOptionsToolBar/ArtworkOptionsToolBar";

class ArtworkOptions extends Component {

    constructor(props) {
        super(props);

        // this.state = { currentOptionIndex: 3 };

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
    }


    render() {
        const {
                  currentOptionIndex, onToolSelect, artworkOptions,
                  height, width, artworkData, style,
                  sourceImg, onArtworkDataChange, onCloseCurrentTool
              } = this.props;

        return (
            <div className={'artworkOptions'} style={style}>

                {currentOptionIndex === 0 &&
                <FrameSizeOptions frameData={artworkData.frameData}
                                  onDataChange={onArtworkDataChange}/>
                }

                {currentOptionIndex === 1 &&
                <FrameColourOptions frameData={artworkData.frameData}
                                    onDataChange={onArtworkDataChange}/>
                }

                {currentOptionIndex === 2 &&
                <PeopleOptions people={artworkData.people}
                               onDataChange={onArtworkDataChange}/>
                }

                {currentOptionIndex === 3 &&
                <CropAndRotateEditor sourceImg={sourceImg}
                                     artworkData={artworkData}
                                     onCancel={onCloseCurrentTool}
                                     onDone={this.onCropAndRotateDone}
                                     width={width}
                                     height={height}/>
                }

                <ArtworkOptionsToolBar
                    options={artworkOptions}
                    onOptionSelect={onToolSelect}
                    selectedOptionIndex={currentOptionIndex}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        artworks: state.artworks,
        user: state.user
    }
};

const mapActionsToProps = { addArtwork, getArtworkDataOnce };

export default connect(mapStateToProps, mapActionsToProps)(ArtworkOptions);

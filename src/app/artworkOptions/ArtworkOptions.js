import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './artworkOptions_styles.css';
// actions
import { addArtwork, getArtworkDataOnce } from "../../actions/UserDataActions";
// images
import IconFrameSize from './../images/icons/frame-size.png';
import IconFrameColour from './../images/icons/frame-colour.png';
import IconPeople from './../images/icons/people.png';
import IconCropRotate from './../images/icons/crop-rotate.png';
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import FrameSizeOptions from "./frameEditor/FrameSizeOptions";
import FrameColourOptions from "./frameEditor/FrameColourOptions";
import PeopleOptions from "./peopleOptions/PeoplesOptions";
import ArtworkOptionsToolBar from "./artworkOptionsToolBar/ArtworkOptionsToolBar";

const artworkOptions = {
    frame: {
        index: 0,
        name: 'Frame Size',
        icon: IconFrameSize
    },
    frameColour: {
        index: 1,
        name: 'Frame Colour',
        icon: IconFrameColour
    },
    people: {
        index: 2,
        name: 'People',
        icon: IconPeople
    },
    crop: {
        index: 3,
        name: 'Crop & Rotate',
        icon: IconCropRotate
    }
};

class ArtworkOptions extends Component {

    constructor(props) {
        super(props);

        this.state = { currentOptionIndex: 2 };

        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);
        this.onToolSelect = this.onToolSelect.bind(this);
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

    onToolSelect(selectedIndex) {
        this.setState({ currentOptionIndex: selectedIndex })
    }

    render() {
        const { currentOptionIndex } = this.state;
        const {
                  height, width, artworkData,
                  sourceImg, onArtworkDataChange, onCloseCurrentTool
              } = this.props;

        return (
            <div className={'artworkOptions'}>

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
                    onOptionSelect={this.onToolSelect}
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

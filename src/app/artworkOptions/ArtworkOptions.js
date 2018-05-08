import React, { Component } from "react";
// styles
import './artworkOptions_styles.css';
// actions
// import { addArtwork, getArtworkDataOnce } from "../../actions/UserDataActions";
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import FrameSizeOptions from "./frameEditor/FrameSizeOptions";
import FrameColourOptions from "./frameEditor/FrameColourOptions";
import PeopleOptions from "./peopleOptions/PeoplesOptions";
import ArtworkOptionsToolBar from "./artworkOptionsToolBar/ArtworkOptionsToolBar";

class ArtworkOptions extends Component {

    render() {
        const {
                  currentOptionIndex, onToolSelect, artworkOptions,
                  artworkData, style, sourceImg, onArtworkDataChange
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
                                     orientation={artworkData.orientation}
                                     cropData={artworkData.cropData}
                                     onDataChange={onArtworkDataChange}/>
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

export default ArtworkOptions;

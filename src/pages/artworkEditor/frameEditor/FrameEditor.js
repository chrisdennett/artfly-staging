import React, { Component } from "react";
// ui
import { Slider } from 'rmwc/Slider';
import { Typography } from 'rmwc/Typography';
// styles
import './frameEditor_styles.css';
// comps
import GalleryArtwork from "../../gallery/GalleryArtwork";
import LoadingThing from "../../../components/loadingThing/LoadingThing";
import ColourPicker from "./ColourPicker";
import { EditAppBar } from "../../../components/appBar/AppBar";

class FrameEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onFrameColourChange = this.onFrameColourChange.bind(this);
        this.onMountColourChange = this.onMountColourChange.bind(this);
        this.onFrameThicknessChange = this.onFrameThicknessChange.bind(this);
        this.onMountThicknessChange = this.onMountThicknessChange.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onSaveClick(){
        const {
                  mountColour: initialMountColour, frameColour: initialFrameColour,
                  frameThicknessDecimal: initialFrameThickness, mountThicknessDecimal: initialMountThickness
              } = this.props.artworkData.frameData;

        const { frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour } = this.state;

        const currentFrameColour = frameColour ? frameColour : initialFrameColour;
        const currentMountColour = mountColour ? mountColour : initialMountColour;
        const currentFrameThickness = frameThicknessDecimal ? frameThicknessDecimal : initialFrameThickness;
        const currentMountThickness = mountThicknessDecimal ? mountThicknessDecimal : initialMountThickness;

        const mergedArtworkData = {
            ...this.props.artworkData,
            frameData: {
                frameColour: currentFrameColour,
                mountColour: currentMountColour,
                frameThicknessDecimal: currentFrameThickness,
                mountThicknessDecimal: currentMountThickness
            }
        };

        this.props.onSaveClick(mergedArtworkData);
    }

    onFrameColourChange({ hue, saturation, lightness }) {
        this.setState({ frameColour: { hue, saturation, lightness } });
    };

    onMountColourChange({ hue, saturation, lightness }) {
        this.setState({ mountColour: { hue, saturation, lightness } });
    };

    onFrameThicknessChange(frameThicknessDecimal) {
        this.setState({ frameThicknessDecimal });
    };

    onMountThicknessChange(mountThicknessDecimal) {
        this.setState({ mountThicknessDecimal });
    };

    render() {
        if (!this.props.artworkData || !this.props.artworkData.frameData) {
            return <LoadingThing/>
        }

        const {
                  mountColour: initialMountColour, frameColour: initialFrameColour,
                  frameThicknessDecimal: initialFrameThickness, mountThicknessDecimal: initialMountThickness
              } = this.props.artworkData.frameData;

        const { frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour } = this.state;

        const currentFrameColour = frameColour ? frameColour : initialFrameColour;
        const currentMountColour = mountColour ? mountColour : initialMountColour;
        const currentFrameThickness = frameThicknessDecimal ? frameThicknessDecimal : initialFrameThickness;
        const currentMountThickness = mountThicknessDecimal ? mountThicknessDecimal : initialMountThickness;

        const mergedArtworkData = {
            ...this.props.artworkData,
            frameData: {
                frameColour: currentFrameColour,
                mountColour: currentMountColour,
                frameThicknessDecimal: currentFrameThickness,
                mountThicknessDecimal: currentMountThickness
            }
        };

        return (
            <div className={'labApp'}>

                <EditAppBar title={'Colour Splitter'}
                            hasChanges={true}
                            onCloseClick={this.props.onCloseClick}
                            onSaveClick={this.onSaveClick}
                            onCancelClick={() => this.setState({
                                frameColour: null, mountColour: null,
                                frameThicknessDecimal: null, mountThicknessDecimal: null
                            })}/>

                <GalleryArtwork artworkData={mergedArtworkData}/>

                <div className={'frameEditor--controls'}>

                    <div className={'frameEditor--controls--set'}>
                        <Typography use={'button'} tag={'div'} className={'frameEditor--controls--set--label'}>
                            Frame:
                        </Typography>
                        <ColourPicker onChange={this.onFrameColourChange}
                                      colour={currentFrameColour}/>
                        <Slider
                            min={0} max={0.2}
                            value={currentFrameThickness}
                            onInput={e => this.onFrameThicknessChange(e.detail.value)}
                        />
                    </div>

                    <div className={'frameEditor--controls--set'}>

                        <Typography use={'button'} tag={'div'} className={'frameEditor--controls--set--label'}>
                            Mount:
                        </Typography>

                        <ColourPicker onChange={this.onMountColourChange} colour={currentMountColour}/>

                        <Slider
                            min={0} max={0.2}
                            value={currentMountThickness}
                            onInput={e => this.onMountThicknessChange(e.detail.value)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FrameEditor;

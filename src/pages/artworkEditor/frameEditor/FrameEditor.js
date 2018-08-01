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

class FrameEditor extends Component {

    constructor(props) {
        super(props);

        this.onFrameColourChange = this.onFrameColourChange.bind(this);
        this.onMountColourChange = this.onMountColourChange.bind(this);
        this.onFrameThicknessChange = this.onFrameThicknessChange.bind(this);
        this.onMountThicknessChange = this.onMountThicknessChange.bind(this);

    }

    onFrameColourChange({ hue, saturation, lightness }) {
        const newFrameData = { ...this.props.artworkData.frameData, frameColour: { hue, saturation, lightness } };
        this.props.onDataChange({ frameData: newFrameData });
    };

    onMountColourChange({ hue, saturation, lightness }) {
        const newFrameData = { ...this.props.artworkData.frameData, mountColour: { hue, saturation, lightness } };
        this.props.onDataChange({ frameData: newFrameData });
    };

    onFrameThicknessChange(frameThicknessDecimal) {
        const newFrameData = { ...this.props.artworkData.frameData, frameThicknessDecimal };
        this.props.onDataChange({ frameData: newFrameData });
    };

    onMountThicknessChange(mountThicknessDecimal) {
        const newFrameData = { ...this.props.artworkData.frameData, mountThicknessDecimal };
        this.props.onDataChange({ frameData: newFrameData });
    };

    render() {
        const { artworkData } = this.props;

        if (!artworkData || !artworkData.frameData) {
            return <LoadingThing/>
        }

        return (
            <div className={'frameEditor'}>

                <GalleryArtwork artworkData={artworkData}/>

                <div className={'frameEditor--controls'}>

                    <div className={'frameEditor--controls--set'}>
                        <Typography use={'button'} tag={'div'} className={'frameEditor--controls--set--label'}>
                            Frame:
                        </Typography>
                        <ColourPicker onChange={this.onFrameColourChange} colour={artworkData.frameData.frameColour}/>
                        <Slider
                            min={0} max={0.2}
                            value={artworkData.frameData.frameThicknessDecimal}
                            onInput={e => this.onFrameThicknessChange(e.detail.value)}
                        />
                    </div>

                    <div className={'frameEditor--controls--set'}>

                        <Typography use={'button'} tag={'div'} className={'frameEditor--controls--set--label'}>
                            Mount:
                        </Typography>

                        <ColourPicker onChange={this.onMountColourChange} colour={artworkData.frameData.mountColour}/>

                        <Slider
                            min={0} max={0.2}
                            value={artworkData.frameData.mountThicknessDecimal}
                            onInput={e => this.onMountThicknessChange(e.detail.value)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default FrameEditor;
import React, { Component } from "react";
// ui
import { Slider } from 'rmwc/Slider';
// styles
import './frameSizeEditor_styles.css';
// comps
import GalleryArtwork from "../../gallery/GalleryArtwork";
import LoadingThing from "../../loadingThing/LoadingThing";

class FrameSizeEditor extends Component {

    onFrameThicknessChange = (frameThicknessDecimal) => {
        const newFrameData = { ...this.props.artworkData.frameData, frameThicknessDecimal };
        this.props.onDataChange({ frameData: newFrameData });
    };

    onMountThicknessChange = (mountThicknessDecimal) => {
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
                    Frame width:
                    <Slider
                        min={0} max={0.2}
                        value={artworkData.frameData.frameThicknessDecimal}
                        onInput={e => this.onFrameThicknessChange(e.detail.value)}
                    />

                    Mount width:
                    <Slider
                        min={0} max={0.2}
                        value={artworkData.frameData.mountThicknessDecimal}
                        onInput={e => this.onMountThicknessChange(e.detail.value)}
                    />
                </div>
            </div>
        );
    }
}

export default FrameSizeEditor;
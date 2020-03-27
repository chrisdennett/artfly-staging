import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './imageAdder_styles.css';
// ui
import { Button } from 'rmwc/Button';
// selectors
import { getDeleteAfterDate, getMaxArtworksAllowed, getTotalUserArtworks } from "../../selectors/Selectors";
// actions
import { addNewArtwork } from "../../actions/SaveArtworkActions";
import { UpdateUrl } from "../../actions/UrlActions";
// helpers
import { copyToCanvas, createOrientatedCanvas } from "../canvasCreators";
import { GetImage } from "../../components/global/UTILS";
// comps
import LoadingThing from "../../components/loadingThing/LoadingThing";
import PhotoSelector from "../../components/photoSelector/PhotoSelector";

class ImageAdder extends Component {

    constructor(props) {
        super(props);

        this.state = { img: null };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidMount() {
        this.updateCanvas()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateCanvas();
    }

    updateCanvas() {
        const { sourceCanvas } = this.props;
        if (!sourceCanvas) return;

        copyToCanvas(sourceCanvas, this.canvas);
    }

    onPhotoSelected(imgFile) {
        GetImage(imgFile, (img, orientation) => {

            const orientatedCanvas = createOrientatedCanvas(img, orientation);
            this.props.onNewSourceImageSelected(orientatedCanvas);
        })
    }

    render() {
        const { totalArtworksFetchProgress } = this.props;

        if (totalArtworksFetchProgress !== 'fetched') {
            return <LoadingThing/>
        }

        return (
            <div className={'labApp artworkEditorBg'}>

                <div className={'labApp--content'} style={{position:'relative'}}>
                    <div className={'imageAdder--canvasPhotoSelectorHolder'}>
                        <PhotoSelector onPhotoSelected={(img) => this.onPhotoSelected(img)}/>
                    </div>
                    <canvas ref={canvas => this.canvas = canvas}
                            className={'rgb--output-canvas'}/>

                </div>

                <div className={'editor--controls'}>
                    <div className={'editor--controls--inner'}>

                        <PhotoSelector onPhotoSelected={(img) => this.onPhotoSelected(img)}>
                            <Button raised style={{ pointerEvents: 'none' }}>Replace Photo</Button>
                        </PhotoSelector>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        deleteAfterDate: getDeleteAfterDate(state),
        totalArtworksFetchProgress: state.dataFetching.userArtworks,
        totalUserArtworks: getTotalUserArtworks(state),
        maxArtworksAllowed: getMaxArtworksAllowed(state)
    }
);
export default connect(mapStateToProps, { addNewArtwork, UpdateUrl })(ImageAdder);
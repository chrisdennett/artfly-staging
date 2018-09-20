import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './artworkEditor_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import { updateArtworkAndImage, updateArtwork } from '../../actions/SaveArtworkActions';
// selectors
import { getArtwork } from "../../selectors/Selectors";
// constants
import { DEFAULT_COLOUR_SPLITTER_VALUES } from "../../GLOBAL_CONSTANTS";
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import FrameEditor from "./frameEditor/FrameEditor";
import ColourSplitter from "./colourSplitterEditor/ColourSplitterEditor";
import LoadingThing from "../../components/loadingThing/LoadingThing";

class ArtworkEditor extends Component {

    // ArtworkEditor should determine what edit is required and display the necessary editor
    // It could also apply all the edits before the current one and pass in the canvas.
    // On save it could apply all the edits after the current one when I add in the ability
    // to change previous edits.

    constructor(props) {
        super(props);

        this.state = { sourceImg: null };

        this.onClose = this.onClose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.updateArtworkAndImage = this.updateArtworkAndImage.bind(this);
    }

    componentDidMount() {
        document.body.classList.toggle('no-scroll-bars', true);
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    onClose() {
        const { galleryId, artworkId } = this.props;
        this.props.UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`, 'ArtworkEditor > onClose');
    }

    onSave(newArtworkData) {
        const { artworkId } = newArtworkData;
        this.props.updateArtwork(artworkId, newArtworkData, () => {
            this.props.UpdateUrl(`/gallery/galleryId_${this.props.galleryId}_galleryId/artworkId_${artworkId}_artworkId`);
        });

    }

    updateArtworkAndImage(canvas, newArtworkData) {
        const { artworkId } = newArtworkData;
        this.props.updateArtworkAndImage(canvas, newArtworkData, artworkId, true, () => {
            this.props.UpdateUrl(`/gallery/galleryId_${this.props.galleryId}_galleryId/artworkId_${artworkId}_artworkId`);
        });
    }

    render() {
        const { currentArtwork, editor } = this.props;

        if (!currentArtwork) {
            return <LoadingThing/>
        }

        const currentEditKey = 'abc123';
        let currentEdit;
        if (currentEditKey) {
            currentEdit = currentArtwork.edits[currentEditKey];
        }
        else {
            currentEdit = DEFAULT_COLOUR_SPLITTER_VALUES;
        }

        if (editor === 'colourSplitter') {
            return <ColourSplitter artworkData={currentArtwork}
                                   editValues={currentEdit}
                                   editKey={currentEditKey}
                                   onCloseClick={this.onClose}
                                   onSaveClick={this.updateArtworkAndImage}/>
        }

        if (editor === 'crop') {
            return <CropAndRotateEditor onSaveClick={this.updateArtworkAndImage}
                                        artworkData={currentArtwork}
                                        onCloseClick={this.onClose}/>
        }

        if (editor === 'frame') {
            return <FrameEditor artworkData={currentArtwork}
                                onSaveClick={this.onSave}
                                onCloseClick={this.onClose}/>
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentArtwork: getArtwork(state, props)
    }
};
export default connect(mapStateToProps, { UpdateUrl, updateArtworkAndImage, updateArtwork })(ArtworkEditor);
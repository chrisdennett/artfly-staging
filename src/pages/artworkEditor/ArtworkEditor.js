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
import { DEFAULT_COLOUR_SPLITTER_VALUES, MAX_IMG_SIZE } from "../../GLOBAL_CONSTANTS";
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import FrameEditor from "./frameEditor/FrameEditor";
import ColourSplitter from "./colourSplitterEditor/ColourSplitterEditor";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import {
    createCroppedCanvas,
    createOrientatedCanvas,
    createMaxSizeCanvas,
    loadImage
} from "../../components/global/ImageHelper";

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
        this.setupSourceCanvas = this.setupSourceCanvas.bind(this);
    }

    componentDidMount() {
        document.body.classList.toggle('no-scroll-bars', true);

        // editor - depending on editor and artworkData edits object
        // need to set up the canvas and
        if (this.props.currentArtwork) {
            this.setupSourceCanvas();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.currentArtwork && this.props.currentArtwork) {
            this.setupSourceCanvas();
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    setupSourceCanvas() {
        const { sourceUrl } = this.props.currentArtwork;
        loadImage(sourceUrl, (sourceImg) => {
            const sourceCanvas = createMaxSizeCanvas(sourceImg, MAX_IMG_SIZE, MAX_IMG_SIZE);
            this.setState({ sourceCanvas });
        });
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
        const { sourceCanvas } = this.state;
        const { currentArtwork, editor } = this.props;

        if (!currentArtwork || !sourceCanvas) {
            return <LoadingThing/>
        }

        const { orientation, cropData } = currentArtwork;

        // if are no edits can only have crop and rotate
        if (!currentArtwork.edits) {
            // if cropping
            if (editor === 'crop') {
                return <CropAndRotateEditor sourceCanvas={sourceCanvas}
                                            artworkData={currentArtwork}
                                            onSaveClick={this.updateArtworkAndImage}
                                            onCloseClick={this.onClose}/>
            }

            // if not crop, must be the first edit, pass in the cropped
            // and rotated source and set up a new edit object.
            const orientatedCanvas = createOrientatedCanvas(sourceCanvas, orientation);
            const croppedCanvas = createCroppedCanvas(orientatedCanvas, cropData);
            // get the editor component
            const Editor = getEditingComponent(editor);
            // pass 'new' in as the key to trigger the editor itself to add default values.
            return <Editor artworkData={currentArtwork}
                           editValues={{order:1}}
                           editKey={'new'}
                           sourceCanvas={croppedCanvas}
                           onCloseClick={this.onClose}
                           onSaveClick={this.updateArtworkAndImage}/>
        }


        let currentEditKey;
        let currentEdit;

        if (currentArtwork.edits) {
            currentEditKey = 'abc123';
            currentEdit = currentArtwork.edits[currentEditKey];
        }
        else {
            currentEditKey = null;
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

const getEditingComponent = (editorName) => {
    if (editorName === 'colourSplitter') {
        return ColourSplitter;
    }
};
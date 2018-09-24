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
import { DEFAULT_COLOUR_SPLITTER_VALUES, DEFAULT_CROP_EDIT_VALUES, MAX_IMG_SIZE } from "../../GLOBAL_CONSTANTS";
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import FrameEditor from "./frameEditor/FrameEditor";
import ColourSplitter from "./colourSplitterEditor/ColourSplitterEditor";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import {
    createCroppedCanvas,
    createOrientatedCanvas,
    createMaxSizeCanvas,
    loadImage, createEditedCanvas
} from "../../components/global/ImageHelper";
import { generateUID } from "../../components/global/UTILS";

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
        if (this.props.artworkData) {
            this.setupSourceCanvas();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.artworkData && this.props.artworkData) {
            this.setupSourceCanvas();
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    setupSourceCanvas() {
        const { sourceUrl } = this.props.artworkData;
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

    updateArtworkAndImage(canvas, editKey, newEditValues, widthToHeightRatio, heightToWidthRatio) {
        // updateArtworkAndImage(canvas, newArtworkData) {
        const { artworkData } = this.props;
        const { artworkId } = artworkData;
        let newArtworkData;

        // if it's an edit to the source, properties are directly on artwork data
        if (editKey === 'sourceCrop') {
            newArtworkData = { ...artworkData, ...newEditValues, widthToHeightRatio, heightToWidthRatio }
        }
        // otherwise add/overwrite relevant edit
        else {
            const { edits } = artworkData;
            const updatedEdits = { ...edits, [editKey]: newEditValues };
            newArtworkData = { ...artworkData, edits: updatedEdits, outputWidthToHeightRatio:widthToHeightRatio, outputHeightToWidthRatio:heightToWidthRatio };
        }

        this.props.updateArtworkAndImage(canvas, newArtworkData, artworkId, true, () => {
            this.props.UpdateUrl(`/gallery/galleryId_${this.props.galleryId}_galleryId/artworkId_${artworkId}_artworkId`);
        });
    }

    render() {
        const { sourceCanvas } = this.state;
        const { artworkData, editor } = this.props;

        if (!artworkData || !sourceCanvas) {
            return <LoadingThing/>
        }

        // needed before any edits
        const { orientation, cropData } = artworkData;

        // frame is independent of canvas edits so check for that first
        if (editor === 'frame') {
            return <FrameEditor artworkData={artworkData}
                                onSaveClick={this.onSave}
                                onCloseClick={this.onClose}/>
        }

        // if are no edits can only have crop and rotate
        if (!artworkData.edits) {
            // if cropping just open to overwrite current values
            if (editor === 'crop') {
                return <CropAndRotateEditor sourceCanvas={sourceCanvas}
                                            editKey={'sourceCrop'}
                                            initialEditValues={{ orientation: artworkData.orientation, cropData: artworkData.cropData }}
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
            const defaultValues = getEditorDefaults(editor);
            const newEditKey = generateUID();
            return <Editor initialEditValues={{ ...defaultValues, order: 1 }}
                           editKey={newEditKey}
                           sourceCanvas={croppedCanvas}
                           onCloseClick={this.onClose}
                           onSaveClick={this.updateArtworkAndImage}/>
        }
        // if there are already edits saved
        else {
            const editsInOrder = getEditsInOrder(artworkData.edits);
            const lastEdit = editsInOrder[editsInOrder.length - 1];
            // apply source orientation
            const orientatedCanvas = createOrientatedCanvas(sourceCanvas, orientation);
            // apply source cropping
            const croppedCanvas = createCroppedCanvas(orientatedCanvas, cropData);
            // get the requested editor
            const Editor = getEditingComponent(editor);
            // if the current editor is the same as the latest edit, just open it.
            if (lastEdit.type === editor) {
                return <Editor initialEditValues={lastEdit}
                               editKey={lastEdit.key}
                               sourceCanvas={croppedCanvas}
                               onCloseClick={this.onClose}
                               onSaveClick={this.updateArtworkAndImage}/>
            }
            // otherwise create canvas from all edits and add new edit
            else {
                // create canvas from all edits
                const canvasAfterAllEdits = createEditedCanvas(editsInOrder, croppedCanvas);
                // then call component with a new edit
                const newEditOrderNumber = editsInOrder.length + 1;
                const defaultValues = getEditorDefaults(editor);
                const newEditKey = generateUID();
                return <Editor initialEditValues={{ ...defaultValues, order: newEditOrderNumber }}
                               editKey={newEditKey}
                               sourceCanvas={canvasAfterAllEdits}
                               onCloseClick={this.onClose}
                               onSaveClick={this.updateArtworkAndImage}/>
            }
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        artworkData: getArtwork(state, props)
    }
};

export default connect(mapStateToProps, { UpdateUrl, updateArtworkAndImage, updateArtwork })(ArtworkEditor);

const getEditsInOrder = (allEdits) => {
    // edits are
    let orderedArray = Object.keys(allEdits).map(key => {
        return { ...allEdits[key], key };
    });

    orderedArray.sort((a, b) => a.order - b.order);

    return orderedArray;
};

const getEditingComponent = (editorName) => {
    if (editorName === 'colourSplitter') {
        return ColourSplitter;
    }

    if (editorName === 'crop') {
        return CropAndRotateEditor;
    }
};

const getEditorDefaults = (editor) => {
    if (editor === 'crop') return DEFAULT_CROP_EDIT_VALUES;
    if (editor === 'colourSplitter') return DEFAULT_COLOUR_SPLITTER_VALUES;
};


import React, { Component } from "react";
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
// styles
import './artworkEditor_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import { updateArtworkAndImage, updateArtwork } from '../../actions/SaveArtworkActions';
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import { EditAppBar } from "../../components/appBar/AppBar";
import { getArtwork } from "../../selectors/Selectors";
import FrameEditor from "./frameEditor/FrameEditor";
import ColourSplitter from "./colourSplitterEditor/ColourSplitterEditor";
import { getDimensionRatios } from "../../components/global/ImageHelper";

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { sourceImg: null, unsavedArtworkData: {} };

        this.onArtworkEdit = this.onArtworkEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onClose = this.onClose.bind(this);
        this.loadSourceImg = this.loadSourceImg.bind(this);
        this.onSaveEditedImage = this.onSaveEditedImage.bind(this);
    }

    componentDidMount() {
        document.body.classList.toggle('no-scroll-bars', true);
        if (this.props.editor && (this.props.editor === 'crop' || this.props.editor === 'colourSplitter')) {
            this.loadSourceImg(this.props);
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    componentDidUpdate() {
        if (this.props.editor && (this.props.editor === 'crop' || this.props.editor === 'colourSplitter')) {
            this.loadSourceImg(this.props);
        }
    }

    loadSourceImg(props) {
        const { currentArtwork } = props;

        if (!currentArtwork || this.state.sourceImg) return;

        let sourceImg = new Image();
        sourceImg.setAttribute('crossOrigin', 'anonymous'); //
        sourceImg.src = currentArtwork.sourceUrl;
        sourceImg.onload = () => {
            this.setState({
                sourceImg
            });
        }
    }

    onArtworkEdit(newData) {
        this.setState({ unsavedArtworkData: { ...newData } });
    }

    onSaveEditedImage(canvas) {
        const { currentArtwork, artworkId } = this.props;
        const { unsavedArtworkData } = this.state;

        // need to add editedOrientation and editedWidthToHeightRatio and editedHeightToWidthRatio
        const editedOrientation = 1;
        const { widthToHeightRatio: editedWidthToHeightRatio, heightToWidthRatio: editedHeightToWidthRatio } = getDimensionRatios(canvas.width, canvas.height);
        // need to have edited crop data too - ahhhhhhh, time to rethink?

        const mergedData = { ...currentArtwork, ...unsavedArtworkData, editedOrientation, editedWidthToHeightRatio, editedHeightToWidthRatio };

        this.props.updateArtworkAndImage(canvas, mergedData, artworkId, true, () => {
            this.props.UpdateUrl(`/gallery/galleryId_${this.props.galleryId}_galleryId/artworkId_${this.props.artworkId}_artworkId`);
        });
    }

    onSave() {
        const { currentArtwork, artworkId, editor } = this.props;
        const { sourceImg, unsavedArtworkData } = this.state;

        const mergedData = { ...currentArtwork, ...unsavedArtworkData };

        if (editor === 'crop' || editor === 'colourSplitter') {
            this.props.updateArtworkAndImage(sourceImg, mergedData, artworkId, false, () => {
                this.props.UpdateUrl(`/gallery/galleryId_${this.props.galleryId}_galleryId/artworkId_${this.props.artworkId}_artworkId`);
            });
        }
        else {
            this.props.updateArtwork(mergedData.artworkId, mergedData, () => {
                this.props.UpdateUrl(`/gallery/galleryId_${this.props.galleryId}_galleryId/artworkId_${this.props.artworkId}_artworkId`);
            });
        }
    }

    onCancel() {
        this.setState({ unsavedArtworkData: {} });
    }

    onClose() {
        const { galleryId, artworkId } = this.props;
        this.props.UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`, 'ArtworkEditor > onClose');
    }

    render() {
        const { currentArtwork, editor } = this.props;
        const { sourceImg, unsavedArtworkData } = this.state;
        const mergedData = { ...currentArtwork, ...unsavedArtworkData };
        const hasChanges = !isEqual(mergedData, currentArtwork) && !!currentArtwork;

        let editorTitle = '';
        if (editor === 'crop') editorTitle = 'Crop & Rotate';
        else if (editor === 'frame') editorTitle = 'Frame Editor';
        else if (editor === 'colourSplitter') editorTitle = 'Colour Splitter';


        if (editor === 'colourSplitter') {
            return <ColourSplitter sourceImg={sourceImg}
                                   hasChanges={hasChanges}
                                   artworkData={mergedData}
                                   onCloseClick={this.onClose}
                                   onSaveClick={this.onSaveEditedImage}
                                   onCancelClick={this.onCancel}
                                   onDataChange={this.onArtworkEdit}/>
        }

        return (
            <div className={'artworkEditor'}>
                <EditAppBar title={editorTitle}
                            hasChanges={hasChanges}
                            onCloseClick={this.onClose}
                            onSaveClick={this.onSave}
                            onCancelClick={this.onCancel}/>

                {editor === 'crop' &&
                <CropAndRotateEditor sourceImg={sourceImg}
                                     artworkData={mergedData}
                                     onDataChange={this.onArtworkEdit}/>
                }

                {editor === 'frame' &&
                <FrameEditor artworkData={mergedData}
                             onDataChange={this.onArtworkEdit}
                />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentArtwork: getArtwork(state, props),
        artworkSavingProgress: state.artworkSavingProgress
    }
};
export default connect(mapStateToProps, { UpdateUrl, updateArtworkAndImage, updateArtwork })(ArtworkEditor);
import React, { Component } from "react";
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
// styles
import './artworkEditor_styles.css';
// actions
import { UpdateUrl} from "../../actions/UrlActions";
import { updateArtworkAndImage, updateArtwork, resetArtworkSavingProgress } from '../../actions/SaveArtworkActions';
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import { EditAppBar } from "../appBar/AppBar";
import ArtworkEditorSavingProgress from "./ArtworkEditorSavingProgress";
import { getArtwork } from "../../selectors/Selectors";
import FrameEditor from "./frameEditor/FrameEditor";

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { sourceImg: null, unsavedArtworkData: {} };

        this.onCropAndRotateChange = this.onCropAndRotateChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onClose = this.onClose.bind(this);
        this.loadSourceImg = this.loadSourceImg.bind(this);
    }

    componentDidMount() {
        if (this.props.editor && this.props.editor === 'crop') {
            this.loadSourceImg(this.props);
        }
    }

    componentDidUpdate() {
        if (this.props.editor && this.props.editor === 'crop') {
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

    onCropAndRotateChange(newData) {
        this.setState({ unsavedArtworkData: { ...newData } });
    }

    onSave() {
        const { currentArtwork, artworkId, editor } = this.props;
        const { sourceImg, unsavedArtworkData } = this.state;

        const mergedData = { ...currentArtwork, ...unsavedArtworkData };

        if (editor === 'crop') {
            this.props.updateArtworkAndImage(sourceImg, mergedData, artworkId);
        }
        else{
            this.props.updateArtwork(mergedData.artworkId, mergedData);
        }
    }

    onCancel() {
        this.setState({ unsavedArtworkData: {} });
    }

    onClose() {
        const { galleryId, artworkId } = this.props;
        this.props.UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`);
    }

    render() {
        const { currentArtwork, artworkSavingProgress, artworkId, galleryId, resetArtworkSavingProgress, editor } = this.props;
        const { sourceImg, unsavedArtworkData } = this.state;
        const mergedData = { ...currentArtwork, ...unsavedArtworkData };
        const hasChanges = !isEqual(mergedData, currentArtwork) && !!currentArtwork;

        const editorTitle = editor === 'crop' ? 'Crop & Rotate' : 'Frame Editor';

        return (
            <div className={'artworkEditor'}>
                <EditAppBar title={editorTitle}
                            hasChanges={hasChanges}
                            onCloseClick={this.onClose}
                            onSaveClick={this.onSave}
                            onCancelClick={this.onCancel}/>

                <ArtworkEditorSavingProgress artworkSavingProgress={artworkSavingProgress}
                                             resetArtworkSavingProgress={resetArtworkSavingProgress}
                                             label={'Saving Artwork and Thumbnail'}
                                             redirectTo={`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`}/>

                {editor === 'crop' &&
                <CropAndRotateEditor sourceImg={sourceImg}
                                     artworkData={mergedData}
                                     onDataChange={this.onCropAndRotateChange}/>
                }

                {editor === 'frame' &&
                <FrameEditor artworkData={mergedData}
                             onDataChange={this.onCropAndRotateChange}
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
export default connect(mapStateToProps, { UpdateUrl, updateArtworkAndImage, updateArtwork, resetArtworkSavingProgress })(ArtworkEditor);
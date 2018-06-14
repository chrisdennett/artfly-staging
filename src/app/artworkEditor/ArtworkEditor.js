import React, { Component } from "react";
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
// styles
import './artworkEditor_styles.css';
// actions
import { updateArtworkAndImage, resetArtworkSavingProgress } from '../../actions/SaveArtworkActions';
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import { ArtworkEditAppBar } from "../appBar/AppBar";
import ArtworkEditorSavingProgress from "./ArtworkEditorSavingProgress";
import { goToArtwork } from "../../AppNavigation";

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
        this.loadSourceImg(this.props);
        this.props.resetArtworkSavingProgress();
    }

    componentDidUpdate() {
        this.loadSourceImg(this.props)
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

    onCropAndRotateChange(cropAndOrientationData) {
        this.setState({ unsavedArtworkData: { ...cropAndOrientationData } });
    }

    onSave() {
        const { currentArtwork, artworkId } = this.props;
        const { sourceImg, unsavedArtworkData } = this.state;

        const mergedData = { ...currentArtwork, ...unsavedArtworkData };
        this.props.updateArtworkAndImage(sourceImg, mergedData, artworkId);
    }

    onCancel() {
        this.setState({ unsavedArtworkData: {} });
    }

    onClose() {
        const {galleryId, artworkId} = this.props;
        goToArtwork(galleryId, artworkId);
        // history.push(`/gallery/artworkId_${this.props.artworkId}_artworkId`);
    }

    render() {
        const { currentArtwork, artworkSavingProgress, artworkId, galleryId, resetArtworkSavingProgress } = this.props;
        const { sourceImg, unsavedArtworkData } = this.state;
        const mergedData = { ...currentArtwork, ...unsavedArtworkData };
        const hasChanges = !isEqual(mergedData, currentArtwork);

        return (
            <div className={'artworkEditor'}>
                <ArtworkEditAppBar title={'Crop & Rotate'}
                                   hasChanges={hasChanges}
                                   onCloseClick={this.onClose}
                                   onSaveClick={this.onSave}
                                   onCancelClick={this.onCancel}/>

                <ArtworkEditorSavingProgress artworkSavingProgress={artworkSavingProgress}
                                             resetArtworkSavingProgress={resetArtworkSavingProgress}
                                             label={'Saving Artwork and Thumbnail'}
                                             redirectTo={`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId`}/>

                <CropAndRotateEditor sourceImg={sourceImg}
                                     key={1}
                                     orientation={mergedData.orientation}
                                     cropData={mergedData.cropData}
                                     onDataChange={this.onCropAndRotateChange}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentArtwork: getCurrentArtwork(state.artworks, props.artworkId),
        artworkSavingProgress: state.artworkSavingProgress
    }
};
export default connect(mapStateToProps, { updateArtworkAndImage, resetArtworkSavingProgress })(ArtworkEditor);

const getCurrentArtwork = (artworks, artworkId) => {
    return artworks[artworkId];
};
import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './artworkEditor_styles.css';
// actions
import { updateArtworkAndImage } from '../../actions/SaveArtworkActions';
// comps
import CropAndRotateEditor from "./cropAndRotateEditor/CropAndRotateEditor";
import SaveOrCancelControls from "../artworkAdder/SaveOrCancelControls";
import history from "../global/history";
import { ArtworkAppBar } from "../appBar/AppBar";
import AppBar from "../appBar/AppBar";

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { sourceImg: null, unsavedArtworkData: {} };

        this.onCropAndRotateChange = this.onCropAndRotateChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.loadSourceImg = this.loadSourceImg.bind(this);
    }

    componentWillMount() {
        this.loadSourceImg(this.props)
    }

    componentWillReceiveProps(props) {
        this.loadSourceImg(props)
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
        history.push(`/gallery/artworkId_${this.props.artworkId}_artworkId`);
    }

    render() {
        const { currentArtwork } = this.props;
        const { sourceImg, unsavedArtworkData } = this.state;
        const mergedData = { ...currentArtwork, ...unsavedArtworkData };

        return (
            <div className={'artworkEditor'}>

                <AppBar title={'Crop & Rotate'}
                        showHomeIcon={false}
                        showUserMenu={false}
                        showCloseButt={true}
                        onCloseClick={this.onCancel}/>

                {sourceImg &&
                <CropAndRotateEditor sourceImg={sourceImg}
                                     key={1}
                                     orientation={mergedData.orientation}
                                     cropData={mergedData.cropData}
                                     onDataChange={this.onCropAndRotateChange}/>
                }
                <SaveOrCancelControls onSave={this.onSave}
                                      key={2}
                                      onCancel={this.onCancel}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentArtwork: getCurrentArtwork(state.artworks, props.artworkId)
    }
};
export default connect(mapStateToProps, { updateArtworkAndImage })(ArtworkEditor);

const getCurrentArtwork = (artworks, artworkId) => {
    return artworks[artworkId];
};
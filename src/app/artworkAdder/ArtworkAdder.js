import React, { Component } from 'react';
import { connect } from 'react-redux';
// styles
import './artworkAdder_styles.css';
// actions
import { addNewArtwork, resetArtworkSavingProgress } from '../../actions/SaveArtworkActions';
// helper
import GenerateDefaultArtworkData from '../artwork/DefaultArtworkDataGenerator';
import { GetImage } from "../global/ImageHelper";
// comps
import { EditAppBar } from "../appBar/AppBar";
import PhotoSelector from "../photoSelector/PhotoSelector";
import CropAndRotateEditor from "../artworkEditor/cropAndRotateEditor/CropAndRotateEditor";
import { goToGallery } from "../../AppNavigation";
import ArtworkEditorSavingProgress from "../artworkEditor/ArtworkEditorSavingProgress";

class ArtworkAdder extends Component {

    constructor(props) {
        super(props);

        this.state = { img: null, orientation: 1, cropData: { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 } };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onSaveNewArtwork = this.onSaveNewArtwork.bind(this);
        this.onCropAndRotateChange = this.onCropAndRotateChange.bind(this);
        this.onAddAnother = this.onAddAnother.bind(this);
    }

    componentWillUnmount() {
        this.props.resetArtworkSavingProgress();
        this.setState = (
            {
                img: null,
                orientation: 1,
                cropData: { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 }
            }
        );
    }

    onPhotoSelected(imgFile) {
        GetImage(imgFile, (img, orientation, widthToHeightRatio, heightToWidthRatio) => {
            this.setState({ img, orientation, widthToHeightRatio, heightToWidthRatio });
        })
    }

    onCropAndRotateChange(newData) {
        const { orientation = this.state.orientation, cropData, widthToHeightRatio, heightToWidthRatio } = newData;

        this.setState({ orientation, cropData, widthToHeightRatio, heightToWidthRatio })
    }

    onSaveNewArtwork() {
        const defaultArtworkData = GenerateDefaultArtworkData();
        const { orientation, cropData, widthToHeightRatio, heightToWidthRatio } = this.state;

        const newArtworkData = { ...defaultArtworkData, orientation, cropData, widthToHeightRatio, heightToWidthRatio };
        this.props.addNewArtwork(this.state.img, newArtworkData);
    }

    onAddAnother() {
        this.props.resetArtworkSavingProgress();
        this.setState({ img: null, orientation: 1, cropData: { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 } });
    }

    render() {
        const { img, cropData, orientation } = this.state;
        const { artworkSavingProgress, galleryId } = this.props;

        const showPhotoSelector = !img;
        const showPhotoCropper = img;
        // const saveComplete = artworkSavingProgress.status === 'complete';
        const showPhotoSavingProgress = artworkSavingProgress.status === 'saving';

        const savedArtworkId = artworkSavingProgress.artworkId;

        let title = 'Add Artwork';
        if (showPhotoSavingProgress) title = 'Saving...';

        return (
            <div className={'artworkAdder'}>

                <EditAppBar title={title}
                            hasChanges={showPhotoCropper}
                            onCloseClick={() => goToGallery(galleryId)}
                            onSaveClick={this.onSaveNewArtwork}
                            onCancelClick={() => this.setState({ img: null })}/>

                <ArtworkEditorSavingProgress artworkSavingProgress={artworkSavingProgress}
                                             label={'Saving source image, artwork and thumbnail'}
                                             redirectTo={`/gallery/galleryId_${galleryId}_galleryId/artworkId_${savedArtworkId}_artworkId`}/>


                {showPhotoSelector &&
                <div className={'artworkAdder--photoSelectorHolder'}>
                    <PhotoSelector onPhotoSelected={(img) => this.onPhotoSelected(img)}/>
                </div>
                }

                {showPhotoCropper &&
                <CropAndRotateEditor sourceImg={img}
                                     key={1}
                                     orientation={orientation}
                                     cropData={cropData}
                                     onDataChange={this.onCropAndRotateChange}/>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        artworkSavingProgress: state.artworkSavingProgress
    }
);
export default connect(mapStateToProps, { addNewArtwork, resetArtworkSavingProgress })(ArtworkAdder);
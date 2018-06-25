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
import { getMaxArtworksAllowed, getTotalUserArtworks } from "../../selectors/Selectors";
import LoadingThing from "../loadingThing/LoadingThing";

class ArtworkAdder extends Component {

    constructor(props) {
        super(props);

        this.state = { img: null, artworkData: GenerateDefaultArtworkData() };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onSaveNewArtwork = this.onSaveNewArtwork.bind(this);
        this.onCropAndRotateChange = this.onCropAndRotateChange.bind(this);
    }

    componentWillUnmount() {
        this.props.resetArtworkSavingProgress();
        this.setState = ({ img: null, artworkData: GenerateDefaultArtworkData() });
    }

    onPhotoSelected(imgFile) {
        GetImage(imgFile, (img, orientation, widthToHeightRatio, heightToWidthRatio) => {

            const newArtworkData = { ...this.state.artworkData, orientation, widthToHeightRatio, heightToWidthRatio };

            this.setState({ img, artworkData: newArtworkData });
        })
    }

    onCropAndRotateChange(newData) {
        const newArtworkData = { ...this.state.artworkData, ...newData };

        this.setState({ artworkData: newArtworkData })
    }

    onSaveNewArtwork() {
        this.props.addNewArtwork(this.state.img, this.state.artworkData);
    }

    render() {
        const { img, artworkData } = this.state;
        const { artworkSavingProgress, totalArtworksFetchProgress, galleryId, totalUserArtworks, maxArtworksAllowed } = this.props;

        const maximumArtworkLimitReached = totalUserArtworks >= maxArtworksAllowed;
        const showPhotoSelector = !img && !maximumArtworkLimitReached;
        const showPhotoCropper = img && !maximumArtworkLimitReached;
        // const saveComplete = artworkSavingProgress.status === 'complete';
        const showPhotoSavingProgress = artworkSavingProgress.status === 'saving';

        const savedArtworkId = artworkSavingProgress.artworkId;

        let title = 'Add Artwork';
        if (showPhotoSavingProgress) title = 'Saving...';

        if (totalArtworksFetchProgress !== 'fetched') {
            return <LoadingThing/>
        }

        return (
            <div className={'artworkAdder'}>

                <EditAppBar title={title}
                            hasChanges={showPhotoCropper}
                            onCloseClick={() => goToGallery(galleryId)}
                            onSaveClick={this.onSaveNewArtwork}
                            onCancelClick={() => this.setState({ img: null })}/>

                {maximumArtworkLimitReached &&
                <div>
                    you have {totalUserArtworks} artworks out of {maxArtworksAllowed}.
                    If you want to add another artworks you'll either have to delete an existing artwork or sign up for ArtFly Club membership.
                </div>
                }

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
                                     artworkData={artworkData}
                                     onDataChange={this.onCropAndRotateChange}/>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        totalArtworksFetchProgress: state.dataFetching.userArtworks,
        totalUserArtworks: getTotalUserArtworks(state),
        maxArtworksAllowed: getMaxArtworksAllowed(state),
        artworkSavingProgress: state.artworkSavingProgress
    }
);
export default connect(mapStateToProps, { addNewArtwork, resetArtworkSavingProgress })(ArtworkAdder);
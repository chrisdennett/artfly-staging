import React, { Component } from 'react';
import { connect } from 'react-redux';
// styles
import './artworkAdder_styles.css';
// actions
import { addNewArtwork } from '../../actions/SaveArtworkActions';
import { UpdateUrl } from "../../actions/UrlActions";
// selectors
import { getMaxArtworksAllowed, getTotalUserArtworks, getDeleteAfterDate } from "../../selectors/Selectors";
// helper
import GenerateDefaultArtworkData from '../../components/artwork/DefaultArtworkDataGenerator';
import { GetImage } from "../../components/global/ImageHelper";
// constants
import MEMBERSHIP_PLANS from "../../MEMBERSHIP_PLANS";
// comps
import { EditAppBar } from "../../components/appBar/AppBar";
import PhotoSelector from "../../components/photoSelector/PhotoSelector";
import CropAndRotateEditor from "../artworkEditor/cropAndRotateEditor/CropAndRotateEditor";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import MaximumArtworksReached from "./maximumArtworksReached/MaximumArtworksReached";

class ArtworkAdder extends Component {

    constructor(props) {
        super(props);

        this.state = { img: null, artworkData: GenerateDefaultArtworkData() };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onSaveNewArtwork = this.onSaveNewArtwork.bind(this);
        this.onCropAndRotateChange = this.onCropAndRotateChange.bind(this);
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

    onSaveNewArtwork(canvas, editKey, newEditValues, widthToHeightRatio, heightToWidthRatio) {
        const { deleteAfterDate, totalUserArtworks } = this.props;
        const { artworkData } = this.state;
        const maxArtworksOnFreePlan = MEMBERSHIP_PLANS.free.maxArtworks;
        const includeDeleteDate = deleteAfterDate && totalUserArtworks >= maxArtworksOnFreePlan;

        const updatedArtworkData = {...artworkData, ...newEditValues, widthToHeightRatio, heightToWidthRatio};
        const newArtworkData = includeDeleteDate ? { ...updatedArtworkData, deleteAfter: deleteAfterDate } : updatedArtworkData;

        this.props.addNewArtwork(this.state.img, newArtworkData, () => {
            this.props.UpdateUrl(`/gallery/galleryId_${this.props.galleryId}_galleryId`);
        });
    }

    render() {
        const { img, artworkData } = this.state;
        const { UpdateUrl, totalArtworksFetchProgress, galleryId, totalUserArtworks, maxArtworksAllowed } = this.props;

        const maximumArtworkLimitReached = totalUserArtworks >= maxArtworksAllowed;
        const showPhotoSelector = !img && !maximumArtworkLimitReached;
        const showPhotoCropper = img && !maximumArtworkLimitReached;

        if (totalArtworksFetchProgress !== 'fetched') {
            return <LoadingThing/>
        }

        if (showPhotoCropper) {
            return <CropAndRotateEditor sourceCanvas={img}
                                        forceShowSave={true}
                                        initialEditValues={{orientation:artworkData.orientation, cropData:artworkData.cropData}}
                                        onCancelClick={() => this.setState({ img: null })}
                                        onCloseClick={() => this.setState({ img: null })}
                                        onSaveClick={this.onSaveNewArtwork}/>
        }

        return (
            <div className={'artworkAdder'}>

                <EditAppBar title={'Add Artwork'}
                            onCloseClick={() => UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId`)}/>

                {maximumArtworkLimitReached &&
                <MaximumArtworksReached galleryId={galleryId}
                                        totalUserArtworks={totalUserArtworks}
                                        maxArtworksAllowed={maxArtworksAllowed}/>
                }

                {showPhotoSelector &&
                <div className={'artworkAdder--photoSelectorHolder'}>
                    <PhotoSelector onPhotoSelected={(img) => this.onPhotoSelected(img)}/>
                </div>
                }

            </div>
        )
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
export default connect(mapStateToProps, { addNewArtwork, UpdateUrl })(ArtworkAdder);
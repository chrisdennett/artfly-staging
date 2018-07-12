import React, { Component } from 'react';
import { connect } from 'react-redux';
// styles
import './artworkAdder_styles.css';
// actions
import { addNewArtwork } from '../../actions/SaveArtworkActions';
import { UpdateUrl } from "../../actions/UrlActions";
// selectors
import { getMaxArtworksAllowed, getTotalUserArtworks } from "../../selectors/Selectors";
// helper
import GenerateDefaultArtworkData from '../artwork/DefaultArtworkDataGenerator';
import { GetImage } from "../global/ImageHelper";
// comps
import { EditAppBar } from "../appBar/AppBar";
import PhotoSelector from "../photoSelector/PhotoSelector";
import CropAndRotateEditor from "../artworkEditor/cropAndRotateEditor/CropAndRotateEditor";
import LoadingThing from "../loadingThing/LoadingThing";
import MaximumArtworksReached from "./maximumArtworksReached/MaximumArtworksReached";

class ArtworkAdder extends Component {

    constructor(props) {
        super(props);

        this.state = { img: null, artworkData: GenerateDefaultArtworkData() };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onSaveNewArtwork = this.onSaveNewArtwork.bind(this);
        this.onCropAndRotateChange = this.onCropAndRotateChange.bind(this);
    }

    componentWillUnmount() {
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
        this.props.addNewArtwork(this.state.img, this.state.artworkData, () => {
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

        return (
            <div className={'artworkAdder'}>

                <EditAppBar title={'Add Artwork'}
                            hasChanges={showPhotoCropper}
                            onCloseClick={() => UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId`)}
                            onSaveClick={this.onSaveNewArtwork}
                            onCancelClick={() => this.setState({ img: null })}/>

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
    }
);
export default connect(mapStateToProps, { addNewArtwork, UpdateUrl })(ArtworkAdder);
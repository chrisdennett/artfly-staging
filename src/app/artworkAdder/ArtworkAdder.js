import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { addNewArtwork, resetArtworkSavingProgress } from '../../actions/SaveArtworkActions';
// helper
import GenerateDefaultArtworkData from '../artwork/DefaultArtworkDataGenerator';
import { GetImage } from "../global/ImageHelper";
// comps
import AppBar from "../appBar/AppBar";
import PhotoSelector from "../photoSelector/PhotoSelector";
import CropAndRotateEditor from "../artworkEditor/cropAndRotateEditor/CropAndRotateEditor";
import SaveOrCancelControls from "./SaveOrCancelControls";
import ArtworkAdderSavingProgress from "./ArtworkAdderSavingProgress";
import ArtworkAdderComplete from "./ArtworkAdderComplete";

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

        console.log("widthToHeightRatio: ", widthToHeightRatio);
        console.log("heightToWidthRatio: ", heightToWidthRatio);

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
        const { artworkSavingProgress } = this.props;

        const showPhotoSelector = !img && artworkSavingProgress.status === 'dormant';
        const showPhotoCropper = img && artworkSavingProgress.status === 'dormant';
        const saveComplete = artworkSavingProgress.status === 'complete';
        const showPhotoSavingProgress = artworkSavingProgress.status !== 'dormant' && !saveComplete;

        const savedArtworkId = artworkSavingProgress.artworkId;

        let title = 'Add Art';
        if (showPhotoSavingProgress) title = 'Saving...';
        if (saveComplete) title = 'Artwork Added';

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

                <AppBar title={title} fixed={false} showUserMenu={false} showCloseButt={true}/>

                {saveComplete &&
                <ArtworkAdderComplete newArtworkId={savedArtworkId}
                                      addAnotherArtwork={this.onAddAnother}/>
                }

                {showPhotoSavingProgress &&
                <ArtworkAdderSavingProgress artworkSavingProgress={artworkSavingProgress}/>
                }

                {showPhotoSelector &&
                <PhotoSelector onPhotoSelected={(img) => this.onPhotoSelected(img)}/>
                }

                {showPhotoCropper &&
                [
                    <CropAndRotateEditor sourceImg={img}
                                         key={1}
                                         orientation={orientation}
                                         cropData={cropData}
                                         onDataChange={this.onCropAndRotateChange}/>,
                    <SaveOrCancelControls onSave={this.onSaveNewArtwork}
                                          key={2}
                                          onCancel={() => this.setState({ img: null })}/>
                ]
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
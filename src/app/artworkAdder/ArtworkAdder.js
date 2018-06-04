import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { addNewArtwork } from '../../actions/SaveArtworkActions';
// helper
import GenerateDefaultArtworkData from '../artwork/DefaultArtworkDataGenerator';
import { GetImage } from "../global/ImageHelper";
// comps
import AppBar from "../appBar/AppBar";
import PhotoSelector from "../photoSelector/PhotoSelector";
import CropAndRotateEditor from "../artworkOptions/cropAndRotateEditor/CropAndRotateEditor";
import SaveOrCancelControls from "./SaveOrCancelControls";

class ArtworkAdder extends Component {

    constructor(props) {
        super(props);

        this.state = { img: null, orientation: 1, cropData: { leftPercent: 0, rightPercent: 1, topPercent: 0, bottomPercent: 1 } };

        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onSaveNewArtwork = this.onSaveNewArtwork.bind(this);
        this.onCropAndRotateChange = this.onCropAndRotateChange.bind(this);
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

    render() {
        const { img, cropData, orientation } = this.state;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

                <AppBar title={'Add Artwork'} fixed={false} showUserMenu={false} showCloseButt={true}/>

                {!img &&
                <PhotoSelector onPhotoSelected={(img) => this.onPhotoSelected(img)}/>
                }

                {img &&
                <CropAndRotateEditor sourceImg={img}
                                     orientation={orientation}
                                     cropData={cropData}
                                     onDataChange={this.onCropAndRotateChange}/>
                }
                {img &&
                <SaveOrCancelControls onSave={this.onSaveNewArtwork}
                                      onCancel={() => this.setState({ img: null })}/>
                }

            </div>
        )
    }
}

export default connect(null, { addNewArtwork })(ArtworkAdder);
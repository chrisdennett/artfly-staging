import React, { Component } from "react";
import { connect } from 'react-redux';
import './addArtwork.css';

import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';

import { uploadImage, clearImageUpload } from '../../actions/ArtistGalleryActions';
import ArtistSelector from "../ArtistSelector/ArtistSelector";
import Butt from "../global/Butt";
import Modal from "../global/Modal";

class AddArtModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cropImg: null,
            cropData: null,
            saveTriggered: false,
            selectedArtistId: null
        };
        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        this.initData();
    }

    initData() {
        if (this.props.user && this.props.user.artistIds) {
            this.setState({ selectedArtistId: Object.keys(this.props.user.artistIds)[0] })
        }
    }

    onCancel() {
        this.setState(() => {
            return {
                cropImg: null,
                cropData: null,
                saveTriggered: false,
                selectedArtistId: null
            }
        });

        this.props.onCancel();
    }

    onCropImageSave(cropImg) {
        this.setState({ cropImg: cropImg });
    }

    onCropDataChange(imageCropAndRotateData) {
        this.setState({ cropData: imageCropAndRotateData, cropImg: null });
    }

    onSave() {
        this.setState({ saveTriggered: true })
        // set up the new artwork
        // use a call back to set up confirmation message
        //export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null)
        const { height, width } = this.state.cropData;

        this.props.uploadImage(this.state.cropImg, this.props.user.uid, this.state.selectedArtistId, width, height, null, (newArtworkData) => {
            this.setState({ saveTriggered: false })
            this.props.onSaveComplete(newArtworkData);
            this.props.clearImageUpload();
        });
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId })
    }

    render() {
        const imgLoading = this.props.imgSrc === null;
        const imgSaving = this.state.saveTriggered || (this.props.imageUploadInfo && this.props.imageUploadInfo.progress);
        const showMainContent = !imgSaving && !imgLoading;

        const contentStyle = {
            display: 'flex',
            flexDirection: 'column',
        };

        const imageSectionStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        };

        const imgCropStyle = {
            width: 200,
            height: '100%',
            margin: 'auto'

        };

        const modalContentStyle = {
            textAlign: 'left',
            padding: 20
        };

        const selectArtistSectionStyle = { paddingTop: 20 };
        const artistSelectorStyle = { textAlign: 'center' };
        const title = imgSaving ? 'Saving Artwork' : 'Add Artwork';

        return (
            <Modal isOpen={this.props.isOpen} title={title} allowScrolling={true}>

                <div style={modalContentStyle}>

                    {imgSaving && <h2 style={{ margin: '42 auto' }}>Saving: {this.props.imageUploadInfo.progress}%</h2>}

                    {imgLoading && <p>loading picture...</p>}

                    {showMainContent && <div style={contentStyle}>

                        <ImageCropAndRotate url={this.props.imgSrc}
                                            style={imgCropStyle}
                                            ref={instance => { this.cropper = instance; }}
                                            callSaveOnImageLoad="true"
                                            onCropDataInit={this.onCropDataChange.bind(this)}
                                            onCropDataConfirm={this.onCropDataChange.bind(this)}
                                            onCropImageSave={this.onCropImageSave.bind(this)}/>


                        <p>Step 1: Edit the picture if needed.</p>

                        <div style={imageSectionStyle}>
                            <Butt label={'Trim / Rotate'}
                                  style={{ flex: 'none' }}
                                  onClick={() => { this.cropper.openEditScreen(); }}/>

                        </div>

                        <div style={selectArtistSectionStyle}>
                            <p>Step 2: Select the artist.</p>
                            <ArtistSelector artists={this.props.artists}
                                            labelText={''}
                                            style={artistSelectorStyle}
                                            selectedArtistId={this.state.selectedArtistId}
                                            onArtistSelected={this.onArtistSelected}/>
                        </div>

                        <Butt label={'SAVE'} disabled={!this.state.cropImg} onClick={this.onSave.bind(this)}/>
                        <Butt label={'CANCEL'} onClick={this.onCancel}/>
                    </div>}
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        artists: state.artists,
        imageUploadInfo: state.imageUploadInfo
    }
};

export default connect(mapStateToProps, { uploadImage, clearImageUpload })(AddArtModal);
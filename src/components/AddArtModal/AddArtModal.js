// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './addArtwork.css';
// actions
import { uploadImage, clearImageUpload, getUserArtistChanges } from '../../actions/UserDataActions';
// components
import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';
import ArtistSelector from "../ArtistSelector/ArtistSelector";
import Butt from "../global/Butt";
import Modal from "../global/Modal";

class AddArtModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cropImg: null,
            cropData: null,
            saveTriggered: false
        };
        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        // TODO: refactor artist data stuff into artist selector - the function below could store artistIds in user data store for ease of picking out the artists
        // ensure all the artists are available for the artist selector
        this.props.getUserArtistChanges(this.props.user.uid);
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

        const selectedArtistId = this.state.selectedArtistId || this.props.defaultArtistId;

        this.props.uploadImage(this.state.cropImg, this.props.user.uid, selectedArtistId, width, height, null, (newArtworkData) => {
            this.setState({ saveTriggered: false });
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
        const artistSelectorStyle = { textAlign: 'center', display: 'inline-block' };
        const title = imgSaving ? 'Saving Artwork' : 'Add Artwork';
        const artistLabelStyle = { display: 'inline-block', margin: 0 };

        const selectedArtistId = this.state.selectedArtistId || this.props.defaultArtistId;

        return (
            <Modal isOpen={this.props.isOpen} title={title} allowScrolling={true}>

                <div style={modalContentStyle}>

                    {imgSaving && this.props.imageUploadInfo &&
                    <h2 style={{ margin: '42 auto' }}>Saving: {this.props.imageUploadInfo.progress}%</h2>}

                    {imgLoading && <p>loading picture...</p>}

                    {!imgLoading && !imgSaving && <div style={contentStyle}>
                        <ImageCropAndRotate url={this.props.imgSrc}
                                            style={imgCropStyle}
                                            ref={instance => { this.cropper = instance; }}
                                            callSaveOnImageLoad="true"
                                            onCropDataInit={this.onCropDataChange.bind(this)}
                                            onCropDataConfirm={this.onCropDataChange.bind(this)}
                                            onCropImageSave={this.onCropImageSave.bind(this)}/>

                        {this.state.cropImg &&
                        <div>
                            <div style={imageSectionStyle}>
                                <Butt label={'Trim / Rotate'}
                                      style={{ flex: 'none' }}
                                      onClick={() => { this.cropper.openEditScreen(); }}/>

                            </div>

                            <div style={selectArtistSectionStyle}>
                                <p style={artistLabelStyle}>Artist:</p>
                                <ArtistSelector artists={this.props.userArtists}
                                                labelText={''}
                                                style={artistSelectorStyle}
                                                selectedArtistId={selectedArtistId}
                                                onArtistSelected={this.onArtistSelected}/>
                            </div>

                            <Butt label={'SAVE'} disabled={!this.state.cropImg} onClick={this.onSave.bind(this)}/>
                            <Butt label={'CANCEL'} onClick={this.onCancel}/>
                        </div>
                        }
                    </div>}
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    let userArtists = {};
    let defaultArtistId;

    // TODO: This is painful and seems highly inefficient.
    if (state.artists) {
        for (let artistId of Object.keys(state.artists)) {
            if (state.artists[artistId].adminId === state.user.uid) {
                userArtists[artistId] = state.artists[artistId];

                if(!defaultArtistId){
                    defaultArtistId = artistId;
                }
            }
        }
    }

    return {
        user: state.user,
        userArtists: userArtists,
        defaultArtistId: defaultArtistId,
        imageUploadInfo: state.imageUploadInfo
    }
};

export default connect(mapStateToProps, { uploadImage, clearImageUpload, getUserArtistChanges })(AddArtModal);
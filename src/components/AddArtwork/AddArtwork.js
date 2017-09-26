import React, { Component } from "react";
import { connect } from 'react-redux';
import './addArtwork.css';

import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';

import { fetchArtist, uploadImage, clearImageUpload } from '../../actions/ArtistGalleryActions';
import ArtistSelector from "../ArtistSelector/ArtistSelector";
import AddArtButton from "../AppControls/UserControls/assets/AddArtButton";
import Butt from "../global/Butt";

// The role of this component is to:
// - create a custom file input button with a given label and id
// - send it's id and the selected file to a callback function when selected
class PhotoSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: null,
            cropImg: null,
            cropData: null,
            imgIsSelected: false,
            selectedArtistId: null
        };
        this.onArtistSelected = this.onArtistSelected.bind(this);
    }

    componentWillMount() {
        this.initData();

        // localStorage.getItem()
    }

    initData() {
        const { user } = this.props;
        if (user) {
            const { artistIds } = this.props.user;
            if (artistIds) {
                for (let id of Object.keys(artistIds)) {
                    this.props.fetchArtist(id);
                }

                this.setState({ selectedArtistId: Object.keys(artistIds)[0] })
            }
        }
    }

    handleImageChange(event) {
        event.preventDefault();
        this.props.clearImageUpload();

        if (event.target.files[0]) {
            this.setState({ imgIsSelected: true });
            this.setState({ imgIsSelected: true });

            const imgFile = event.target.files[0];
            console.log("event.target.files: ", event.target.files);
            const reader = new FileReader();

            reader.onload = function (event) {
                const imgSrc = event.target.result;
                this.setState({ imgSrc: imgSrc });
            }.bind(this);

            reader.readAsDataURL(imgFile);
        }
    }

    onCropImageSave(cropImg) {
        this.setState({ cropImg: cropImg });
    }

    onCropDataChange(imageCropAndRotateData) {
        this.setState({ cropData: imageCropAndRotateData, cropImg: null });
    }

    onSave() {
        // set up the new artwork
        // use a call back to set up confirmation message
        //export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null)
        const { height, width } = this.state.cropData;

        this.props.uploadImage(this.state.cropImg, this.props.user.uid, this.state.selectedArtistId, width, height);
    }

    onCancel() {
        this.setState({ imgSrc: null, imgIsSelected: false });
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId })
    }

    showPictureInGallery() {
        this.setState({ imgSrc: null, imgIsSelected: false });
        this.props.history.push(`/gallery/${this.props.imageUploadInfo.artistId}/artwork/${this.props.imageUploadInfo.id}`);
        this.props.clearImageUpload();
    }

    handleAddAnotherImageSelect(event) {
        event.preventDefault();
        this.setState({ imgSrc: null, imgIsSelected: false });
        this.props.clearImageUpload();
        this.handleImageChange(event);
    }

    render() {
        if (this.state.imgIsSelected) {

            if (this.props.imageUploadInfo && this.props.imageUploadInfo.progress) {
                const { progress } = this.props.imageUploadInfo;

                return (
                    <div className={'add-artwork-screen'}>
                        <div className={'add-artwork-screen-content'}>
                            <h1>Artwork Added</h1>
                            {progress < 100 &&
                            <div>progress: {progress}%</div>
                            }

                            {progress === 100 &&
                            <div>
                                <Butt label={'Open in Gallery'} onClick={this.showPictureInGallery.bind(this)}/>
                                <span>
                                    <input className="inputfile"
                                           onChange={this.handleAddAnotherImageSelect.bind(this)}
                                           type="file" accept="image/*"
                                           name={this.props.id} id="new-upload"/>

                                    <label disabled={this.props.disabled}
                                           className={this.props.disabled ? 'disabled' : ''}
                                           htmlFor="new-upload">
                                        Add Another Artwork
                                    </label>
                                </span>
                            </div>
                            }
                        </div>
                    </div>
                )
            }

            return (
                <div className={'add-artwork-screen'}>
                    <div className={'add-artwork-screen-content'}>
                        <h1>Add Artwork</h1>

                        {this.state.imgSrc &&
                            <div className={'add-artwork-image-section'}>
                                <Butt label={'Edit picture'}
                                      disabled={!this.state.cropImg}
                                      onClick={() => { this.cropper.openEditScreen(); }}/>

                                <ImageCropAndRotate url={this.state.imgSrc}
                                                    ref={instance => { this.cropper = instance; }}
                                                    callSaveOnImageLoad="true"
                                                    onCropDataInit={this.onCropDataChange.bind(this)}
                                                    onCropDataConfirm={this.onCropDataChange.bind(this)}
                                                    onCropImageSave={this.onCropImageSave.bind(this)}/>
                            </div>
                        }
                        <div className={'artwork-editor-artist-section'}>
                            <ArtistSelector artists={this.props.artists}
                                            selectedArtistId={this.state.selectedArtistId}
                                            onArtistSelected={this.onArtistSelected}/>
                        </div>
                        <Butt label={'SAVE'} disabled={!this.state.cropImg} onClick={this.onSave.bind(this)}/>
                        <Butt label={'CANCEL'} onClick={this.onCancel.bind(this)}/>

                    </div>
                </div>
            )
        }

        // the add artwork button needs an id but this is only important if more than one are used at the same time
        const id = !this.props.id ? "123" : this.props.id;
        return (
            <span>
                <input className="inputfile"
                       onChange={this.handleImageChange.bind(this)}
                       type="file" accept="image/*"
                       name={this.props.id} id={id}/>

                <label disabled={this.props.disabled}
                       className={this.props.disabled ? 'disabled' : ''}
                       htmlFor={id}>
                    <AddArtButton/>
                </label>
            </span>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        artists: state.artists,
        imageUploadInfo: state.imageUploadInfo
    }
};

const PhotoSelectorContainer = connect(
    mapStateToProps, { uploadImage, fetchArtist, clearImageUpload }
)(PhotoSelector);

export default PhotoSelectorContainer;
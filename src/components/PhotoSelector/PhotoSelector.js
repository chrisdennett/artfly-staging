import React, { Component } from "react";
import { connect } from 'react-redux';

import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';

import { fetchArtist, uploadImage, clearImageUpload } from '../../actions/ArtistGalleryActions';
import ArtistSelector from "../ArtistSelector/ArtistSelector";

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
    }

    initData() {
        const { user } = this.props;
        if (user) {
            const { artistGalleryIds } = this.props.user;
            if (artistGalleryIds) {
                for (let id of Object.keys(artistGalleryIds)) {
                    this.props.fetchArtist(id);
                }

                this.setState({ selectedArtistId: Object.keys(artistGalleryIds)[0] })
            }
        }
    }

    handleImageChange(event) {
        event.preventDefault();

        if (event.target.files[0]) {
            this.setState({ imgIsSelected: true });

            const imgFile = event.target.files[0];
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
        console.log("imageCropAndRotateData: ", imageCropAndRotateData);
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
        this.props.history.push(`/gallery/${this.props.photoSelected.artistId}/artwork/${this.props.photoSelected.id}`);
        this.props.clearImageUpload();
    }

    //this.props.photoSelected: { artistId: artistId, id: artworkRef.key, progress: progress }
    render() {

        if (this.state.imgIsSelected) {
            const fullScreenStyle = {
                height: '100%',
                width: '100%',
                position: 'fixed',
                zIndex: 1,
                left: 0,
                top: 0,
                backgroundColor: 'rgb(0,0,0)',
                overflowX: 'hidden',
                transition: '0.5s mode'
            };
            const contentStyle = {
                position: 'relative',
                color: '#fff',
                top: '2%',
                left: '2%'
            };

            if (this.props.photoSelected && this.props.photoSelected.progress) {
                const { progress } = this.props.photoSelected;

                return (
                    <div style={fullScreenStyle}>
                        <div style={contentStyle}>
                            <h1>Saving:</h1>
                            {progress < 100 &&
                            <div>progress: {progress}%</div>
                            }

                            {progress === 100 &&
                            <div>
                                <p>Artwork saved</p>
                                <button onClick={this.showPictureInGallery.bind(this)}>Open in Gallery</button>
                            </div>
                            }
                        </div>
                    </div>
                )
            }

            return (
                <div style={fullScreenStyle}>
                    <div style={contentStyle}>
                        <h1>New Image:</h1>

                        <button disabled={!this.state.cropImg} onClick={this.onSave.bind(this)}>SAVE</button>
                        <button onClick={this.onCancel.bind(this)}>CANCEL</button>

                        <ArtistSelector artists={this.props.artists}
                                        selectedArtistId={this.state.selectedArtistId}
                                        onArtistSelected={this.onArtistSelected}/>

                        <hr/>

                        {this.state.imgSrc &&
                        <div style={{ width: '50%' }}>
                            <button disabled={!this.state.cropImg} onClick={() => { this.cropper.openEditScreen(); }}>
                                Crop or Rotate picture
                            </button>
                            <ImageCropAndRotate url={this.state.imgSrc}
                                                ref={instance => { this.cropper = instance; }}
                                                callSaveOnImageLoad="true"
                                                onCropDataInit={this.onCropDataChange.bind(this)}
                                                onCropDataConfirm={this.onCropDataChange.bind(this)}
                                                onCropImageSave={this.onCropImageSave.bind(this)}/>
                        </div>
                        }
                    </div>
                </div>
            )
        }

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
                    Add Artwork
                </label>
            </span>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        artists: state.artists,
        photoSelected: state.photoSelected
    }
};

const PhotoSelectorContainer = connect(
    mapStateToProps, { uploadImage, fetchArtist, clearImageUpload }
)(PhotoSelector);

export default PhotoSelectorContainer;
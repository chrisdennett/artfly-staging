import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

import "./photo-selector-styles.css";

import ImageCropAndRotate from '../ArtworkEditor/ImageCropAndRotate';
// import PhotoEditor from '../PhotoEditor/PhotoEditor';

import { fetchArtist } from '../ArtistGallery/ArtistGalleryActions';
import { uploadImage } from '../ArtworkEditor/ArtworkEditorActions';

// The role of this component is to:
// - create a custom file input button with a given label and id
// - send it's id and the selected file to a callback function when selected
class PhotoSelector extends Component {
    constructor(props) {
        super(props);

        this.state = { imgSrc: null, cropImg:null, cropData:null , imgIsSelected: false, selectedArtistId:null, openEditImage:false};
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

                this.setState({selectedArtistId:Object.keys(artistGalleryIds)[0]})
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

    onCropImageSave(cropImg){
        this.setState({cropImg:cropImg});
    }

    onCropDataChange(imageCropAndRotateData){
        this.setState({cropData:imageCropAndRotateData, cropImg:null});
    }

    onSave(){
        // set up the new artwork
        // use a call back to set up confirmation message
        //export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null)
        const {height, width } = this.state.cropData;
        this.props.uploadImage(this.state.cropImg, this.props.user.uid, this.state.selectedArtistId, width, height);
    }

    onCancel(){
        this.setState({imgSrc: null, imgIsSelected: false });
    }

    onArtistSelected(artistId){
        this.setState({selectedArtistId:artistId})
    }

    onCropAndRotateClick(){
        this.setState({openEditImage:true})
    }

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

            let buttonStyle = { display: 'none'};
            if(this.state.cropImg){
                buttonStyle = {};
            }

            return (
                <div style={fullScreenStyle}>
                    <div style={contentStyle}>
                        <h1>New Image:</h1>
                        <button disabled={!this.state.cropImg} onClick={this.onSave.bind(this)}>SAVE</button>
                        <button onClick={this.onCancel.bind(this)}>CANCEL</button>
                        <label htmlFor="artistSelector">ARTIST: </label>
                        <select value={this.state.selectedArtistId} onChange={(e) => {this.onArtistSelected(e.target.value)}}>
                            {
                                _.map(this.props.artists, (artistData, artistId) => {

                                    return <option key={artistId}
                                                   value={artistId}>{artistData.name}</option>;
                                })
                            }
                        </select>

                        <hr/>
                        {this.state.imgSrc &&
                            <div style={{ width: '50%' }}>
                                <button disabled={!this.state.cropImg}  onClick={() => { this.cropper.openEditScreen(); }}>Crop or Rotate picture</button>
                                <ImageCropAndRotate url={this.state.imgSrc}
                                                    ref={instance => { this.cropper = instance; }}
                                                    openEditImage={this.state.openEditImage}
                                                    onCropDataChange={this.onCropDataChange.bind(this)}
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
        artists: state.artists
    }
};


const PhotoSelectorContainer = connect(
    mapStateToProps, { uploadImage, fetchArtist }
)(PhotoSelector);

export default PhotoSelectorContainer;
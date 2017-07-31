import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

import "./photo-selector-styles.css";
import ImageCropAndRotate from '../Settings/ArtworkEditor/ImageCropAndRotate';
import { fetchArtist } from '../ArtistGallery/ArtistGalleryActions';
import { uploadImage } from '../Settings/ArtworkEditor/ArtworkEditorActions';

// The role of this component is to:
// - create a custom file input button with a given label and id
// - send it's id and the selected file to a callback function when selected
class PhotoSelector extends Component {
    constructor(props) {
        super(props);

        this.state = { imgSrc: null, imgIsSelected: false, selectedArtistId:null, imgData:null };

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

    onImageSave(imageCropAndRotateData){
        this.setState({imgData:imageCropAndRotateData});
    }

    onSave(){
        // set up the new artwork
        // use a call back to set up confirmation message
        //export function uploadImage(imgFile, userId, artistId, imgWidth, imgHeight, callback = null)
        const {image, height, width } = this.state.imgData;

        this.props.uploadImage(image, this.props.user.uid, this.state.selectedArtistId, width, height);
    }

    onCancel(){
        this.setState({imgSrc: null, imgIsSelected: false });
    }

    onArtistSelected(artistId){
        this.setState({selectedArtistId:artistId})
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


            return (
                <div style={fullScreenStyle}>
                    <div style={contentStyle}>
                        <h1>New image to add</h1>
                        <button onClick={this.onSave.bind(this)}>SAVE</button>
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
                                <ImageCropAndRotate url={this.state.imgSrc}
                                                    onImageSave={this.onImageSave.bind(this)}/>
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

                {/*<input className="inputfile"
                       onChange={this.handleImageChange.bind(this)}
                       type="file" accept="image/*" capture="camera"
                       name={this.props.id} id={this.props.id}/>*/}

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
import React, { Component } from "react";
import { connect } from 'react-redux';
import Slim from '../../slim/slim.react';

import { setupForNewArtwork, setImageLoaded } from './ArtworkActions';

class Artwork extends Component {

    constructor(props){
        super(props);
        this.state = {blob:""}
    }


    componentWillMount() {
        // set up for new artwork
        this.props.setupForNewArtwork();
    }

    componentWillReceiveProps(nextProps) {
        // if the artwork Id is different from the previous id trigger loading image message
        const currentArtwork = this.props.currentArtwork;
        const nextArtwork = nextProps.currentArtwork;

        if (currentArtwork !== nextArtwork) {
            // dispatch an event that will allow artwork to prepare for loading in image
            this.props.setupForNewArtwork();
        }
    }

    onImageLoad() {
        this.props.setImageLoaded();
    }


    // called when slim has initialized
    slimInit(data, slim) {
        // slim instance reference
        console.log("slimInit > slim: ", slim.load);
        // current slim data object and slim reference
        console.log("slimInit > data: ", data);

        /* slim.load(this.props.currentArtwork.url, () => {
         console.log("callback after image loaded");
         });*/
    }

    onImageEditConfirm(imgData) {
        // crop and rotation
        const { crop, rotation } = imgData.actions;
        const { x, y, height, width } = crop;

        // original image dimensions
        const origWidth = imgData.input.width;
        const origHeight = imgData.input.height;

        // output canvas
        const outputCanvas = imgData.output.image;
        // const ctx = outputCanvas.getContext('2d');

        outputCanvas.toBlob(blob => {
            this.setState({blob:URL.createObjectURL(blob)});
        }, "image/jpeg", 10);

        /* const image = outputCanvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
         const w = window.open('about:blank', 'image from canvas');
         w.document.write("<img src='" + image + "' alt='from canvas'/>");

         console.log("image: ", image);*/

        console.log("origWidth: ", origWidth);
        console.log("origHeight: ", origHeight);
        console.log("rotation: ", rotation);
        console.log("crop x: ", x);
        console.log("crop y: ", y);
        console.log("crop height: ", height);
        console.log("crop width: ", width);
    }

    onImageTransformCancel() {
        console.log("Image transform cancelled");
    }

    render() {
        const currentArtwork = this.props.currentArtwork;
        /*let rotation = currentArtwork.rotation;
         let scaleFactor, scaledHeight, scaledWidth, imgWAfterRotation, imgHAfterRotation;
         if (!rotation) rotation = 0;
         if (rotation === 0 || rotation === 180) {
         imgWAfterRotation = currentArtwork.imgWidth;
         imgHAfterRotation = currentArtwork.imgHeight;
         }
         else {
         imgWAfterRotation = currentArtwork.imgHeight;
         imgHAfterRotation = currentArtwork.imgWidth;
         }

         scaleFactor = window.innerWidth / imgWAfterRotation;
         scaledHeight = imgHAfterRotation * scaleFactor;
         if (scaledHeight > window.innerHeight) scaleFactor = window.innerHeight / imgHAfterRotation;

         scaledWidth = Math.round(imgWAfterRotation * scaleFactor);
         scaledHeight = Math.round(imgHAfterRotation * scaleFactor);

         // let imgUrl = "https://firebasestorage.googleapis.com/v0/b/art-blam.appspot.com/o/userContent%2FRAj7f1WqphUMntmK2ar6wfzEFxe2%2F465962744.jpg?alt=media&token=944265d2-84a6-441d-a9f2-e0d96abb849b";
         const imgUrl = encodeURIComponent(currentArtwork.url);*/

        let imgStyle = {
            width: '100%',
            height: 'auto'
        };

        let loadingMessageStyle = { display: 'none' };

        if (!this.props.artwork.status || this.props.artwork.status === "setup") {
            imgStyle.display = 'none';
            loadingMessageStyle = {};
        }

        // if editing the image
        if (currentArtwork.url) {
            // crop={{ x: 0, y: 300, width: 630, height: 280 }}
            return <div>
                <h1>Artwork</h1>
                <img src={this.state.blob} alt=""/>
                <hr />
                <Slim rotation={0}
                      initialImage={currentArtwork.url}
                      didConfirm={this.onImageEditConfirm.bind(this)}
                      didCancel={this.onImageTransformCancel.bind(this)}
                      instantEdit={true}
                      buttonConfirmLabel="DONE"
                      didInit={ this.slimInit.bind(this) }/></div>;
        }

        return (
            <div>
                <h1>Artwork</h1>




                <img alt="upload" style={imgStyle} onLoad={this.onImageLoad.bind(this)} src={currentArtwork.url}/>

                <div style={loadingMessageStyle}>Artwork is being loaded...</div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        artwork: state.artwork
    }
}

export default connect(mapStateToProps, { setupForNewArtwork, setImageLoaded })(Artwork);
import React, { Component } from "react";
import { connect } from 'react-redux';
import Slim from './slim/slim.react';

import { uploadCanvasBlob } from '../ArtworkAdder/ArtworkAdderActions';

// Slim Image Cropper - docs - http://slimimagecropper.com/
class ImageCropAndRotate extends Component {

    slimConfirm(slimData) {
        const {output} = slimData;
        const {image} = output;
        image.toBlob((blob) => {
            const {userId} = this.props;
            this.props.uploadCanvasBlob(blob, userId);
        })
    }

    render() {
        return (
            <Slim download="true"
                  size="960,960"
                  didConfirm={this.slimConfirm.bind(this)}>
                <img src={this.props.url} alt=""/>
            </Slim>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userId: state.user.uid
    }
};

const ImageCropAndRotateContainer = connect(
    mapStateToProps, { uploadCanvasBlob }
)(ImageCropAndRotate);

export default ImageCropAndRotateContainer;
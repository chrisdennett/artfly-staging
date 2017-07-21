import React, { Component } from "react";
import Slim from './slim/slim.react';

// Slim Image Cropper - docs - http://slimimagecropper.com/
class ImageCropAndRotate extends Component {

    slimConfirm(slimData) {
        /*const {output} = slimData;
        const {image} = output;
        image.toBlob((blob) => {
            const {userId} = this.props;
            this.props.uploadCanvasBlob(blob, userId);
        })*/
    }

    slimSave(slimData){
        const {actions, input, output} = slimData;
        const { crop, rotation } = actions; // NB crop contains a type property which is set to manual if
        const { image } = output;
        const { type } = input;
        const { height, width } = crop;

        this.props.onImageUpdate({image, height, width, crop, rotation, type});
    }

    /*
    Can save and pass in crop information
    crop={width:300, height:600, x:20, y:40}
    */

    render() {
        return (
            <Slim download="true"
                  size="3500,3500"
                  initialImage={this.props.url}
                  didSave={this.slimSave.bind(this)}
                  didConfirm={this.slimConfirm.bind(this)}>

                {/*<img src={this.props.url} alt=""/>*/}
            </Slim>
        );
    }
}


export default ImageCropAndRotate;
import React, { Component } from "react";
import Slim from './slim/slim.react';

// Slim Image Cropper - docs - http://slimimagecropper.com/

class ImageCropAndRotate extends Component {

    // called when slim has initialized
    slimInit(data, slim) {
        // slim instance reference
        console.log(slim);

        // current slim data object and slim reference
        console.log(data);
    }

    slimConfirm(slimData) {
        const {actions, input, output} = slimData;
        const {crop, rotation} = actions;
        console.log("crop: ", crop);
        console.log("rotation: ", rotation);
        console.log("actions: ", actions);
        console.log("input: ", input);
        console.log("output: ", output);
    }

    render() {
        return (
            <Slim download="true"
                  didConfirm={this.slimConfirm.bind(this)}
                  didInit={ this.slimInit.bind(this) }>
                <img src={this.props.url} alt=""/>
            </Slim>
        );
    }
}

export default ImageCropAndRotate;
import React, { Component } from "react";
import Slim from './slim/slim.react';

// Slim Image Cropper - docs - http://slimimagecropper.com/
class ImageCropAndRotate extends Component {

    slimConfirm(slimData) {

        console.log("Confirm slimData: ", slimData);

        if (this.props.onCropDataChange) {
            const { actions, input, output } = slimData;
            const { crop, rotation } = actions; // NB crop contains a type property which is set to manual if
            const { type } = input;
            const { height, width } = crop;

            console.log("output: ", output);

            this.props.onCropDataChange({ height, width, crop, rotation, type });
        }
    }

    didInit(slimData) {

        console.log("Init slimData: ", slimData);

        if (this.props.onCropDataChange) {
            const { actions, input } = slimData;
            const { crop, rotation } = actions; // NB crop contains a type property which is set to manual if
            const { file, type } = input;
            const { height, width } = crop;

            this.props.onCropDataChange({ height, width, crop, rotation, type });
            this.props.onCropImageSave(file);
        }
    }

    /*
    Can save and pass in crop information
    crop={width:300, height:600, x:20, y:40}
    */

    /*
    Here's a way to manually trigger the cropper if want to.
    doThing(){
        const cropper = this.cropRef.instance;
        cropper.upload();
    }

    <Slim download={  ref={(cropRef) => { this.cropRef = cropRef; }}
                      ...>
    */

      // called when upload button is pressed or automatically if push is enabled
    slimService(formdata, progress, success, failure, slim) {
        const blob = formdata[0];
        // this.props.onCropImageSave({ image, height, width, crop, rotation, type });
        this.props.onCropImageSave(blob);

        // call these methods to handle upload state
        // console.log(progress, success, failure);

        success(null);
    }

    render() {
        const showDownload = this.props.showDownload ? this.props.showDownload : false;

        return (
            <div>
                <Slim download={showDownload}
                      size="3500,3500"
                      initialImage={this.props.url}
                      push="true"
                      serviceFormat="file"
                      service={ this.slimService.bind(this) }
                      didInit={this.didInit.bind(this)}
                      didConfirm={this.slimConfirm.bind(this)}>

                    {/*<img src={this.props.url} alt=""/>*/}
                </Slim>
            </div>
        );
    }
}


export default ImageCropAndRotate;
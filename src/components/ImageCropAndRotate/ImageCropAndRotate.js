import React, { Component } from "react";
import Slim from './slim/slim.react';

// Slim Image Cropper - docs - http://slimimagecropper.com/
class ImageCropAndRotate extends Component {

    slimConfirm(slimData) {
        if (this.props.onCropDataConfirm) {
            const { actions, input } = slimData;
            const { crop, rotation } = actions; // NB crop contains a type property which is set to manual if
            const { type } = input;
            const { height, width } = crop;

            this.props.onCropDataConfirm({ height, width, crop, rotation, type });
        }
    }

    didInit(slimData) {
        // triggers the creation of an image file from default canvas size
        if (this.props.callSaveOnImageLoad) {
            const cropper = this.cropRef.instance;
            cropper.upload();
        }

        if (this.props.onCropDataInit) {
            const { actions, input } = slimData;
            const { crop, rotation } = actions; // NB crop contains a type property which is set to manual if
            const { type } = input;
            const { height, width } = crop;

            this.props.onCropDataInit({ height, width, crop, rotation, type });
        }
    }

    /*
    Can save and pass in crop information
    crop={width:300, height:600, x:20, y:40}
    slim-upload-status
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

    openEditScreen() {
        const cropper = this.cropRef.instance;
        cropper.edit();
    }

    render() {
        const showDownload = this.props.showDownload ? this.props.showDownload : false;
        const callSaveOnImageLoad = this.props.callSaveOnImageLoad ? this.props.callSaveOnImageLoad : false;

        return (
            <div>
                {/*<button onClick={this.onCropAndRotateClick.bind(this)}>Crop or Rotate picture</button>*/}
                <Slim download={showDownload}
                      ref={(cropRef) => { this.cropRef = cropRef; }}
                      size="3500,3500"
                      initialImage={this.props.url}
                      callSaveOnImageLoad={callSaveOnImageLoad}
                      serviceFormat="file"
                      push="true"
                      statusUploadSuccess=""
                      service={this.slimService.bind(this)}
                      didInit={this.didInit.bind(this)}
                      didConfirm={this.slimConfirm.bind(this)}>

                    {/*<img src={this.props.url} alt=""/>*/}
                </Slim>
            </div>
        );
    }
}


export default ImageCropAndRotate;
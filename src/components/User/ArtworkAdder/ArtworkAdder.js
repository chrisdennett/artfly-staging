import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { uploadImage } from './ArtworkAdderActions';
import PhotoSelector from './PhotoSelector/PhotoSelector';

/*
 A lot of work is being done here to add the image height and width to the image
 data. This could be done as a node cloud function instead (e.g. https://github.com/image-size/image-size)
 However since we want to show a thumb anyway I'll leave it like this for now.

 Photo selector > selects an image >
 > onPhotoSelected callback triggered with file and artistId
 > imgFile and artistId saved in local state
 > having a value for state.imgFile triggers the <img /> to load
 > this triggers an onLoad event set up when mounted
 > once loaded the width and height is retrieved
 > the action is finally triggered
 */

class ArtworkAdder extends Component {
    constructor(props) {
        super(props);

        this.state = { uploadThumb: null, imgHeight: null, imgWidth: null, imgFile: null };
    }

    onPhotoSelected(imgFile, artistId) {
        // load image to get the width and the height, then call action to save to database
        // action should trigger a loading event and a finished event
        const reader = new FileReader();
        // store the data needed for the action
        // TODO: Should this be done through redux state - i.e. have a selected image reducer
        this.setState({ imgFile: imgFile, artistId: artistId });

        // When the image thumb loads grab the dimensions and trigger the action
        // which will save it to firebase storage
        reader.onload = function (event) {
            // set the local state to display the thumb.
            // this will cause the thumb to be load which will trigger the thumb
            // onload event which will finally contain all the data we need for upload.
            this.setState({ uploadThumb: event.target.result });
        }.bind(this);

        reader.readAsDataURL(imgFile);
    }

    onThumbLoad(event) {
        const imgWidth = event.target.naturalWidth;
        const imgHeight = event.target.naturalHeight;

        // pass all the data needed to the action
        this.props.uploadImage(this.state.imgFile, this.props.userId, this.state.artistId, imgWidth, imgHeight);

        // go to the Artwork Editing page
        this.props.history.push(`/artwork-editor`);
    }

    render() {
        let imgStyle = { display: 'none' };
        let uploadNotificationBox = <span style={{ display: 'none' }}/>;
        let imageLoading = false;
        const uploadInfo = this.props.imageUploader[this.props.artistId];

        if (uploadInfo) {
            imageLoading = uploadInfo.progress > 0 && uploadInfo.progress < 100;
            const isNewArtwork = this.state.uploadThumb;
            // TODO: Notification box should be it's own component.

            if (imageLoading) {
                uploadNotificationBox = <span>Image loading: {uploadInfo.progress}%</span>
            }
            else if (isNewArtwork) {
                imgStyle = { width: 60, height: "100%" };
                uploadNotificationBox =
                    <span>
                        New image loaded:
                    </span>
            }
        }

        return (
            <span>
                <PhotoSelector id={this.props.artistId}
                               key={this.props.artistId}
                               disabled={imageLoading}
                               onPhotoSelected={this.onPhotoSelected.bind(this)}/>

                {uploadNotificationBox}

                <img ref="imgThumbRef"
                     style={imgStyle}
                     onLoad={this.onThumbLoad.bind(this)}
                     src={this.state.uploadThumb}
                     alt="upload thumbnail"/>
            </span>
        );
    }
}

function mapStateToProps(state) {
    return {
        imageUploader: state.imageUploader
    }
}

export default withRouter(connect(
    mapStateToProps,
    { uploadImage })(ArtworkAdder));
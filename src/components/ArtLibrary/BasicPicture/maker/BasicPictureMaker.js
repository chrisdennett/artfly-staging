// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { addArtwork } from '../../../../actions/UserDataActions';
// components
import ArtistSelector from "../../../ArtistSelector/ArtistSelector";
import PhotoUploader from "../../../PhotoUploader/PhotoUploader";
import Butt from "../../../global/Butt";

class BasicPictureMaker extends Component {

    // Saving the artwork will create all the images and save the crop data.
    constructor() {
        super();
        // bindings
        this.onSave = this.onSave.bind(this);
        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onPhotoUploaderUpdate = this.onPhotoUploaderUpdate.bind(this);
        // state
        this.state = { selectedArtistId: '' };
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId })
    }

    onPhotoUploaderUpdate(data) {
        this.setState({ sourceBlob: data.sourceBlob });
    }

    onSave() {
        console.log("userId: ", this.props.userId);
        console.log("sourceBlob: ", this.state.sourceBlob);
        console.log("selectedArtistId: ", this.state.selectedArtistId);

        this.props.addArtwork(this.state.sourceBlob, this.props.userId, this.state.selectedArtistId, 800, 600,
            (newArtworkData) => {
                console.log("newArtworkData: ", newArtworkData);
            })

        /*
        this.state.cropImg,
        width,
        height

        this.props.addArtwork(this.state.cropImg, this.props.user.uid, selectedArtistId, width, height, (newArtworkData) => {
             this.setState({ saveTriggered: false });
             this.props.onSaveComplete(newArtworkData);
             this.props.clearImageUpload();
         });

         */
    }

    render() {
        return (
            <div>
                <h2>Basic Picture Maker</h2>
                <ArtistSelector onArtistSelected={this.onArtistSelected}/>
                <PhotoUploader onUpdate={this.onPhotoUploaderUpdate}/>

                <hr/>

                <Butt onClick={this.onSave}>SAVE Artwork</Butt>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid
    }
}

const mapActionsToProps = { addArtwork };

export default connect(mapStateToProps, mapActionsToProps)(BasicPictureMaker);
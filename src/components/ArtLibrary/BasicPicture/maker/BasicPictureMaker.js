// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { addArtwork, addThumbnail } from '../../../../actions/UserDataActions';
// components
import ArtistSelector from "../../../ArtistSelector/ArtistSelector";
import PhotoUploader from "../../../PhotoEditor/PhotoEditor";
import history from '../../../global/history';

class BasicPictureMaker extends Component {

    // Saving the artwork will create all the images and save the crop data.
    constructor() {
        super();
        // bindings
        this.onSave = this.onSave.bind(this);
        this.onArtistSelected = this.onArtistSelected.bind(this);
        // this.onPhotoUploaderUpdate = this.onPhotoUploaderUpdate.bind(this);
        // state
        this.state = { selectedArtistId: '', sourceBlob: null, thumbBlob: null, widthToHeightRatio: null, heightToWidthRatio: null };
    }

    onArtistSelected(artistId) {
        this.setState({ selectedArtistId: artistId })
    }

    /*onPhotoUploaderUpdate(data) {
        this.setState({ ...data });
    }*/

    onSave(data) {
        const { userId } = this.props;
        const { selectedArtistId } = this.state;
        const { sourceBlob, thumbBlob, widthToHeightRatio, heightToWidthRatio } = data;

        console.log("Saving artwork for userId: ", userId);

        this.props.addArtwork(userId, selectedArtistId, sourceBlob, widthToHeightRatio, heightToWidthRatio, (newArtworkData) => {
            const { artworkId, artistId } = newArtworkData;
            this.props.addThumbnail(artworkId, artistId, thumbBlob, (newThumbData) => {
                history.push(`/artStudio/${artworkId}`);
            })
        })

        //"url_thumb"

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
                <ArtistSelector onArtistSelected={this.onArtistSelected} onInitialArtistSelected={this.onArtistSelected}/>
                <PhotoUploader onSave={this.onSave}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid
    }
};

const mapActionsToProps = { addArtwork, addThumbnail };

export default connect(mapStateToProps, mapActionsToProps)(BasicPictureMaker);
// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { updateArtworkImage, updateArtworkThumbnail } from '../../actions/UserDataActions';
// components
import PhotoUploader from "../PhotoEditor/PhotoEditor";

class InlinePhotoUpdater extends Component {

    /*
    * Display the current thumb image
    * - have a button to edit
    * - save edit on change
    * - display a saving message
    * - display the updated thumb
    * */

    constructor() {
        super();

        this.onSave = this.onSave.bind(this);
    }

    onSave(newImgData) {
        const { widthToHeightRatio, heightToWidthRatio, sourceBlob, thumbBlob} = newImgData;
        const {artworkId, artistId} = this.props;
        this.props.updateArtworkImage(artworkId, artistId, sourceBlob, widthToHeightRatio, heightToWidthRatio, (returnStuff) => {
            console.log("Artwork update complete: ", returnStuff);

            this.props.updateArtworkThumbnail(artworkId, artistId, thumbBlob, () => {
                console.log("Thumbnail update complete");
            })

        })
    }

    render() {
        if (!this.props.artwork || !this.props.artistId) return null;
        const { thumb_url, url } = this.props.artwork;

        return (
            <div>
                <PhotoUploader
                    onSave={this.onSave}
                    url={url}
                    thumb_url={thumb_url}/>
            </div>
        );
    }
}

const mapActionsToProps = { updateArtworkImage, updateArtworkThumbnail };

export default connect(null, mapActionsToProps)(InlinePhotoUpdater);
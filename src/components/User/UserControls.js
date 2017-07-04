import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Slim from '../slim/slim.react';

import { fetchUserData } from './UserActions';
import { fetchGallery } from '../Gallery/GalleryActions';
import { setArtworkId } from '../Gallery/Artwork/ArtworkActions';

import Login from './Login';
import NewUserForm from './NewUserForm';
import GalleryControls from './GalleryControls/GalleryControls';

class UserControls extends Component {

    componentDidMount() {
        this.props.fetchUserData();
    }

    componentWillReceiveProps(nextProps) {
        const nextParams = nextProps.match.params;
        const { galleryId, artworkId } = nextParams;

        if (galleryId && galleryId !== this.props.gallery.galleryId) {
            this.props.fetchGallery(galleryId);
        }

        if (artworkId && artworkId !== this.props.artworkId) {
            this.props.setArtworkId(artworkId)
        }
    }

    addUserOnlyControlsIfLoggedIn() {
        if (this.props.user.status === "none" || !this.props.user || !this.props.user.uid) {
            return "";
        }

        return <Link to="/controlPanel">Control Panel</Link>;
    }

    isArtworkEditingAllowed() {
        let allowEdit = false;

        if (this.props.gallery && this.props.gallery.artworks && this.props.artworkId && this.props.gallery.artworks[this.props.artworkId]) {
            const artworkData = this.props.gallery.artworks[this.props.artworkId];
            const userId = !this.props.user.uid ? null : this.props.user.uid;

            if(userId && artworkData.curator === userId){
                allowEdit = true;
            }

        }

        return allowEdit;
    }

/*

    // called when slim has initialized
    slimInit(data, slim) {
        // slim instance reference
        console.log(slim);

        // current slim data object and slim reference
        console.log(data);
    }

    // called when upload button is pressed or automatically if push is enabled
    slimService(formdata, progress, success, failure, slim) {
        // slim instance reference
        console.log(slim);

        // form data to post to server
        console.log(formdata);

        // call these methods to handle upload state
        console.log(progress, success, failure)
    }
*/



    render() {
        const artworkIdFromUrl = this.props.match.params.artworkId;
        const galleryIdFromUrl = this.props.match.params.galleryId;
        const userStatus = this.props.user.status;
        const allowArtworkEditing = this.isArtworkEditingAllowed();


        if (userStatus === "pending") {
            return <div>Checking the salad draw...</div>
        }

        if (userStatus === "new") {
            return <NewUserForm {...this.props} />
        }

        return (
            <div>
                {/*<Slim service={ this.slimService.bind(this) }
                      didInit={ this.slimInit.bind(this) }>
                    <input type="file" accept="image/*" name="artwork"/>
                </Slim>*/}
                <Link to="/">home</Link>
                <Login />
                { this.addUserOnlyControlsIfLoggedIn()}

                <GalleryControls artworkId={artworkIdFromUrl}
                                 allowArtworkEditing={allowArtworkEditing}
                                 userGalleryId={this.props.user.galleryId}
                                 galleryIdFromUrl={galleryIdFromUrl}
                                 history={this.props.history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        gallery: state.gallery,
        artworkId: state.artwork.artworkId
    }
}

export default connect(mapStateToProps, { fetchUserData, fetchGallery, setArtworkId })(UserControls);
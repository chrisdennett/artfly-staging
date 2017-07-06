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
import ArtworkAdder from './ArtworkAdder/ArtworkAdder';

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

        const allArtistIds = Object.keys(this.props.user.artistIds);
        // just use the first one - could add a default artist value later if want to give user more control over this
        const defaultArtistId = allArtistIds[0];

        return <span>
                    <ArtworkAdder history={this.props.history}
                                  artistId={defaultArtistId}
                                  userId={this.props.user.uid}/>
                    <Link to="/myGalleries">My Galleries</Link>
                </span>;
    }

    addGalleryControlsIfNeeded(){
        const artworkIdFromUrl = this.props.match.params.artworkId;
        const galleryIdFromUrl = this.props.match.params.galleryId;
        const allowArtworkEditing = this.isArtworkEditingAllowed();

        if(!galleryIdFromUrl){
            return "";
        }

        return <GalleryControls artworkId={artworkIdFromUrl}
                                allowArtworkEditing={allowArtworkEditing}
                                userGalleryId={this.props.user.galleryId}
                                galleryIdFromUrl={galleryIdFromUrl}
                                history={this.props.history}/>
    }

    isArtworkEditingAllowed() {
        let allowEdit = false;

        if (this.props.gallery && this.props.artworks && this.props.artworkId && this.props.artworks[this.props.artworkId]) {
            const artworkData = this.props.artworks[this.props.artworkId];
            const userId = !this.props.user.uid ? null : this.props.user.uid;

            if (userId && artworkData.ownerId === userId) {
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
        const userStatus = this.props.user.status;

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
                { this.addUserOnlyControlsIfLoggedIn() }

                { this.addGalleryControlsIfNeeded() }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        gallery: state.gallery,
        artworks: state.artworks,
        artworkId: state.artwork.artworkId
    }
}

export default connect(mapStateToProps, { fetchUserData, fetchGallery, setArtworkId })(UserControls);
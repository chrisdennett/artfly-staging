import React, { Component } from "react";
import { connect } from "react-redux";
// actions
import { fetchUserArtworks, getArtworkDataOnce } from "./actions/GetArtworkActions";
import { listenForUserAuthChanges } from "./actions/UserAuthActions";
import { fetchGalleryData, fetchUserGalleries, fetchUserGalleryArtworks } from "./actions/GalleryDataActions";

class AppDataFetching extends Component {

    componentDidMount() {

        // listen out for logging in and out
        this.props.listenForUserAuthChanges();
    }

    componentDidUpdate(prevProps) {
        // if there's a user (or new user) signs in
        // fetch their galleries and artworks
        const { uid: newUid } = this.props.user;
        const { uid: currentUid } = prevProps.user;

        if (newUid && newUid !== currentUid) {
            this.props.fetchUserArtworks(newUid);
            this.props.fetchUserGalleries(newUid);
        }

        // if there's an artwork or gallery id, fetch it
        const {artworkId, galleryId} = this.props.params;

        // fetch global data
        if (artworkId) {
            // if there's an artwork param listen get that data first
            this.props.getArtworkDataOnce(artworkId);
        }
        if (galleryId) {
            this.props.fetchGalleryData(galleryId, (gallery) => {
                // user gallery refers to the gallery type
                // this will still work if nobody is signed in
                this.props.fetchUserGalleryArtworks(gallery);
            });
        }
    }

    render() {
        const {children} = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapActionsToProps = {
    listenForUserAuthChanges,
    fetchUserArtworks,
    getArtworkDataOnce,
    fetchUserGalleries,
    fetchGalleryData,
    fetchUserGalleryArtworks
};
export default connect(mapStateToProps, mapActionsToProps)(AppDataFetching);

import React from "react";
import { connect } from 'react-redux';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// actions
import { fetchUserArtworks, getArtworkDataOnce } from "./actions/GetArtworkActions";
import { listenForUserAuthChanges } from "./actions/UserAuthActions";
import { fetchUserAccount } from "./actions/UserAccountActions";
import { fetchGalleryData, fetchUserGallery, fetchUserGalleryArtworks } from "./actions/GalleryDataActions";
// selectors
import { getCurrentPageComponent, findMissingData } from "./AppRouteSelector";

class ArtflyRouting extends React.Component {

    componentDidMount() {
        // listen out for logging in and out
        this.props.listenForUserAuthChanges();
    }

    componentDidUpdate(prevProps) {
        const { uid: newUid } = this.props.user;
        const { uid: currentUid } = prevProps.user;

        if (newUid && newUid !== currentUid) {
            this.props.fetchUserAccount(newUid);
            this.props.fetchUserGallery(newUid);
            this.props.fetchUserArtworks(newUid);
        }

        const { missingData } = this.props;
        if (missingData) {
            const { artworkId, galleryId } = missingData;
            if (artworkId) {
                this.props.getArtworkDataOnce(artworkId);
            }

            if (galleryId) {
                this.props.fetchGalleryData(galleryId);
            }
        }
    }

    render() {
        const { currentPage } = this.props;
        return (
            <div>
                {currentPage}
            </div>
        )
    }
}

const mapAppStateToProps = (state) => {
    return {
        user: state.user,
        missingData: findMissingData(state),
        currentPage: getCurrentPageComponent(state)
    }
};
const mapActionsToProps = {
    listenForUserAuthChanges,
    fetchUserArtworks,
    getArtworkDataOnce,
    fetchUserAccount,
    fetchUserGallery,
    fetchGalleryData,
    fetchUserGalleryArtworks
};
export default connect(mapAppStateToProps, mapActionsToProps)(ArtflyRouting);

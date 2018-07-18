import React from "react";
import { connect } from 'react-redux';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// actions
import {fetchLocalPrice} from "../actions/PaddleActions";
import { fetchUserArtworks, getArtworkDataOnce } from "../actions/GetArtworkActions";
import { listenForUserAuthChanges } from "../actions/UserAuthActions";
import { fetchUserAccount } from "../actions/UserAccountActions";
import { listenForUserSubscriptionChanges } from "../actions/UserSubscriptionActions";
import { UpdateUrl } from "../actions/UrlActions";
import { fetchGalleryData, fetchUserGallery, fetchUserGalleryArtworks } from "../actions/GalleryDataActions";
// selectors
import { getCurrentPageComponent, findMissingData, getRedirectPath } from "./AppRouteSelector";
import ArtworkEditorSavingProgress from "./artworkEditor/ArtworkEditorSavingProgress";

class ArtflyRouting extends React.Component {

    componentDidMount() {
        // listen out for logging in and out
        this.props.listenForUserAuthChanges();
    }

    componentDidUpdate(prevProps) {
        const { uid: newUid } = this.props.user;
        const { uid: currentUid } = prevProps.user;
        const { redirectPath } = this.props;

        // call redirect if state determines it's needed
        if (redirectPath) {
            this.props.UpdateUrl(redirectPath);
            return;
        }

        if (newUid && newUid !== currentUid) {
            this.props.fetchUserGallery(newUid);
            this.props.fetchUserArtworks(newUid);
            this.props.fetchLocalPrice();
            this.props.fetchUserAccount(newUid);
            // listening for account changes because it can be changed
            // externally by the Paddle API
            this.props.listenForUserSubscriptionChanges(newUid);
        }

        const { missingData } = this.props;
        if (missingData) {
            const { artworkId, galleryId } = missingData;
            if (artworkId) {
                this.props.getArtworkDataOnce(artworkId);
            }

            if (galleryId) {
                this.props.fetchGalleryData(galleryId, (galleryData) => {
                    this.props.fetchUserGalleryArtworks(galleryData.key)
                });
            }
        }
    }

    render() {
        const { currentPage } = this.props;
        return (
            <div>
                <ArtworkEditorSavingProgress/>
                {currentPage}
            </div>
        );
    }
}

const mapAppStateToProps = (state) => {
    return {
        user: state.user,
        redirectPath: getRedirectPath(state),
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
    UpdateUrl,
    fetchUserGalleryArtworks,
    fetchLocalPrice,
    listenForUserSubscriptionChanges
};
export default connect(mapAppStateToProps, mapActionsToProps)(ArtflyRouting);

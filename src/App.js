import React from "react";
import { connect } from 'react-redux';
import CookieConsent from "react-cookie-consent"; // cookie consent
// ui
import { Button } from 'rmwc/Button';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// actions
import { fetchLocalPrice } from "./actions/PaddleActions";
import { fetchUserArtworks, getArtworkDataOnce } from "./actions/GetArtworkActions";
import { listenForUserAuthChanges } from "./actions/UserAuthActions";
import { fetchUserAccount } from "./actions/UserAccountActions";
import { listenForUserSubscriptionChanges } from "./actions/UserSubscriptionActions";
import { UpdateUrl } from "./actions/UrlActions";
import { fetchGalleryData, fetchUserGallery, fetchUserGalleryArtworks } from "./actions/GalleryDataActions";
// selectors
import { getCurrentPageComponent, findMissingData, getRedirectPath } from "./AppRouteSelector";
import ArtworkEditorSavingProgress from "./pages/artworkEditor/ArtworkEditorSavingProgress";

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
            this.props.fetchLocalPrice();
            this.props.fetchUserAccount(newUid);
            this.props.fetchUserArtworks(newUid);
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
        const { currentPage, UpdateUrl } = this.props;

        return (
            <div>
                <ArtworkEditorSavingProgress/>
                {currentPage}

                <CookieConsent debug={false} buttonText="Okay, got it" buttonStyle={{ fontSize: 18 }}>
                    This website uses cookies. Check our <Button dense
                                                                 tag={'a'}
                                                                 style={{ color: '#fff', textDecoration: 'underline' }}
                                                                 onClick={() => UpdateUrl('/privacyPolicy')}>
                    privacy policy</Button> for more detail.
                </CookieConsent>
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

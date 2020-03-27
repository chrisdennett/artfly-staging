import React from "react";
import { connect } from 'react-redux';
import CookieConsent from "react-cookie-consent"; // cookie consent
import { Offline } from "react-detect-offline";
import 'blueimp-canvas-to-blob';
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
// selectors
import { getCurrentPageComponent, findMissingData, getRedirectPath } from "./AppRouteSelector";
// comps
import ArtworkEditorSavingProgress from "./pages/artworkEditor/ArtworkEditorSavingProgress";
import { getCurrentGalleryIdParam } from "./selectors/Selectors";
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import OfflineMessage from "./components/offlineMessage/OfflineMessage";

class ArtflyRouting extends React.Component {

    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        // listen out for logging in and out
        this.props.listenForUserAuthChanges();

        if (this.props.galleryId) {
            this.props.fetchUserArtworks(this.props.galleryId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchData(prevProps);
    }

    fetchData(prevProps) {
        const { uid: newUid } = this.props.user;
        const { uid: currentUid } = prevProps.user;
        const { redirectPath } = this.props;

        // call redirect if state determines it's needed
        if (redirectPath) {
            this.props.UpdateUrl(redirectPath);
            return;
        }

        if (newUid && newUid !== currentUid) {
            this.props.fetchLocalPrice();
            this.props.fetchUserAccount(newUid);
            this.props.fetchUserArtworks(newUid);
            // listening for account changes because it can be changed
            // externally by the Paddle API
            this.props.listenForUserSubscriptionChanges(newUid);
        }

        if (this.props.galleryId) {
            if (!prevProps || prevProps.galleryId !== this.props.galleryId) {
                this.props.fetchUserArtworks(this.props.galleryId);
            }
        }

        const { missingData } = this.props;
        if (missingData) {
            const { artworkId } = missingData;

            if (artworkId) {
                this.props.getArtworkDataOnce(artworkId);
            }
        }
    }

    render() {
        const { currentPage, UpdateUrl } = this.props;

        return (
            <ErrorBoundary>
                <Offline>
                    <OfflineMessage />
                </Offline>

                <ArtworkEditorSavingProgress />
                {currentPage}

                <CookieConsent debug={false} buttonText="Okay, got it" buttonStyle={{ fontSize: 18 }}>
                    This website uses cookies. Check our <Button dense
                        tag={'a'}
                        style={{ color: '#fff', textDecoration: 'underline' }}
                        onClick={() => UpdateUrl('/privacyPolicy')}>
                        privacy policy</Button> for more detail.
                </CookieConsent>


            </ErrorBoundary>
        );
    }
}

const mapAppStateToProps = (state) => {
    return {
        user: state.user,
        redirectPath: getRedirectPath(state),
        missingData: findMissingData(state),
        currentPage: getCurrentPageComponent(state),
        galleryId: getCurrentGalleryIdParam(state)
    }
};
const mapActionsToProps = {
    listenForUserAuthChanges,
    fetchUserArtworks,
    getArtworkDataOnce,
    fetchUserAccount,
    UpdateUrl,
    fetchLocalPrice,
    listenForUserSubscriptionChanges
};
export default connect(mapAppStateToProps, mapActionsToProps)(ArtflyRouting);

// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import ga from './libs/googleAnalyticsConfig';
// global styles
import './style.css';
// actions
import { listenForUserChanges } from './actions/UserDataActions';
import { fetchLocalPrice } from './actions/PaddleActions';
// components
import history from './components/global/history';
import Redirect from "./components/global/Redirect";
import WindowController from "./components/global/WindowDimensionsTracker";
import AppControls from "./components/AppControls/AppControls";
// route components
import Home from './components/Home/Home';
import ArtistGalleryContainer from './components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "./components/Settings/SettingsContainer";
import ArtistEditorContainer from "./components/ArtistEditor/ArtistEditorContainer";
import NewUserFormContainer from "./components/NewUser/NewUserFormContainer";
import ArtworkContainer from './components/Artwork/ArtworkContainer';
import ArtworkEditorContainer from "./components/ArtworkEditor/ArtworkEditorContainer";
import FourOhFour from "./components/FourOhFour/FourOhFour";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
//
import ImageCuttingBoard from './components/ImageCuttingBoard/ImageCuttingBoard';

const IN_BETA_MODE = true;

const routes = {
    cut: { component: ImageCuttingBoard },
    home: { component: Home },
    gallery: { component: ArtistGalleryContainer },
    artwork: { component: ArtworkContainer },
    settings: { component: SettingsContainer, adminOnly: true },
    artworkEditor: { component: ArtworkEditorContainer, adminOnly: true },
    addOrEditArtist: { component: ArtistEditorContainer, adminOnly: true },
    newUser: { component: NewUserFormContainer, adminOnly: true }
};

class ArtflyRouting extends Component {
    constructor(props) {
        super(props);
        this.state = { unlisten: null, params: null };
    }

    componentDidMount() {
        // fetch global data - determines routing
        this.props.listenForUserChanges();
        this.props.fetchLocalPrice();
        // set up routing
        const location = history.location;
        this.setPageData(location.pathname);
        const unlisten = history.listen((location) => {
            this.setPageData(location.pathname);
        });
        this.setState({ unlisten: unlisten });
    }

    componentWillUnmount() {
        this.state.unlisten();
    }

    setPageData(fullPath) {
        let page, params = {};

        if (fullPath === '/') {
            page = 'home';
        }
        else {
            const sections = fullPath.split('/').slice(1);
            page = sections[0];

            if (page === 'gallery') {
                params.galleryId = sections[1];

                if (sections[2]) {
                    page = 'artwork';
                    params.artworkId = sections[3];
                }
            }
            else if (page === 'artworkEditor') {
                params.artworkId = sections[1];
            }
            else if (page === 'addOrEditArtist') {
                params.artistId = sections[1];
            }
            else if (page === 'newUser') {
                params.userId = sections[1];
            }
        }

        this.setState(() => {
            return {
                page: page,
                params: params
            }
        });

        ga.set({ page: page });
        ga.pageview(fullPath);
    }

    render() {
        const { page, params } = this.state;
        const PageComponent = routes[page] ? routes[page].component : FourOhFour;
        const adminOnly = routes[page] && routes[page].adminOnly ? routes[page].adminOnly : false;
        const PageComponentWithProps = <PageComponent {...params} />;

        if (!this.props.user.status || this.props.user.status === 'pending') {
            return <LoadingOverlay/>
        }

        if (adminOnly) {
            if (this.props.user.status === 'none') {
                return <Redirect to={'/'}/>;
            }
        }

        // Send new users (signed in with google of facebook for the first time)
        // ... to set up basic user data
        if (this.props.user.status === 'new' && page !== 'newUser') {
            return <Redirect to={'/newUser'}/>;
        }

        const showTopControls = IN_BETA_MODE === false || this.props.user.status !== 'none';

        return (
            <div>
                {showTopControls &&
                <AppControls {...params} user={this.props.user}/>
                }
                <WindowController>
                    {PageComponentWithProps}
                </WindowController>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
};

export default connect(
    mapStateToProps, { listenForUserChanges, fetchLocalPrice }
)(ArtflyRouting);
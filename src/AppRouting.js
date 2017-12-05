// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
import ga from './libs/googleAnalyticsConfig';
// styles
import './globalStyles.css';
import './app/appStyles.css';
// actions
import { listenForUserChanges } from './actions/UserDataActions';
import { fetchLocalPrice } from './actions/PaddleActions';
// components
import history from './app/global/history';
import Redirect from "./app/global/Redirect";
// route components
import Home from './app/Home/Home';
import GalleryContainer from './app/Gallery/GalleryContainer';
import SettingsContainer from "./app/Settings/SettingsContainer";
import ArtistEditorContainer from "./app/ArtistEditor/ArtistEditorContainer";
import NewUserFormContainer from "./app/NewUser/NewUserFormContainer";
import ArtworkContainer from './app/Artwork/ArtworkContainer';
import ArtStudio from "./app/ArtStudio/ArtStudio";
import FourOhFour from "./app/FourOhFour/FourOhFour";
import LoadingOverlay from "./app/global/LoadingOverlay";
import StyleGuide from "./app/StyleGuide/StyleGuide";
import App from "./app/App";
//

const routes = {
    styleGuide: { component: StyleGuide },
    home: { component: Home },
    gallery: { component: GalleryContainer },
    artwork: { component: ArtworkContainer },
    settings: { component: SettingsContainer, adminOnly: true },
    artStudio: { component: ArtStudio, adminOnly: true },
    addOrEditArtist: { component: ArtistEditorContainer, adminOnly: true },
    newUser: { component: NewUserFormContainer, adminOnly: true }
};

class ArtflyRouting extends Component {
    constructor() {
        super();
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

            switch (page) {
                case 'gallery':
                    params.galleryId = sections[1];

                    if (sections[2]) {
                        page = 'artwork';
                        params.artworkId = sections[3];
                    }
                    break;

                case 'artworkEditor':
                    params.artworkId = sections[1];
                    break;

                case 'artStudio':
                    if (!sections[1] || sections[1] === 'new') {
                        params.artworkId = 'new';
                        if (sections[2]) {
                            params.selectedArtistId = sections[2];
                        }
                    }
                    else {
                        params.artworkId = sections[1];
                        if (sections[2]) {
                            params.currentEditScreen = sections[2];
                        }
                    }
                    break;

                case 'addOrEditArtist':
                    params.artistId = sections[1];
                    break;

                case 'newUser':
                    params.userId = sections[1];
                    break;

                default:
                    break;
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
        const PageComponentWithProps = <PageComponent {...params}/>;

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

        return (
            <App params={params}>
                {PageComponentWithProps}
            </App>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapActionsToProps = { listenForUserChanges, fetchLocalPrice };

export default connect(mapStateToProps, mapActionsToProps)(ArtflyRouting);
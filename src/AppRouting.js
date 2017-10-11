// Externals
import React, { Component } from "react";
import ga from './libs/googleAnalyticsConfig';
// global styles
import './style.css';
// Components
import history from './components/global/history';
import WindowController from "./components/global/WindowDimensionsTracker";
import AppControls from "./components/AppControls/AppControls";
import ArtistGalleryContainer from './components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "./components/Settings/SettingsContainer";
import ArtistEditorContainer from "./components/ArtistEditor/ArtistEditorContainer";
import UserEditorContainer from "./components/UserEditor/UserEditorContainer";
import ArtworkContainer from './components/Artwork/ArtworkContainer';
import ArtworkEditorContainer from "./components/ArtworkEditor/ArtworkEditorContainer";
import Home from './components/Home/Home';
import FourOhFour from "./components/FourOhFour/FourOhFour";
import AppDataFetcher from "./AppDataFetcher";

const routes = {
    home: { component: Home },
    gallery: { component: ArtistGalleryContainer },
    artwork: { component: ArtworkContainer },
    settings: { component: SettingsContainer, adminOnly:true },
    artworkEditor: { component: ArtworkEditorContainer, adminOnly:true  },
    addOrEditArtist: { component: ArtistEditorContainer, adminOnly:true  },
    addOrEditUser: { component: UserEditorContainer, adminOnly:true  }
};

class ArtflyRouting extends Component {

    constructor(props) {
        super(props);
        this.state = { unlisten: null, params: null };
    }

    componentDidMount() {
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
            else if (page === 'addOrEditUser') {
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
        const {page, params} = this.state;
        const PageComponent = routes[page] ? routes[page].component : FourOhFour;
        const adminOnly = routes[page] && routes[page].adminOnly ? routes[page].adminOnly : false;
        const PageComponentWithProps = <PageComponent {...params} />;

        return (
            <AppDataFetcher adminOnly={adminOnly} {...params}>
                <AppControls {...params}/>
                <WindowController>
                    {PageComponentWithProps}
                </WindowController>
            </AppDataFetcher>
        );
        // return <App page={this.state.page} params={this.state.params}/>
    }
}

export default ArtflyRouting;
// externals
import React, { Component } from "react";
import ga from './libs/googleAnalyticsConfig';
// app styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// helpers
import history from './app/global/history';
// route components
import Home from './app/Home/Home';
import FourOhFour from "./app/FourOhFour/FourOhFour";
import UserProfile from "./app/userProfile/UserProfile";
import UserDelete from "./app/userDelete/UserDelete";
import ArtworkAdder from "./app/artworkAdder/ArtworkAdder";
import TestPage from "./app/testPage/TestPage";
import ArtworkEditor from "./app/artworkEditor/ArtworkEditor";
import AppDataFetching from "./AppDataFetching";
import GalleryArtworkViewer from "./app/gallery/GalleryArtworkViewer";
import GalleryHome from "./app/gallery/GalleryHome";
import GalleryEditor from "./app/gallery/GalleryEditor";

class ArtflyRouting extends Component {
    constructor(props) {
        super(props);
        this.state = { unlisten: null, params: {} };
    }

    componentDidMount() {
        // set up routing
        const location = history.location;
        this.setPageData(location.pathname);
        const unlisten = history.listen((location) => {
            this.setPageData(location.pathname);
        });
        this.setState({ unlisten: unlisten });
    }

    componentWillUnmount() {
        // stop listening for route changes
        this.state.unlisten();
    }

    getParams(url) {
        const paramKeys = ['artworkId', 'galleryId', 'step'];
        const params = {};

        for (let key of paramKeys) {
            if (url.indexOf(`${key}_`) !== -1) {
                const startTag = `${key}_`;
                const endTag = `_${key}`;
                const startIndex = url.indexOf(startTag) + startTag.length;
                const endIndex = url.indexOf(endTag);

                params[key] = url.slice(startIndex, endIndex);
            }
        }

        return params;
    }

    setPageData(fullPath) {
        const page = fullPath === '/' ? 'home' : fullPath.split('/').slice(1)[0];
        const params = this.getParams(fullPath);

        // document.body.scrollTop = 0;

        this.setState({ page, params });
        /* setTimeout(() => {
             console.log("page: ", page);
             window.scrollTo(0,0);
         }, 1);*/

        ga.set({ page: page });
        ga.pageview(fullPath);
    }

    render() {
        const { page, params } = this.state;
        const PageComponentWithProps = getPageComponent(page, params);

        return (
            <AppDataFetching params={params}>
                {PageComponentWithProps}
            </AppDataFetching>
        );
    }
}

export default ArtflyRouting;

function getPageComponent(page, params) {

    const { artworkId, galleryId } = params;
    let PageComponent;

    switch (page) {
        case 'home':
            PageComponent = Home;
            break;

        case 'gallery':
            // gallery can either be showing an artwork
            if (galleryId && artworkId) PageComponent = GalleryArtworkViewer;
            // or showing the gallery home page
            else if (galleryId) PageComponent = GalleryHome;
            // or if missing params go home
            else PageComponent = Home;
            break;

        case 'galleryEditor':
            PageComponent = GalleryEditor;
            break;

        case 'profile':
            PageComponent = UserProfile;
            break;

        case 'delete':
            PageComponent = UserDelete;
            break;

        case 'artworkAdder':
            PageComponent = ArtworkAdder;
            break;

        case 'artworkEditor':
            PageComponent = ArtworkEditor;
            break;

        case 'TESTING':
            PageComponent = TestPage;
            break;

        default:
            PageComponent = FourOhFour;
    }

    return <PageComponent {...params} />;
}

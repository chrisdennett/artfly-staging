import React, { Component } from "react";
import {connect} from 'react-redux';
import ga from './libs/googleAnalyticsConfig';
// styles
import 'material-components-web/dist/material-components-web.min.css';
import './appStyles.css';
// route components
import Home from './app/home/Home';
import FourOhFour from "./app/fourOhFour/FourOhFour";
import UserAccountScreens from "./app/userAccountScreens/UserAccountScreens";
import ArtworkAdder from "./app/artworkAdder/ArtworkAdder";
import TestPage from "./app/testPage/TestPage";
import ArtworkEditor from "./app/artworkEditor/ArtworkEditor";
import AppDataFetching from "./AppDataFetching";
import GalleryArtworkViewer from "./app/gallery/GalleryArtworkViewer";
import GalleryHome from "./app/gallery/GalleryHome";
import GalleryEditor from "./app/gallery/GalleryEditor";
import AccountDelete from "./app/userAccountScreens/accountDelete/AccountDelete";
import AccountSubscription from "./app/userAccountScreens/accountSubscription/AccountSubscription";

class ArtflyRouting extends Component {
    constructor(props) {
        super(props);
        this.state = { unlisten: null, params: {} };
    }

    componentDidMount() {
        // set up routing
        /*const location = history.location;
        this.setPageData(location.pathname);
        const unlisten = history.listen((location) => {
            this.setPageData(location.pathname);
        });
        this.setState({ unlisten: unlisten });*/
    }

    componentWillUnmount() {
        // stop listening for route changes
        // this.state.unlisten();
    }

    setPageData(fullPath) {
        /*const page = fullPath === '/' ? 'home' : fullPath.split('/').slice(1)[0];
        const params = getParams(fullPath);

        this.setState({ page, params });
         setTimeout(() => {
             console.log("page: ", page);
             window.scrollTo(0,0);
         }, 1);

        ga.set({ page: page });
        ga.pageview(fullPath);*/
    }

    render() {
        const { params } = this.state;
        const { currentPage } = this.props;

        return (
            <AppDataFetching params={params}>
                {currentPage}
            </AppDataFetching>
        );
    }
}

const mapAppStateToProps = (state) => {
  return {
      currentPage: getCurrentPageComponent(state)
  }
};

export default connect(mapAppStateToProps)(ArtflyRouting);

const getCurrentPageComponent = (state) => {
  const {routing} = state;

  if(!routing.pathname) return Home;

    const page = routing.pathname === '/' ? 'home' : routing.pathname.split('/').slice(1)[0];
    const params = getParams(routing.pathname);

    console.log("page: ", page);
    console.log("params: ", params);

    return getPageComponent(page, params);
};

const getParams = (url) => {
    const paramKeys = ['artworkId', 'galleryId', 'editor'];
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
};

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
            PageComponent = UserAccountScreens;
            break;

        case 'accountSubscription':
            PageComponent = AccountSubscription;
            break;

        case 'accountDelete':
            PageComponent = AccountDelete;
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

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
import Gallery from "./app/gallery/Gallery";
import ArtworkEditor from "./app/artworkEditor/ArtworkEditor";
import AppDataFetching from "./AppDataFetching";

const routes = {
    home: { component: Home },
    profile: { component: UserProfile },
    delete: { component: UserDelete },
    gallery: { component: Gallery },
    artworkAdder: { component: ArtworkAdder },
    artworkEditor: { component: ArtworkEditor },

    TESTING: { component: TestPage }
};

class ArtflyRouting extends Component {
    constructor(props) {
        super(props);
        this.state = { unlisten: null, params: null };
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
        let page;
        const params = this.getParams(fullPath);

        if (fullPath === '/') {
            page = 'home';
        }
        else {
            const sections = fullPath.split('/').slice(1);
            page = sections[0];
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
        const PageComponentWithProps = <PageComponent {...params} page={page}/>;

        return (
            <AppDataFetching params={params} page={page}>
                {PageComponentWithProps}
            </AppDataFetching>
        );
    }
}

export default ArtflyRouting;

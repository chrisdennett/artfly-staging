import React from "react";
import ga from './libs/googleAnalyticsConfig';
//
import TestPage from "./app/testPage/TestPage";
import GalleryArtworkViewer from "./app/gallery/GalleryArtworkViewer";
import GalleryHome from "./app/gallery/GalleryHome";
import ArtworkAdder from "./app/artworkAdder/ArtworkAdder";
import ArtworkEditor from "./app/artworkEditor/ArtworkEditor";
import GalleryEditor from "./app/gallery/GalleryEditor";
import FourOhFour from "./app/fourOhFour/FourOhFour";
import Home from "./app/home/Home";
import UserAccountScreens from "./app/userAccountScreens/UserAccountScreens";
import AccountSubscription from "./app/userAccountScreens/accountSubscription/AccountSubscription";
import AccountDelete from "./app/userAccountScreens/accountDelete/AccountDelete";

export const getRouteParams = state => getParams(state.routing.pathname);

export const getCurrentPageComponent = (state) => {
    const { routing } = state;

    if (!routing.pathname) return Home;

    const page = routing.pathname === '/' ? 'home' : routing.pathname.split('/').slice(1)[0];
    const params = getParams(routing.pathname);

    // this should be called after any redirect manipulation
    ga.set({ page: page });
    ga.pageview(routing.pathname);

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
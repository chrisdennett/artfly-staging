import React from "react";
import ga from './libs/googleAnalyticsConfig';
// store - where the entire app state lives
import store from './store/store';
//
import TestPage from "./app/testPage/TestPage";
import GalleryArtworkViewer from "./app/gallery/GalleryArtworkViewer";
import GalleryHome from "./app/gallery/GalleryHome";
import ArtworkAdder from "./app/artworkAdder/ArtworkAdder";
import ArtworkEditor from "./app/artworkEditor/ArtworkEditor";
import GalleryEditor from "./app/gallery/GalleryEditor";
import FourOhFour from "./app/fourOhFour/FourOhFour";
import Home from "./app/home/Home";
import UserSignIn from "./app/userSignIn/UserSignIn";
import UserProfile from "./app/userProfile/UserProfile";
import AccountSubscription from "./app/userAccountSubscription/UserAccountSubscription";
import AccountDelete from "./app/userAccountDelete/UserAccountDelete";
import UserAccountDeleted from "./app/userAccountDeleted/UserAccountDeleted";
import { UpdateUrl } from "./actions/UrlActions";

export const findMissingData = state => {
    const { routing, artworks, galleries } = state;

    if (!routing.pathname) return null;
    const params = getParams(routing.pathname);
    const { artworkId, galleryId } = params;

    if (!artworkId && !galleryId) return null;

    let missingData = {};

    // ARTWORK
    if (artworkId && !artworks[artworkId]) {
        missingData.artworkId = artworkId;
    }

    // GALLERY
    if (galleryId && !galleries[galleryId]) {
        missingData.galleryId = galleryId;
    }

    return missingData;
};

export const getCurrentPageComponent = (state) => {
    const { routing, user } = state;

    if (!routing.pathname) return Home;

    const page = routing.pathname === '/' ? 'home' : routing.pathname.split('/').slice(1)[0];
    const params = getParams(routing.pathname);

    // this should be called after any redirect manipulation
    ga.set({ page: page });
    ga.pageview(routing.pathname);

    const { artworkId, galleryId, editor } = params;

    if (state.account && state.account.status === 'deleted') {
        return <UserAccountDeleted/>
    }

    if (page === 'home') {
        return <Home/>;
    }

    if (page === 'gallery') {
        // gallery can either be showing an artwork
        if (galleryId && artworkId) return <GalleryArtworkViewer galleryId={galleryId} artworkId={artworkId}/>;
        // or showing the gallery home page
        else if (galleryId) return <GalleryHome galleryId={galleryId}/>;
        // or if missing params go home
        else return <Home/>;
    }

    if (page === 'galleryEditor') {
        return <GalleryEditor galleryId={galleryId}/>;
    }

    if(page === 'signIn'){
        return <UserSignIn/>
    }

    if (page === 'profile') {
        if (user.uid) {
            return <UserProfile/>;
        }
        else{
            store.dispatch(UpdateUrl('/'));
            return <Home />
        }
    }

    if (page === 'accountSubscription') {
        return <AccountSubscription/>;
    }

    if (page === 'accountDelete') {
        // store.dispatch(UpdateUrl('/'));
        // return <Home />
        return <AccountDelete/>;
    }

    if (page === 'artworkAdder') {
        return <ArtworkAdder galleryId={galleryId}/>;
    }
    if (page === 'artworkEditor') {
        return <ArtworkEditor galleryId={galleryId} artworkId={artworkId} editor={editor}/>;
    }
    if (page === 'TESTING') {
        return <TestPage/>;
    }

    // if got this far don't know what it is
    return <FourOhFour/>;
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
import React from "react";
import ga from './libs/googleAnalyticsConfig';
// store - where the entire components state lives
// import store from '../store/store';
//
import TestPage from "./components/testPage/TestPage";
import GalleryArtworkViewer from "./pages/gallery/GalleryArtworkViewer";
import GalleryHome from "./pages/gallery/GalleryHome";
import ArtworkAdder from "./pages/artworkAdder/ArtworkAdder";
import ArtworkEditor from "./pages/artworkEditor/ArtworkEditor";
import FourOhFour from "./components/fourOhFour/FourOhFour";
import Home from "./pages/home/Home";
import UserSignIn from "./pages/userSignIn/UserSignIn";
import UserProfile from "./pages/userProfile/UserProfile";
import AccountSubscription from "./pages/userAccountSubscription/UserAccountSubscription";
import AccountDelete from "./pages/userAccountDelete/UserAccountDelete";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/termsOfService/TermsOfService";
import Support from "./pages/support/Support";
// import UserAccountDeleted from "./userAccountDeleted/UserAccountDeleted";
// import { UpdateUrl } from "../actions/UrlActions";

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

export const getRedirectPath = (state) => {
    const { routing, account, user, artworks } = state;

    // if there's no pathname go home
    if (!routing.pathname) return '/';

    // const page = routing.pathname === '/' ? 'home' : routing.pathname.split('/').slice(1)[0];
    const params = getParams(routing.pathname);

    // no matter what path it is, if the account has been deleted take them to the
    // delete page to create a new account or continue with deletion process.
    if (routing.pathname !== '/accountDelete' && account && account.status === 'deleted') {
        return '/accountDelete';
    }

    const adminOnlyPaths = ['/profile', '/accountSubscription', '/accountDelete', '/artworkAdder', '/artworkEditor'];
    // if trying to go to an admin only page and user not logged in redirect to log in
    if (!user.uid && adminOnlyPaths.indexOf(routing.pathname) !== -1) {
        // redirect to home page
        return '/';
    }

    // if an artwork is missing go to the gallery if available or home if not
    if (params.artworkId && artworks[params.artworkId]) {
        const isMissing = artworks[params.artworkId] === 'missing';
        const isDeleted = artworks[params.artworkId].isDeleted;

        if (isMissing || isDeleted) {
            if (params.galleryId) {
                return `/gallery/galleryId_${params.galleryId}_galleryId`;
            }
            else {
                return '/';
            }
        }
    }

    return null;
};

export const getCurrentPageComponent = (state) => {
    const { routing } = state;

    if (!routing.pathname) return Home;

    const page = routing.pathname === '/' ? 'home' : routing.pathname.split('/').slice(1)[0];
    const params = getParams(routing.pathname);

    // this should be called after any redirect manipulation
    ga.set({ page: page });
    ga.pageview(routing.pathname);

    const { artworkId, galleryId, editor } = params;

    switch (page) {
        case 'home':
            return <Home/>;

        case 'gallery':
            // gallery can either be showing an artwork
            if (galleryId && artworkId) return <GalleryArtworkViewer galleryId={galleryId} artworkId={artworkId}/>;
            // or showing the gallery home page
            else if (galleryId) return <GalleryHome galleryId={galleryId}/>;
            // or if missing params go home
            else return <Home/>;

        case 'signIn':
            return <UserSignIn show={'signIn'}/>;

        case 'signUp':
            return <UserSignIn show={'signUp'}/>;

        case 'profile':
            return <UserProfile/>;

        case 'accountSubscription':
            return <AccountSubscription/>;

        case 'accountDelete':
            return <AccountDelete/>;

        case 'artworkAdder':
            return <ArtworkAdder galleryId={galleryId}/>;

        case 'artworkEditor':
            return <ArtworkEditor galleryId={galleryId} artworkId={artworkId} editor={editor}/>;

        case 'support':
            return <Support/>;

        case 'privacyPolicy':
            return <PrivacyPolicy/>;

        case 'termsOfService':
            return <TermsOfService/>;

        case 'TESTING':
            return <TestPage/>;

        default:
            return <FourOhFour/>;
    }
};

export const getParams = (url) => {
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
import React from "react";
import ga from './libs/googleAnalyticsConfig';
//
import TestPage from "./components/testPage/TestPage";
import GalleryArtworkViewer from "./pages/artworkViewer/GalleryArtworkViewer";
import GalleryHome from "./pages/gallery/GalleryHome";
import FourOhFour from "./components/fourOhFour/FourOhFour";
import Home from "./pages/home/Home";
import UserSignIn from "./pages/userSignIn/UserSignIn";
import UserProfile from "./pages/userProfile/UserProfile";
import AccountSubscription from "./pages/userAccountSubscription/UserAccountSubscription";
import AccountDelete from "./pages/userAccountDelete/UserAccountDelete";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/termsOfService/TermsOfService";
import Support from "./pages/support/Support";
import ArtworkMaker from "./pages/artworkMaker/ArtworkMaker";
import { GALLERY_PATH } from "./components/global/UTILS";

export const findMissingData = state => {
    const { routing, artworks } = state;

    if (!routing.pathname) return null;
    const params = getQueryParameters(routing.pathname);
    const { artworkId } = params;

    if (!artworkId) return null;

    let missingData = {};

    // ARTWORK
    if (artworkId && !artworks[artworkId]) {
        missingData.artworkId = artworkId;
    }

    return missingData;
};

export const getRedirectPath = (state) => {
    const { routing, account, user, artworks } = state;

    // if there's no pathname go home
    if (!routing.pathname) return '/';

    // const page = routing.pathname === '/' ? 'home' : routing.pathname.split('/').slice(1)[0];
    const params = getQueryParameters(routing.pathname);

    // no matter what path it is, if the account has been deleted take them to the
    // delete page to create a new account or continue with deletion process.
    if (routing.pathname !== '/accountDelete' && account && account.status === 'deleted') {
        return '/accountDelete';
    }

    const adminOnlyPaths = ['/profile', '/accountSubscription', '/accountDelete', '/artworkMaker'];
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
                return GALLERY_PATH(params.galleryId, params.artistId);
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

    const path = routing.pathname.split('?')[0];
    const page = path === '/' ? 'home' : path.split('/').slice(1)[0];
    const queryObj = getQueryParameters(routing.pathname);
    const {galleryId, artworkId} = queryObj;

    // this should be called after any redirect manipulation
    ga.set({ page: page });
    ga.pageview(routing.pathname);

    switch (page) {
        case 'home':
            return <Home />;

        case 'artwork':
            if(!artworkId) return <Home />

            return <GalleryArtworkViewer />;

        case 'gallery':
            if(!galleryId) return <Home />

            return <GalleryHome />;

        case 'signIn':
            return <UserSignIn show={'signIn'} />;

        case 'signUp':
            return <UserSignIn show={'signUp'} />;

        case 'profile':
            return <UserProfile />;

        case 'accountSubscription':
            return <AccountSubscription />;

        case 'accountDelete':
            return <AccountDelete />;

        case 'artworkMaker':
            return <ArtworkMaker />;

        case 'support':
            return <Support />;

        case 'privacyPolicy':
            return <PrivacyPolicy />;

        case 'termsOfService':
            return <TermsOfService />;

        case 'TESTING':
            return <TestPage />;

        default:
            return <FourOhFour />;
    }
};

// export const getParams = (url) => {
//     const paramKeys = ['artworkId', 'galleryId', 'editor', 'newArtwork'];
//     const params = {};

//     for (let key of paramKeys) {
//         if (url.indexOf(`${key}_`) !== -1) {
//             const startTag = `${key}_`;
//             const endTag = `_${key}`;
//             const startIndex = url.indexOf(startTag) + startTag.length;
//             const endIndex = url.indexOf(endTag);

//             params[key] = url.slice(startIndex, endIndex);
//         }
//     }

//     return params;
// };

export const getQueryParameters = (path) => {
    if(!path) return {};

    const search = path.split('?')[1];

    if(!search) return {};

    // const strippedQMark = query.replace(/(^\?)/,'');

    const paramArr = search.split("&");
    let paramObj = {};

    for(let pair of paramArr){
        const arr = pair.split("=");
        const key = arr[0]+'Id';
        const value = arr[1];
        paramObj[key] = value;
    }

    return paramObj;
}

// source: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// export const getParameterByName = (name, url) => {
//     if (!url) url = window.location.href;
//     name = name.replace(/[[\]]/g, '\\$&');
//     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }
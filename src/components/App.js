// Externals
import React from "react";
// global styles
import './style.css';
// Components
import WindowController from "./global/WindowDimensionsTracker";
import AppControls from "../components/AppControls/AppControls";
import ArtistGalleryContainer from '../components/ArtistGallery/ArtistGalleryContainer';
import SettingsContainer from "../components/Settings/SettingsContainer";
import ArtistEditorContainer from "../components/ArtistEditor/ArtistEditorContainer";
import UserEditorContainer from "../components/UserEditor/UserEditorContainer";
import ArtworkContainer from '../components/Artwork/ArtworkContainer';
import ArtworkEditorContainer from "../components/ArtworkEditor/ArtworkEditorContainer";
import Home from '../components/Home/Home';
import FourOhFour from "./FourOhFour/FourOhFour";
import AppDataFetcher from "./AppDataFetcher";

const routes = {
    home: { component: Home },
    settings: { component: SettingsContainer },
    gallery: { component: ArtistGalleryContainer, pageDataRequired: ['artistArtworks', 'galleryParams'] },
    artwork: { component: ArtworkContainer, pageDataRequired: ['artwork'] },
    artworkEditor: { component: ArtworkEditorContainer, pageDataRequired: ['artwork']  },
    addOrEditArtist: { component: ArtistEditorContainer },
    addOrEditUser: { component: UserEditorContainer }
};

const App = ({page, history, params}) => {
    const PageComponent = routes[page] ? routes[page].component : FourOhFour;
    const pageDataRequired = routes[page] ? routes[page].pageDataRequired : {};

    const PageComponentWithProps = <PageComponent history={history} {...params} />;

    return (
        <AppDataFetcher pageDataRequired={pageDataRequired} {...params}>
            <AppControls {...params}/>
            <WindowController>
            {PageComponentWithProps}
            </WindowController>
        </AppDataFetcher>
    );
};

export default App;
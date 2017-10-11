// Externals
import React from "react";
// global styles
import './style.css';
// Components
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

const App = ({page, history, params}) => {
    const PageComponent = routes[page] ? routes[page].component : FourOhFour;
    const adminOnly = routes[page] && routes[page].adminOnly ? routes[page].adminOnly : false;

    const PageComponentWithProps = <PageComponent history={history} {...params} />;

    return (
        <AppDataFetcher adminOnly={adminOnly} {...params}>
            <AppControls {...params}/>
            <WindowController>
            {PageComponentWithProps}
            </WindowController>
        </AppDataFetcher>
    );
};

export default App;
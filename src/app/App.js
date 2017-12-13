import React, { Component } from "react";
// styles
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import Link from "./global/Butt/Link";
import IconButt from "./global/Butt/IconButt";
import GalleryControlsContainer from "./GalleryControls/GalleryControlsContainer";
import ArtStudio from './ArtStudio/ArtStudio';

class App extends Component {

    render() {
        const { params, children } = this.props;
        const { artworkId, galleryId } = params;
        const { inEditMode } = params;

        console.log("inEditMode: ", inEditMode);

        const mainContentClasses = inEditMode ? 'app--main app--mainWithSideBar' : 'app--main';

        return (
            <div className='app'>

                {inEditMode &&
                <div className='app--sidebar'>
                    <ArtStudio artworkId={artworkId}/>
                </div>
                }

                <div className={mainContentClasses}>

                    <Link className='app--homeButt' linkTo={'/'}>
                        <IconButt icon={'logo'}
                                  leftCorner={true}
                                  stroke={'#000'}
                                  fill={'#fff'}
                                  label={'home'}/>
                    </Link>

                    <Link className='app--addArtButt' linkTo={`/artStudio/`}>
                        <IconButt icon={'addArt'}
                                  rightCorner={true}
                                  stroke={'#000'}
                                  fill={'#fff'}
                                  label={'+new'}/>
                    </Link>

                    {galleryId &&
                    <div className='app--galleryControls'>
                        <GalleryControlsContainer galleryId={galleryId}
                                                  artworkId={artworkId}/>
                    </div>
                    }

                    <WindowDimensionsTracker inEditMode={inEditMode}>
                        {children}
                    </WindowDimensionsTracker>
                </div>

            </div>
        );
    }
}

export default App;
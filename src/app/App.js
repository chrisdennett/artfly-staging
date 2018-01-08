import React, { Component } from "react";
// styles
import './appStyles.css';
// components
import WindowDimensionsTracker from "./global/WindowDimensionsTracker";
import Link from "./global/Butt/Link";
import IconButt from "./global/Butt/IconButt";
import GalleryControlsContainer from "./GalleryControls/GalleryControlsContainer";

class App extends Component {

    render() {
        const { params, children } = this.props;
        const { artworkId, galleryId } = params;
        const { inArtStudio } = params;

        const leftMargin = inArtStudio ? 75 : 0;

        return (
            <div className='app'>

                {!inArtStudio &&
                <Link className='app--homeButt' linkTo={'/'}>
                    <IconButt icon={'logo'}
                              leftCorner={true}
                              stroke={'#000'}
                              fill={'#fff'}
                              label={'home'}/>
                </Link>
                }

                {!inArtStudio &&
                <Link className='app--addArtButt' linkTo={`/artStudio/new/uploadPhoto`}>
                    <IconButt icon={'addArt'}
                              rightCorner={true}
                              stroke={'#000'}
                              fill={'#fff'}
                              label={'+new'}/>
                </Link>
                }

                {galleryId &&
                <div className='app--galleryControls'>
                    <GalleryControlsContainer className='app--galleryControls'
                                              galleryId={galleryId}
                                              artworkId={artworkId}/>
                </div>
                }

                <WindowDimensionsTracker leftMargin={leftMargin}>
                    {children}
                </WindowDimensionsTracker>

            </div>
        );
    }
}

export default App;
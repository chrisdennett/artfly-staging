import React, { Component } from "react";
// styles
import './appStyles.css';
// components
import WindowController from "./global/WindowDimensionsTracker";
import Link from "./global/Butt/Link";
import IconButt from "./global/Butt/IconButt";
import GalleryControlsContainer from "./GalleryControls/GalleryControlsContainer";

class App extends Component {

    render() {
        const { params, children } = this.props;
        const { artworkId, galleryId } = params;
        const { inArtStudio } = params;

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
                <Link className='app--addArtButt' linkTo={`/artStudio/`}>
                    <IconButt icon={'addArt'}
                              rightCorner={true}
                              stroke={'#000'}
                              fill={'#fff'}
                              label={'+new'}/>
                </Link>
                }

                {galleryId &&
                <GalleryControlsContainer className='app--galleryControls'
                                          galleryId={galleryId}
                                          artworkId={artworkId}/>
                }

                <WindowController>
                    {children}
                </WindowController>

            </div>
        );
    }
}

export default App;
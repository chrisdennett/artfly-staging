import React, { Component } from "react";
// styles
import './appStyles.css';
// components
import WindowController from "./global/WindowDimensionsTracker";
import Link from "./global/Link";
import IconButt from "./global/IconButt";
import GalleryControlsContainer from "./GalleryControls/GalleryControlsContainer";

class App extends Component {

    render() {
        const { params, children } = this.props;
        const { artworkId, galleryId } = params;

        return (
            <div className='app'>

                <Link className='app--homeButt' linkTo={'/'}>
                    <IconButt icon={'home'}
                              stroke={'hsl(250,28%,30%)'}
                              fill={'hsl(250,98%,80%)'}
                              label={'home'}/>
                </Link>


                <Link className='app--addArtButt' linkTo={`/artStudio/`}>
                    <IconButt icon={'addArt'} fill={'hsl(250,98%,80%)'} label={'add art'}/>
                </Link>

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
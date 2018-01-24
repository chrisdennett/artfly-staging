// externals
import React from 'react';
// styles
import './publicHomeStyles.css';
import GallerySign from "../../global/gallerySign/GallerySign";
import StencilHeader from "../../global/stencilHeader/StencilHeader";
import HoverLogo from "../animatedIcons/HoverLogo";
import SnapPicIcon from "../animatedIcons/SnapPicIcon";
import PrepareTheCanvasIcon from "../animatedIcons/PrepareTheCanvasIcon";
import FrameItIcon from "../animatedIcons/FrameItIcon";

const PublicHome = function () {

    return (
        <div>
            <div className={'app--section app--section--dark'}>
                <GallerySign>
                    <p>ArtFly is currently in private beta.</p>
                    <svg height="40" width="40" viewBox="0 0 100 94">
                        <path
                            d="M97.06 50H85.3V27.69l6.491-6.491a2.94 2.94 0 1 0-4.159-4.159l-6.491 6.491h-7.422c-.01-13-10.53-23.53-23.54-23.53-13 0-23.53 10.52-23.53 23.53H18.86l-7.962-7.962a2.941 2.941 0 1 0-4.16 4.159L14.7 27.69V50H2.94a2.941 2.941 0 0 0-.001 5.881h11.76v4.412c0 6.734 2.069 12.99 5.604 18.18l-10.62 10.63a2.94 2.94 0 1 0 4.159 4.159l10.22-10.22c5.868 5.933 14.01 9.615 22.99 9.615h5.882c8.984 0 17.12-3.682 22.99-9.614l10.22 10.22a2.94 2.94 0 1 0 4.159-4.159l-10.61-10.64a32.164 32.164 0 0 0 5.603-18.18v-4.412h11.76a2.941 2.941 0 0 0 0-5.882zM50.18 5.88c9.746 0 17.65 7.901 17.65 17.65H32.54c0-9.746 7.901-17.65 17.65-17.65zm2.757 80.88V43.38a2.206 2.206 0 0 0-2.206-2.206H49.26a2.206 2.206 0 0 0-2.206 2.206v43.38c-14.6 0-26.47-11.87-26.47-26.47V29.41h58.82v30.88c0 14.6-11.87 26.47-26.47 26.47z"/>
                    </svg>

                    <p>When it's ready I'm hoping Artfly will encourage and celebrate every
                        artwork, big or small.</p>
                </GallerySign>
            </div>

            <div className={'app--section'}>

                <div className={'app--section--content'}>
                    <StencilHeader wording={'A place to create, display and share'}/>

                    <p>I'm making Artfly with my own children in mind. I wanted a quick way to save and display their
                        artwork. Here's how it'll work:</p>

                    <div className={'app--section-content--cards'}>

                        <div className={'app--section-content--card'}>
                            <SnapPicIcon/>
                            <p>Snap the artwork</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <PrepareTheCanvasIcon />
                            <p>Prepare the canvas</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <FrameItIcon />
                            <p>Frame it</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <HoverLogo/>
                            <p>Share it</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <HoverLogo/>
                            <p>Use your artwork to develop new creations in the ArtFly studio</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default PublicHome;
// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBug from '@fortawesome/fontawesome-pro-solid/faBug';
import faFlask from '@fortawesome/fontawesome-pro-solid/faFlask';
import YouTube from 'react-youtube';
// styles
import './publicHomeStyles.css';
import GallerySign from "../../global/gallerySign/GallerySign";
import StencilHeader from "../../global/stencilHeader/StencilHeader";
import HoverLogo from "../animatedIcons/HoverLogo";
import SnapPicIcon from "../animatedIcons/SnapPicIcon";
import PrepareTheCanvasIcon from "../animatedIcons/PrepareTheCanvasIcon";
import FrameItIcon from "../animatedIcons/FrameItIcon";
import BuildGalleryAndShareIcon from "../animatedIcons/BuildGalleryAndShareIcon";
import SignUpForm from "../../SignUpForm/SignUpForm";
import LinkButt from "../../global/Butt/LinkButt";

const PublicHome = function () {

    const opts = {
        height: '390',
        width: '100%',
    };

    return (
        <div>
            <div className={'app--section app--section--dark'}>
                <GallerySign>
                    <h2><FontAwesomeIcon icon={faFlask}/> ArtFly is currently in public beta.</h2>
                    <p>That's a fancy way of saying <i>"I'm still making it, but please try it out and let me know what you think and if you spot any bugs <FontAwesomeIcon icon={faBug}/>"</i></p>

                    <YouTube
                        videoId="y2WDSVXmTBc"
                        opts={opts}
                    />

                    <LinkButt style={{backgroundColor:'#abc837'}} linkTo={'/quickArtworkMaker'}>TRY OUT THE LATEST VERSION: v0.1</LinkButt>
                    {/*<p>Check out what I planning for ArtFly here.</p>*/}

                    <p>If you'd like to hear about updates by email, sign up below, or look out for updates on facebook.</p>

                    <div className={'publicHome--signUpSection'}>
                        <p>
                            Sign up for ArtFly updates
                        </p>

                        <SignUpForm/>
                    </div>
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
                            <p>1. Snap the artwork</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <PrepareTheCanvasIcon/>
                            <p>2. Prepare the canvas</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <FrameItIcon/>
                            <p>3. Frame it</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <BuildGalleryAndShareIcon/>
                            <p>4. Build and Share your gallery</p>
                        </div>

                        <div className={'app--section-content--card'}>
                            <HoverLogo/>
                            <p>Art projects coming soon...</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default PublicHome;
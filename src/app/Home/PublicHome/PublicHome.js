// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBug from '@fortawesome/fontawesome-pro-solid/faBug';
import faFlask from '@fortawesome/fontawesome-pro-solid/faFlask';
// styles
import './publicHomeStyles.css';
// comps
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


    return (
        <div>
            <div className={'app--section app--section--dark'}>
                <GallerySign>
                    <h2><FontAwesomeIcon icon={faFlask}/> ArtFly is currently in public beta.</h2>
                    <p>That's a fancy way of saying <i>"I'm still making it, but please try it out and let me know what
                        you think and if you spot any bugs <FontAwesomeIcon icon={faBug}/>"</i></p>

                    <div className={'embed-container'}>
                        
                        <iframe title={'beta testing version 0.2'}
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/3XUpQ6juO1k?rel=0"
                                frameBorder="0"
                                allowFullScreen>
                        </iframe>
                    </div>


                    <LinkButt style={{ backgroundColor: '#abc837', margin: '30px 0' }} linkTo={'/quickArtworkMaker'}>TRY
                        OUT THE LATEST
                        VERSION: v0.3</LinkButt>

                    <div>
                        Here's the <a href={'https://blog.artfly.io/artfly-roadmap'}
                                      target="_blank" rel="noopener noreferrer">
                        ArtFly Roadmap</a> if you want to know what I'm planning.
                    </div>

                    <p>
                        If you'd like to hear about updates by email, sign up below, or look out for updates on <a
                        href={'https://www.facebook.com/artfly.io/'}
                        target="_blank" rel="noopener noreferrer">facebook</a>.</p>

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
// externals
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBug from '@fortawesome/fontawesome-pro-solid/faBug';
import faFlask from '@fortawesome/fontawesome-pro-solid/faFlask';
import faSmile from '@fortawesome/fontawesome-pro-solid/faSmile';
import faChild from '@fortawesome/fontawesome-pro-solid/faChild';
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
import faTwitterSquare from "@fortawesome/fontawesome-free-brands/faTwitterSquare";
import faFacebookSquare from "@fortawesome/fontawesome-free-brands/faFacebookSquare";

const PublicHome = function () {
    return (
        <div>
            <div className={'app--section app--section--dark'}>
                <GallerySign>

                    <div className={'publicHome--intro'}>
                        <h2>
                            <FontAwesomeIcon icon={faFlask}/>
                            <span> ArtFly is yet to hatch... </span>
                            <span> ...but I'd still love you to have a play. </span>
                            <FontAwesomeIcon icon={faSmile}/>
                        </h2>

                        <p>There may be bugs <FontAwesomeIcon icon={faBug}/><FontAwesomeIcon icon={faBug}/>
                            <FontAwesomeIcon
                                icon={faBug}/> and weirdness, but that's half the fun right! </p>
                        <p>I'm currently working on showing user artworks in a fancy gallery.</p>

                        <LinkButt className={'publicHome--intro--tryButt'}
                                  style={{ backgroundColor: '#abc837' }}
                                  linkTo={'/quickArtworkMaker'}>
                            <FontAwesomeIcon icon={faChild}/> HAVE A PLAY...
                        </LinkButt>

                        <p>Or if you'd rather see a poorly made video, I've got a real treat for you! Every time I do an
                            update
                            I try to explain myself using the medium of youtube... and fail.</p>
                    </div>

                    <div className={'embed-container'}>

                        <iframe title={'Version 0.5'}
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/k3vBYVvh4Oo?rel=0"
                                frameBorder="0"
                                allowFullScreen>
                        </iframe>
                    </div>


                    <div className={'publicHome--intro'}>
                        Here's the <a href={'https://blog.artfly.io/artfly-roadmap'}
                                      target="_blank" rel="noopener noreferrer">
                        ArtFly Roadmap</a> if you want to know what I'm planning.
                    </div>

                    <div className={'publicHome--intro'}>
                        You can follow updates: <a
                        href='https://twitter.com/artflychris'
                        target="_blank"
                        rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare}/>on Twitter @ArtflyChris</a>,

                        <span> or </span>

                        <a href='https://www.facebook.com/artfly.io/'
                           target="_blank"
                           rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookSquare}/> Facebook </a>
                        or by email:
                    </div>

                    <div className={'publicHome--signUpSection'}>
                        <SignUpForm/>
                    </div>
                </GallerySign>
            </div>

            <div className={'app--section'}>

                <div className={'app--section--content'}>
                    <StencilHeader wording={'A place to create, display and share'}/>

                    <p>I'm making Artfly with my own children in mind. I wanted quick ways to create, store, display and
                        share their
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
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faTwitterSquare from "@fortawesome/fontawesome-free-brands/faTwitterSquare";
import * as faFacebookSquare from "@fortawesome/fontawesome-free-brands/faFacebookSquare";
import * as faInstagram from "@fortawesome/fontawesome-free-brands/faInstagram";
import * as faLinkedin from "@fortawesome/fontawesome-free-brands/faLinkedin";
import * as faGooglePlus from "@fortawesome/fontawesome-free-brands/faGooglePlus";
// styles
import './socialMediaStuff_styles.css';

const SocialMediaStuff = function (props) {
    return (
        <div className={'socialMediaStuff'}>
            <div className={'socialMediaStuff--intro'}>
                <h2>Social media stuff</h2>
                <div className={'socialMediaStuff--socialIcons'}>
                    <a href='https://twitter.com/artflychris'
                       target="_blank"
                       rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare}/></a>

                    <a href='https://www.facebook.com/artfly.io/'
                       target="_blank"
                       rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookSquare}/></a>

                    <a href='https://www.instagram.com/artfly.io/'
                       target="_blank"
                       rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram}/></a>

                    <a href='https://www.linkedin.com/in/chris-dennett-1b69aa47/'
                       target="_blank"
                       rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin}/></a>

                    <a href='https://plus.google.com/u/0/112775399489784880343'
                       target="_blank"
                       rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGooglePlus}/></a>
                </div>
                <p>I struggle to keep up with social media without being sucked in and ceasing all other activity so
                    I post pretty much the same things to all social thingies. So if you love repetition follow me
                    everywhere!</p>
                <p>I'm currently favouring Twitter as a place to explore and hang out though so that's where I'm
                    most active.</p>
            </div>
            <iframe className={'socialMediaStuff--iFrame'}
                    title={'@ArtFlyChris Twitter Feed'}
                    src="/twitter-feed.html"/>
        </div>
    )
};

export default SocialMediaStuff;
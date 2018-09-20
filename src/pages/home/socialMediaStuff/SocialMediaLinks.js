import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// icons
import { faGooglePlus, faFacebookSquare, faTwitterSquare, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

const SocialMediaLinks = ({ color = '#fff' }) => {

    const groupStyle = { fontSize: 36, display: 'flex', justifyContent: 'center' };
    const socialLinkStyle = { margin: 5, color };

    return (
        <div style={groupStyle}>
            <a href='https://twitter.com/artflychris'
               style={socialLinkStyle}
               target="_blank"
               rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitterSquare}/></a>

            <a href='https://www.facebook.com/artfly.io/'
               target="_blank"
               style={socialLinkStyle}
               rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare}/></a>

            <a href='https://www.instagram.com/artfly.io/'
               target="_blank"
               style={socialLinkStyle}
               rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram}/></a>

            <a href='https://www.linkedin.com/in/chris-dennett-1b69aa47/'
               target="_blank"
               style={socialLinkStyle}
               rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin}/></a>

            <a href='https://plus.google.com/u/0/112775399489784880343'
               target="_blank"
               style={socialLinkStyle}
               rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGooglePlus}/></a>
        </div>
    )
};

export default SocialMediaLinks;
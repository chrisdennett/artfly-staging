import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faSmile from '@fortawesome/fontawesome-pro-regular/faSmile'
import * as faDesktopAlt from '@fortawesome/fontawesome-pro-regular/faDesktopAlt'
import * as faPaintBrush from '@fortawesome/fontawesome-pro-regular/faPaintBrush'
import * as faChild from '@fortawesome/fontawesome-pro-solid/faChild'
import * as faVial from '@fortawesome/fontawesome-pro-solid/faVial'
import * as faWrench from '@fortawesome/fontawesome-pro-solid/faWrench'

//
import './artFlyIntro_styles.css';
import LinkExternalButt from "../../global/Butt/LinkExternalButt";

const ArtFlyIntro = function (props) {
    return (
        <div className={'artFlyIntro'}>
            <div className={'artFlyIntro--content'}>
                <h2>What is ArtFly?</h2>
                <p>It's really just me - Chris Dennett (hello!) - but I think ArtFly sounds better <FontAwesomeIcon
                    icon={faSmile}/>.</p>
                <p>I want to make a things that help people make art. I'm specifically interested in:</p>
                <ul>
                    <li>Mixing digital <FontAwesomeIcon icon={faDesktopAlt}/> and traditional arts <FontAwesomeIcon
                        icon={faPaintBrush}/> and crafts.
                    </li>
                    <li>Helping to bring more creative experiences back into schools <FontAwesomeIcon icon={faChild}/>.
                    </li>
                    <li>Making simple tools <FontAwesomeIcon icon={faWrench}/> to encourage anyone to make some art.
                    </li>
                </ul>

                <p>Artfly is currently a testing area <FontAwesomeIcon icon={faVial}/> for me to find out what works and
                    what doesn't. Please have a play the stuff in the lab and let me know what you think on them there
                    social medias.</p>

                <LinkExternalButt linkTo={'https://blog.artfly.io/artfly-roadmap'}
                                  style={{float:'right', backgroundColor:'#38abc9'}}
                                  isPrimary={true}>
                    Read more about ArtFly...
                </LinkExternalButt>
            </div>
        </div>
    )
};

export default ArtFlyIntro;
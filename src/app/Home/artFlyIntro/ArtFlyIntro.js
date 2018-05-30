import React from 'react';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faDesktopAlt from '@fortawesome/fontawesome-pro-regular/faDesktopAlt'
import * as faPaintBrush from '@fortawesome/fontawesome-pro-regular/faPaintBrush'
import * as faChild from '@fortawesome/fontawesome-pro-solid/faChild'
import * as faVial from '@fortawesome/fontawesome-pro-solid/faVial'
//
import './artFlyIntro_styles.css';

const ArtFlyIntro = function () {
    return (
        <div className={'artFlyIntro'}>
            <div className={'artFlyIntro--content'}>
                <Typography use="headline4">What is ArtFly?</Typography>
                <Typography use="body1">
                    <p>A website for you to store and create artworks for yourself, your kids or for anyone.</p>
                    <p>Aim: help people make art. Specifically:</p>
                    <ul>
                        <li>Help parents to encourage and cope with kids <FontAwesomeIcon icon={faChild}/> constant
                            creations.
                        </li>
                        <li>Make simple tools <FontAwesomeIcon icon={faDesktopAlt}/> to encourage anyone to make art.
                        </li>
                        <li>Create cross-curricular school packs that mix art <FontAwesomeIcon
                            icon={faPaintBrush}/> in with other subjects.
                        </li>
                    </ul>

                    <p>I'm currently experimenting <FontAwesomeIcon icon={faVial}/> to find out what works best. Have a
                        play and let me know what you think.</p>
                </Typography>

                <a href={'https://blog.artfly.io/artfly-roadmap'}  style={{textDecoration:'none'}}>

                    <Typography use="button" theme={'secondary'}>
                        Blog post about ArtFly <Icon style={{verticalAlign:'text-bottom'}} strategy="ligature" use="exit_to_app"/>
                    </Typography>

                </a>
            </div>
        </div>
    )
};

export default ArtFlyIntro;
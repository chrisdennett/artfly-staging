import React from 'react';
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
//
import './artFlyIntro_styles.css';
import { UpdateUrl } from "../../../actions/UrlActions";

const ArtFlyIntro = function ({ UpdateUrl }) {

    return (
        <div className={'artFlyIntro'}>

            <Typography use="headline5">
                A gallery for your kid's endless creativity.
            </Typography>

            <div style={{ marginTop: 20 }}>
                <Button raised onClick={() => UpdateUrl('/signIn')}>Get started for free</Button>
            </div>

            <Typography tag={'div'} use={'body1'} style={{ marginTop: 20, maxWidth: 500, lineHeight:'1.8rem', textAlign: 'center' }}>
                ArtFly's just a simple gallery right now. <br/>
                Here's my
                <Button dense theme={'secondary'} onClick={() => UpdateUrl('/gallery/galleryId_t5jiytWNhsnQYnajlggt_galleryId')}>
                    family gallery
                </Button>
                for example.  <br/>
                But this is just the start. <br/>
                Check out the ArtFly lab to see what I'm planning.
            </Typography>
            {/*<div className={'artFlyIntro--content'}>
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
            </div>*/}
        </div>
    )
};

export default connect(null, { UpdateUrl })(ArtFlyIntro);
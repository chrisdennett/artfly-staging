import React from 'react';
import { Typography } from 'rmwc/Typography';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faFlask from "@fortawesome/fontawesome-pro-regular/faFlask";

// styles
import './artFlyLab_styles.css';
// comps
import ProjectCard from "./ProjectCard";

const ArtFlyLab = function () {
    return (
        <div className={'artFlyLab'}>
            <div className={'artFlyLab--intro'}>
                <Typography use="headline4">
                    <FontAwesomeIcon icon={faFlask} /> ArtFly Lab
                </Typography>
                <Typography use="body1">
                    <p>These are things I'm working on:</p>
                </Typography>
            </div>

            <div className={'artFlyLab--projectCards'}>
                <ProjectCard title={'Create your own art gallery'}
                             description={'A very brief summary here...'}
                             link={'/artwork'}
                             blogLink={'https://blog.artfly.io/pixel-stretcher'}
                />

                <ProjectCard title={'Portrait Grids'}
                             description={'A very brief summary here...'}
                             labLink={'https://lab.artfly.io/colour-splitter'}
                             blogLink={'https://blog.artfly.io/pixel-stretcher'}
                />

                <ProjectCard title={'Colour Splitting'}
                             description={'A very brief summary here...'}
                             labLink={'https://lab.artfly.io/colour-splitter'}
                             blogLink={'https://blog.artfly.io/pixel-stretcher'}
                />
            </div>

        </div>
    )
};

export default ArtFlyLab;
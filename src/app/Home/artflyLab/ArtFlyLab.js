import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faFlask from "@fortawesome/fontawesome-pro-solid/faFlask";
// styles
import './artFlyLab_styles.css';
// comps
import ProjectCard from "./ProjectCard";

const ArtFlyLab = function (props) {
    return (
        <div className={'artFlyLab'}>
            <div className={'artFlyLab--intro'}>
                <h2><FontAwesomeIcon icon={faFlask} /> ArtFly Lab</h2>
                <p>These are things I'm working on:</p>
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
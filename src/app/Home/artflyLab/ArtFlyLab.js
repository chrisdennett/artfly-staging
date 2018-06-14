import React from 'react';
import { Typography } from 'rmwc/Typography';
// styles
import './artFlyLab_styles.css';
// comps
import ProjectCard from "./ProjectCard";

const ArtFlyLab = function () {
    return (
        <div className={'artFlyLab'}>

            <Typography className={'artFlyLab--sectionTitle'} use="headline4">
                ArtFly Lab
            </Typography>

            <div className={'artFlyLab--intro'}>
                <Typography use="body1">
                    <p>The ArtFly lab is a place for experiments with new ideas for ArtFly.</p>
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
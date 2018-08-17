import React from 'react';
import { Typography } from 'rmwc/Typography';
// styles
import './artFlyLab_styles.css';
// comps
import ProjectCard from "./ProjectCard";

const ArtFlyLab = function () {
    return (
        <div className={'artFlyLab'}>

            <Typography className={'sectionTitle'} use="headline4">
                ArtFly Lab
            </Typography>

            <div className={'artFlyLab--intro'}>
                <Typography use="body1">
                    <p>The ArtFly lab is a place for experiments with new ideas for ArtFly.</p>
                </Typography>
            </div>

            <div className={'artFlyLab--projectCards'}>
                <ProjectCard title={'Photo Sketcher'}
                             image={'images/lab/draw-me-a-picture-288x257.jpg'}
                             subtitle={'Turn a photo into a pencil sketch.'}
                             description={'Upload a picture, fiddle with a slider, download and sign.'}
                             link={'https://lab.artfly.io/draw-me-a-photo'}
                />

                <ProjectCard title={'Portrait Grid Maker'}
                             image={'images/lab/portrait-grids-288x192.jpg'}
                             subtitle={'Creates grids to help you draw.'}
                             description={'Adds a grid and gives you outlines to help'}
                             link={'https://lab.artfly.io/portrait-grids'}
                />

                <ProjectCard title={'Colour Splitter'}
                             image={'images/lab/colour-splitter-288x210.jpg'}
                             subtitle={'Splits photos into 3 separate colours'}
                             description={'Move sliders to pull out the cyan, magenta and yellow colours that make up an image.'}
                             link={'https://lab.artfly.io/colour-splitter'}
                />
            </div>

        </div>
    )
};

export default ArtFlyLab;
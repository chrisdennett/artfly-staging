import React from 'react';
// styles
import './projectCard_styles.css';

const ProjectCard = function ({ title, description, link, labLink, blogLink }) {
    return (
        <div className={'projectCard'}>

            <h3 className={'projectCard--info--title'}>{title}</h3>
            <p className={'projectCard--info--description'}>{description}</p>

            <img src={'images/lab/Demo GIF-downsized.gif'} alt={'test gif'} />

            <div className={'projectCard--links'}>

                <div style={{marginRight:10, border:'none'}}>
                    More info...
                </div>

                {labLink &&
                <div >Try it here</div>
                }

                {link &&
                <div >Try it here</div>
                }
            </div>
        </div>
    )
};

export default ProjectCard;
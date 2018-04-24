import React from 'react';
// styles
import './projectCard_styles.css';
// comps
import LinkButt from "../../global/Butt/LinkButt";
import LinkExternalButt from "../../global/Butt/LinkExternalButt";

const ProjectCard = function ({ title, description, link, labLink, blogLink }) {
    return (
        <div className={'projectCard'}>

            <h3 className={'projectCard--info--title'}>{title}</h3>
            <p className={'projectCard--info--description'}>{description}</p>


            <div className={'projectCard--links'}>

                <LinkExternalButt linkTo={blogLink} style={{marginRight:10, border:'none'}}>
                    More info...
                </LinkExternalButt>

                {labLink &&
                <LinkExternalButt linkTo={labLink} isPrimary={true}>Try it here</LinkExternalButt>
                }

                {link &&
                <LinkButt linkTo={link} isPrimary={true}>Try it here</LinkButt>
                }
            </div>
        </div>
    )
};

export default ProjectCard;
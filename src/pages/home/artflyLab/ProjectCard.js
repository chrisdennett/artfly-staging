import React from 'react';
// styles
import './projectCard_styles.css';
import {
    Card,
    CardAction,
    CardActionButtons,
    CardActionIcons,
    CardActions,
    CardMedia,
    CardPrimaryAction
} from "rmwc/Card";
import { Typography } from "rmwc/Typography";

const ProjectCard = function ({ title, subtitle, description, image, link, labLink, blogLink }) {

    return <Card style={{ width: '18rem', margin:5 }}>
        <CardPrimaryAction tag={'a'} href={link}>
            <CardMedia
                sixteenByNine
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto'
                }}
            />
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="headline6" tag="h2">
                    {title}
                </Typography>
                <Typography
                    use="subtitle2"
                    tag="h3"
                    theme="text-secondary-on-background"
                    style={{ marginTop: '-1rem' }}
                >
                    {subtitle}
                </Typography>
                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                    {description}
                </Typography>
            </div>
        </CardPrimaryAction>
        <CardActions>
            <CardActionButtons>
                <CardAction tag={'a'} href={link}>Have a go</CardAction>
            </CardActionButtons>
            <CardActionIcons>
                {/*<CardAction icon="add" onClick={onAddClick}/>*/}
            </CardActionIcons>
        </CardActions>
    </Card>



    /*return (
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
    )*/
};

export default ProjectCard;
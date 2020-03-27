import React, { Component } from "react";
// ui
import {
    Card,
    CardAction,
    CardActionButtons,
    CardActions,
    CardMedia,
    CardPrimaryAction
} from "@rmwc/card";
import { Typography } from "@rmwc/typography";

class NewArtworkCreatorCard extends Component {
    render() {
        const { project, onCreateProject } = this.props;
        const { title, subtitle, description, editData, comingSoon } = project;

        return (
            <Card style={{ width: 290, margin: 5 }}>
                <CardPrimaryAction disabled={comingSoon} onClick={() => !comingSoon && onCreateProject(editData)}>
                    <CardMedia
                        sixteenByNine
                        style={{ backgroundImage: `url(${project.img})` }}
                    />
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <Typography use="headline6" tag="h2">
                            {title}
                        </Typography>

                        {subtitle &&
                        <Typography
                            use="subtitle2"
                            tag="h3"
                            theme="text-secondary-on-background"
                            style={{ marginTop: '-1rem' }}
                        >
                            {subtitle}
                        </Typography>
                        }
                        <Typography use="body1" tag="div" theme="text-secondary-on-background">
                            {description}
                        </Typography>
                    </div>
                </CardPrimaryAction>

                <CardActions>
                    <CardActionButtons>

                        {comingSoon &&
                        <CardAction disabled raised>coming soon</CardAction>
                        }

                        {!comingSoon &&
                        <CardAction raised onClick={() => onCreateProject(editData)}>
                            Create
                        </CardAction>
                        }
                    </CardActionButtons>
                    {/* <CardActionIcons>
                        <CardAction icon="info"/>
                    </CardActionIcons>*/}
                </CardActions>
            </Card>
        );
    }
}

export default NewArtworkCreatorCard;
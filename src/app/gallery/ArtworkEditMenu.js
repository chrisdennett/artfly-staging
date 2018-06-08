import React from 'react';
// ui
import { Drawer, DrawerContent } from 'rmwc/Drawer';
import { ListDivider, ListItem, ListItemText, ListItemGraphic } from 'rmwc/List';
// images
import IconFrameSize from './../images/icons/frame-size.png';
import IconFrameColour from './../images/icons/frame-colour.png';
import IconCropRotate from './../images/icons/crop-rotate.png';
import history from "../global/history";

const ArtworkEditMenu = ({ isOpen, onClose, artworkId }) => {

    const imgStyle = { width: 22 };
    const iconStyle = { color: 'black' };

    return (
        <Drawer
            temporary
            open={isOpen}
            onClose={onClose}
        >
            <DrawerContent>
                <ListItem>
                    <ListItemGraphic>
                        <img style={imgStyle} src={IconFrameSize} alt={'frame size icon'}/>
                    </ListItemGraphic>
                    <ListItemText>
                        Frame Size
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemGraphic>
                        <img style={imgStyle} src={IconFrameColour} alt={'frame size icon'}/>
                    </ListItemGraphic>
                    <ListItemText>
                        Frame Colour
                    </ListItemText>
                </ListItem>

                <ListItem onClick={() => history.push(`/artworkEditor/artworkId_${artworkId}_artworkId`)}>
                    <ListItemGraphic>
                        <img style={imgStyle} src={IconCropRotate} alt={'crop and rotate icon'}/>
                    </ListItemGraphic>
                    <ListItemText>
                        Crop & Rotate
                    </ListItemText>
                </ListItem>

                <ListDivider/>

                <ListItem>
                    <ListItemGraphic style={iconStyle}>delete</ListItemGraphic>
                    <ListItemText>
                        Delete
                    </ListItemText>
                </ListItem>
            </DrawerContent>
        </Drawer>
    )
};

export default ArtworkEditMenu;
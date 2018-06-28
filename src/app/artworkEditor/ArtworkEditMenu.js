import React from 'react';
import { connect } from 'react-redux';
// ui
import { Drawer, DrawerContent } from 'rmwc/Drawer';
import { ListItem, ListItemText, ListItemGraphic } from 'rmwc/List';
// images
import IconFrameSize from '../images/icons/frame-size.png';
import IconCropRotate from '../images/icons/crop-rotate.png';
// actions
import {UpdateUrl} from "../../actions/UrlActions";;

const ArtworkEditMenu = ({ isOpen, onClose, artworkId, galleryId, UpdateUrl }) => {

    const imgStyle = { width: 22 };

    const path = (editor) => {
      return `/artworkEditor/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId/editor_${editor}_editor`;
    };

    return (
        <Drawer
            temporary
            open={isOpen}
            onClose={onClose}
        >
            <DrawerContent>
                <ListItem onClick={() => UpdateUrl(path('frame'))}>
                    <ListItemGraphic>
                        <img style={imgStyle} src={IconFrameSize} alt={'frame size icon'}/>
                    </ListItemGraphic>
                    <ListItemText>
                        Frame Editor
                    </ListItemText>
                </ListItem>

                <ListItem onClick={() => UpdateUrl(path('crop'))}>
                    <ListItemGraphic>
                        <img style={imgStyle} src={IconCropRotate} alt={'crop and rotate icon'}/>
                    </ListItemGraphic>
                    <ListItemText>
                        Crop & Rotate
                    </ListItemText>
                </ListItem>

            </DrawerContent>
        </Drawer>
    )
};

export default connect(null, {UpdateUrl})(ArtworkEditMenu);
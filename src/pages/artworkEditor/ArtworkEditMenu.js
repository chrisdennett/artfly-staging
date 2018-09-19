import React from 'react';
import { connect } from 'react-redux';
// ui
import { Drawer, DrawerContent } from 'rmwc/Drawer';
import { List, ListItem, ListItemText, ListItemGraphic } from 'rmwc/List';
// images
import IconFrameSize from '../../components/images/icons/frame-size.png';
import IconCropRotate from '../../components/images/icons/crop-rotate.png';
// actions
import { UpdateUrl } from "../../actions/UrlActions";

const ArtworkEditMenu = ({ isOpen, onClose, currentArtwork, artworkId, galleryId, UpdateUrl, onAddDerivedArtwork }) => {

    const path = (editor) => {
        return `/artworkEditor/galleryId_${galleryId}_galleryId/artworkId_${artworkId}_artworkId/editor_${editor}_editor`;
    };

    return (
        <Drawer
            modal
            open={isOpen}
            onClose={onClose}
        >
            <DrawerContent>
                <List>
                    <ListItem onClick={() => UpdateUrl(path('frame'), 'ArtworkEditMenu > frame')}>
                        <ListItemGraphic icon={IconFrameSize} iconOptions={{ strategy: "url" }}/>
                        <ListItemText>
                            Frame Editor
                        </ListItemText>
                    </ListItem>

                    <ListItem onClick={() => UpdateUrl(path('crop'), 'ArtworkEditMenu > crop')}>
                        <ListItemGraphic icon={IconCropRotate} iconOptions={{ strategy: "url" }}/>
                        <ListItemText>
                            Crop & Rotate
                        </ListItemText>
                    </ListItem>

                    <ListItem onClick={() => UpdateUrl(path('colourSplitter'))}>
                        <ListItemGraphic style={{color:'black'}} icon={'burst_mode'}/>
                        <ListItemText>
                            Colour Splitter
                        </ListItemText>
                    </ListItem>
                </List>

            </DrawerContent>
        </Drawer>
    )
};

export default connect(null, { UpdateUrl })(ArtworkEditMenu);
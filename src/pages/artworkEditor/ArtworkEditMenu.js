import React from 'react';
import { connect } from 'react-redux';
// ui
import { Drawer, DrawerContent } from 'rmwc/Drawer';
import { ListItem, ListItemText, ListItemGraphic } from 'rmwc/List';
// images
import IconFrameSize from '../../components/images/icons/frame-size.png';
import IconCropRotate from '../../components/images/icons/crop-rotate.png';
// actions
import { UpdateUrl } from "../../actions/UrlActions";

const ArtworkEditMenu = ({ isOpen, onClose, currentArtwork, artworkId, galleryId, UpdateUrl, onAddDerivedArtwork }) => {

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
                <ListItem onClick={() => UpdateUrl(path('frame'), 'ArtworkEditMenu > frame')}>
                    <ListItemGraphic>
                        <img style={imgStyle} src={IconFrameSize} alt={'frame size icon'}/>
                    </ListItemGraphic>
                    <ListItemText>
                        Frame Editor
                    </ListItemText>
                </ListItem>

                <ListItem onClick={() => UpdateUrl(path('crop'), 'ArtworkEditMenu > crop')}>
                    <ListItemGraphic>
                        <img style={imgStyle} src={IconCropRotate} alt={'crop and rotate icon'}/>
                    </ListItemGraphic>
                    <ListItemText>
                        Crop & Rotate
                    </ListItemText>
                </ListItem>

                <ListItem onClick={() => UpdateUrl(path('colourSplitter'))}>
                    <ListItemGraphic use={'burst_mode'} />
                    <ListItemText>
                        Colour Splitter
                    </ListItemText>
                </ListItem>

            </DrawerContent>
        </Drawer>
    )
};

export default connect(null, { UpdateUrl })(ArtworkEditMenu);
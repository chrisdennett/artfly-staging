import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import {
    Drawer,
    DrawerHeader,
    DrawerContent
} from 'rmwc/Drawer';

import {
    ListItem,
    ListItemText
} from 'rmwc/List';
// styles
import './artworkEditor_styles.css';
// images
import IconFrameSize from './../images/icons/frame-size.png';
import IconFrameColour from './../images/icons/frame-colour.png';
import IconCropRotate from './../images/icons/crop-rotate.png';
// helpers
import history from "../global/history";
// comps
import {ArtworkEditorAppBar} from "../appBar/AppBar";
import GalleryArtwork from "../gallery/GalleryArtwork";
import ArtworkOptionsToolBar from "../artworkOptions/artworkOptionsToolBar/ArtworkOptionsToolBar";

const artworkOptions = {
    frame: {
        index: 0,
        name: 'Frame Size',
        icon: IconFrameSize
    },
    frameColour: {
        index: 1,
        name: 'Frame Colour',
        icon: IconFrameColour
    },
    crop: {
        index: 3,
        name: 'Crop & Rotate',
        useFullPage: true,
        icon: IconCropRotate
    }
};

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {tempOpen:false}
    }

    render() {
        const { currentArtwork, artworkId } = this.props;

        return (
            <div className={'artworkEditor'}>
                <ArtworkEditorAppBar
                    onClick={() => this.setState({tempOpen: true})}
                    onClose={() => history.push(`/gallery/artworkId_${artworkId}_artworkId`)} />

                <Drawer
                    temporary
                    open={this.state.tempOpen}
                    onClose={() => this.setState({tempOpen: false})}
                >
                    <DrawerHeader>
                        DrawerHeader
                    </DrawerHeader>
                    <DrawerContent>
                        <ListItem>
                            <ListItemText>Cookies</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Pizza</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Icecream</ListItemText>
                        </ListItem>
                    </DrawerContent>
                </Drawer>


                <GalleryArtwork currentArtwork={currentArtwork}/>

                <ArtworkOptionsToolBar options={artworkOptions}
                                       onOptionSelect={(value) => console.log("value: ", value)}
                                       onChange={(value) => console.log("value: ", value)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentArtwork: getCurrentArtwork(state.artworks, props.artworkId)
    }
};
export default connect(mapStateToProps)(ArtworkEditor);

const getCurrentArtwork = (artworks, artworkId) => {
    return artworks[artworkId];
};
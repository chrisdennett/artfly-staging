// externals
import React, { Component } from "react";
// styles
import './pictureMakerControlsStyles.css';
// components
import ControlPanelButt from "../../../global/Butt/ControlPanelButt";

/*const controls = {
    finishEditing:{},
    editPhoto:{subControls:['done', 'cancel', 'rotate']},
    editArtist:{subControls:['done', 'cancel']},
    editFrame:{subControls:['done', 'cancel', 'type', 'frameColour', 'mountColour']},
    editRoom:{subControls:['done', 'cancel', 'floorColour', 'wallColour']},
    deleteArtwork:{}
};*/

class PictureMakerControls extends Component {

    render() {
        return (
            <div className='pictureMakerControls'>

                <h4>ArtFly Studio</h4>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}`}>Artwork</ControlPanelButt>


                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/instructions`}>Instructions</ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/`}>Add Photo</ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/gallery/${this.props.artistId}/artwork/${this.props.artworkId}`}>
                    DONE
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editPhoto`}>
                    Edit Photo
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editArtist`}>
                    Edit artist
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editFrame`}>
                    Edit Frame
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editRoom`}>
                    Edit Room
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/deleteArtwork`}>
                    Delete Artwork
                </ControlPanelButt>
            </div>
        );
    }
}

export default PictureMakerControls;

/*
 return (



     <div className='pictureMakerControls'>
                <IconLogo/>
                <h4>Edit Photo</h4>
                <Butt>Rotate</Butt>
                <Butt>Done</Butt>
                <Butt>Cancel</Butt>
            </div>
);
*/
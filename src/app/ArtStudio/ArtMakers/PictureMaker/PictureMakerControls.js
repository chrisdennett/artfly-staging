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

    const { artworkId, artistId} = this.props;

    const doneLink = artistId ? `/gallery/${artistId}/artwork/${artworkId}` : '/';

        return (
            <div className='pictureMakerControls'>

                <h4>ArtFly Studio: Picture Maker</h4>

                <ControlPanelButt
                    linkTo={`/artStudio/y4LO3S2bYQ2p80co96vF`}>
                    TEST pic
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/new/uploadPhoto`}>
                    TEST new artwork
                </ControlPanelButt>

                {/*<ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/uploadPhoto`}>
                    Add new photo
                </ControlPanelButt>*/}

                <ControlPanelButt
                    linkTo={`/artStudio/${artworkId}/artworkPreview`}>
                    Artwork Preview
                </ControlPanelButt>

                {/*<ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/instructions`}>
                    Instructions
                </ControlPanelButt>*/}

                <ControlPanelButt
                    linkTo={doneLink}>
                    DONE
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${artworkId}/editPhoto`}>
                    Edit Photo
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${artworkId}/editArtist`}>
                    Edit artist
                </ControlPanelButt>

                {/*<ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editFrame`}>
                    Edit Frame
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editRoom`}>
                    Edit Room
                </ControlPanelButt>*/}

                <ControlPanelButt
                    linkTo={`/artStudio/${artworkId}/deleteArtwork`}>
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
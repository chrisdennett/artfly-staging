// externals
import React, { Component } from "react";
import {
    faEye,
    faObjectGroup,
    faTrashAlt,
    faCheckCircle,
    faChild
} from '@fortawesome/fontawesome-free-solid';
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

        const { artworkId, artistId } = this.props;

        const doneLink = artistId ? `/gallery/${artistId}/artwork/${artworkId}` : '/';

        return (
            <div className='pictureMakerControls'>

                <h4>ArtFly Studio: Picture Maker</h4>

                {/*<ControlPanelButt
                    linkTo={`/artStudio/8XvbOGbsHoGMyBqRJIFk/editPhoto`}>
                    TEST pic
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/new/uploadPhoto`}>
                    TEST new artwork
                </ControlPanelButt>*/}

                {/*<ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/instructions`}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </ControlPanelButt>*/}

                <ControlPanelButt
                    icon={faCheckCircle}
                    label={'DONE'}
                    linkTo={doneLink}/>

                <ControlPanelButt
                    icon={faEye}
                    label={'PREVIEW'}
                    linkTo={`/artStudio/${artworkId}/artworkPreview`}/>

                <ControlPanelButt
                    icon={faObjectGroup}
                    label={'CROP & ROTATE'}
                    linkTo={`/artStudio/${artworkId}/editPhoto`}/>

                <ControlPanelButt
                    icon={faChild}
                    label={'EDIT ARTIST'}
                    linkTo={`/artStudio/${artworkId}/editArtist`}/>

                {/*<ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editFrame`}>
                    Edit Frame
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/editRoom`}>
                    Edit Room
                </ControlPanelButt>*/}

                <ControlPanelButt
                    icon={faTrashAlt}
                    label={'DELETE'}
                    linkTo={`/artStudio/${artworkId}/deleteArtwork`}/>
            </div>
        );
    }
}

export default PictureMakerControls;
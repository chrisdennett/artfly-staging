// externals
import React, { Component } from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEye, faObjectGroup, faTrashAlt, faInfoCircle, faCheckCircle, faChild } from '@fortawesome/fontawesome-free-solid';
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

                {/*<ControlPanelButt
                    linkTo={`/artStudio/8XvbOGbsHoGMyBqRJIFk/editPhoto`}>
                    TEST pic
                </ControlPanelButt>

                <ControlPanelButt
                    linkTo={`/artStudio/new/uploadPhoto`}>
                    TEST new artwork
                </ControlPanelButt>*/}

                <ControlPanelButt
                    linkTo={`/artStudio/${this.props.artworkId}/instructions`}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </ControlPanelButt>

                <ControlPanelButt
                    label={'Preview'}
                    linkTo={`/artStudio/${artworkId}/artworkPreview`}>
                    <FontAwesomeIcon icon={faEye} />
                </ControlPanelButt>


                <ControlPanelButt
                    label={'Done'}
                    linkTo={doneLink}>

                    <FontAwesomeIcon icon={faCheckCircle} />
                </ControlPanelButt>

                <ControlPanelButt
                    label={'Crop/rotate'}
                    linkTo={`/artStudio/${artworkId}/editPhoto`}>
                    <FontAwesomeIcon icon={faObjectGroup} />
                </ControlPanelButt>

                <ControlPanelButt
                    label={'Edit Artist'}
                    linkTo={`/artStudio/${artworkId}/editArtist`}>
                    <FontAwesomeIcon icon={faChild} />
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
                    <FontAwesomeIcon icon={faTrashAlt} />
                </ControlPanelButt>
            </div>
        );
    }
}

export default PictureMakerControls;
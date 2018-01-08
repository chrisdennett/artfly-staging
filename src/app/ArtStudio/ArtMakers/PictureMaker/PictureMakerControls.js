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

class PictureMakerControls extends Component {

    render() {

        const { artworkId, artistId, currentEditScreen } = this.props;
        const doneLink = artistId ? `/gallery/${artistId}/artwork/${artworkId}` : '/';

        return (
            <div className='pictureMakerControls'>

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
                    isSelected={currentEditScreen==='artworkPreview'}
                    icon={faEye}
                    label={'PREVIEW'}
                    linkTo={`/artStudio/${artworkId}/artworkPreview`}/>

                <ControlPanelButt
                    isSelected={currentEditScreen==='editPhoto'}
                    icon={faObjectGroup}
                    label={'CROP & ROTATE'}
                    linkTo={`/artStudio/${artworkId}/editPhoto`}/>

                <ControlPanelButt
                    isSelected={currentEditScreen==='editArtist'}
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
                    isSelected={currentEditScreen==='deleteArtwork'}
                    icon={faTrashAlt}
                    label={'DELETE'}
                    linkTo={`/artStudio/${artworkId}/deleteArtwork`}/>
            </div>
        );
    }
}

export default PictureMakerControls;
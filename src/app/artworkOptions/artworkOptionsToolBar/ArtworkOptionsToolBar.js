import React, { Component } from "react";
import faObjectGroup from "@fortawesome/fontawesome-pro-solid/faObjectGroup";
import faShare from "@fortawesome/fontawesome-pro-solid/faShare";
import faUpload from "@fortawesome/fontawesome-pro-solid/faUpload";
import faListAlt from "@fortawesome/fontawesome-pro-solid/faListAlt";
import faImage from "@fortawesome/fontawesome-pro-solid/faImage";
import faEye from "@fortawesome/fontawesome-pro-solid/faEye";
import faPalletAlt from "@fortawesome/fontawesome-pro-solid/faPalletAlt";
import * as faSave from "@fortawesome/fontawesome-pro-solid/faSave";
// styles
import './artworkOptionsToolBar_styles.css';
// comps
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import IconLogo from "../../global/icon/icons/IconLogo";
import Link from "../../global/Butt/Link";

class ArtworkOptionsToolBar extends Component {

    /*constructor(props) {
        super(props);

    }*/

    render() {
        const { currentTool, disableEditing, allowEditing, showArtworkControls, onSave, onToolSelect } = this.props;

        // const artworkIsEditable = false;

        return (
            <div className={'quickArtMakerTools'}>
                <div className={'quickArtMakerTools--logoHolder'}>
                    <Link linkTo={'/'}>
                        <IconLogo/>
                    </Link>

                </div>

                {allowEditing &&
                <div>

                    {showArtworkControls &&
                    <ControlPanelButt
                        icon={faSave}
                        onClick={onSave}
                        label={'SAVE'}/>
                    }

                    <ControlPanelButt
                        isSelected={currentTool === 'upload'}
                        icon={faUpload}
                        onClick={() => onToolSelect('upload')}
                        label={'ADD PIC'}/>

                    <ControlPanelButt
                        isSelected={currentTool === 'crop'}
                        disabled={disableEditing}
                        icon={faObjectGroup}
                        onClick={() => onToolSelect('crop')}
                        label={'CROP & ROTATE'}/>

                    <ControlPanelButt
                        isSelected={currentTool === 'titles'}
                        disabled={disableEditing}
                        icon={faListAlt}
                        onClick={() => onToolSelect('titles')}
                        label={'TITLES'}/>

                    <ControlPanelButt
                        isSelected={currentTool === 'frame'}
                        disabled={disableEditing}
                        icon={faImage}
                        onClick={() => onToolSelect('frame')}
                        label={'FRAME'}/>

                    <ControlPanelButt
                        isSelected={currentTool === 'room'}
                        disabled={disableEditing}
                        icon={faPalletAlt}
                        onClick={() => onToolSelect('room')}
                        label={'ROOM'}/>

                    <ControlPanelButt
                        isSelected={currentTool === 'view'}
                        disabled={disableEditing}
                        icon={faEye}
                        onClick={() => onToolSelect('view')}
                        label={'VIEW'}/>

                    <ControlPanelButt
                        isSelected={currentTool === 'share'}
                        disabled={disableEditing}
                        icon={faShare}
                        onClick={() => onToolSelect('share')}
                        label={'SAVE & SHARE'}/>
                </div>
                }
            </div>
        );
    }
}

export default ArtworkOptionsToolBar;
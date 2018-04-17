import React, { Component } from "react";
import * as faObjectGroup from "@fortawesome/fontawesome-pro-solid/faObjectGroup";
// import * as faShare from "@fortawesome/fontawesome-pro-solid/faShare";
// import * as faUpload from "@fortawesome/fontawesome-pro-solid/faUpload";
import * as faListAlt from "@fortawesome/fontawesome-pro-solid/faListAlt";
import * as faImage from "@fortawesome/fontawesome-pro-solid/faImage";
// import * as faEye from "@fortawesome/fontawesome-pro-solid/faEye";
import * as faPalletAlt from "@fortawesome/fontawesome-pro-solid/faPalletAlt";
// import * as faSave from "@fortawesome/fontawesome-pro-solid/faSave";
import * as faBars from "@fortawesome/fontawesome-pro-solid/faBars";
// styles
import './artworkOptionsToolBar_styles.css';
// comps
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import IconLogo from "../../global/icon/icons/IconLogo";
import Link from "../../global/Butt/Link";

class ArtworkOptionsToolBar extends Component {

    constructor(props) {
        super(props);

        this.state = {editingControlsAreOpen:true};

        this.onEditOpenClick = this.onEditOpenClick.bind(this);

    }

    onEditOpenClick(){
        this.setState((state) => {
            return {editingControlsAreOpen: !state.editingControlsAreOpen}
        })
    }

    render() {
        const { editingControlsAreOpen } = this.state;
        const { currentTool, disableEditing, userIsAdmin, onToolSelect } = this.props;
        const allowEditing = userIsAdmin && editingControlsAreOpen;
        const dynamicClass = allowEditing ? 'quickArtMakerTools--withBackground' : '';

        return (
            <div className={`quickArtMakerTools ${dynamicClass}`}>

                {userIsAdmin &&
                <ControlPanelButt icon={faBars}
                                  onClick={this.onEditOpenClick}/>
                }

                {allowEditing &&
                <div>

                    {/*{!saveButtonIsDisabled &&
                    <ControlPanelButt
                        icon={faSave}
                        onClick={onSave}
                        label={'SAVE'}/>
                    }*/}

                    {/*<ControlPanelButt
                        isSelected={currentTool === 'upload'}
                        icon={faUpload}
                        onClick={() => onToolSelect('upload')}
                        label={'ADD PIC'}/>*/}

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

                    {/*<ControlPanelButt
                        isSelected={currentTool === 'view'}
                        disabled={disableEditing}
                        icon={faEye}
                        onClick={() => onToolSelect('view')}
                        label={'VIEW'}/>*/}

                    {/*<ControlPanelButt
                        isSelected={currentTool === 'share'}
                        disabled={disableEditing}
                        icon={faShare}
                        onClick={() => onToolSelect('share')}
                        label={'SHARE'}/>*/}
                </div>
                }
            </div>
        );
    }
}

export default ArtworkOptionsToolBar;
import React, { Component } from "react";
import faObjectGroup from "@fortawesome/fontawesome-pro-solid/faObjectGroup";
import faShare from "@fortawesome/fontawesome-pro-solid/faShare";
import faUpload from "@fortawesome/fontawesome-pro-solid/faUpload";
import faListAlt from "@fortawesome/fontawesome-pro-solid/faListAlt";
import faImage from "@fortawesome/fontawesome-pro-solid/faImage";
import faEye from "@fortawesome/fontawesome-pro-solid/faEye";
import faPalletAlt from "@fortawesome/fontawesome-pro-solid/faPalletAlt";
import faSave from "@fortawesome/fontawesome-pro-solid/faSave";
// styles
import './quickArtMakerTools_styles.css';
// comps
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import IconLogo from "../../global/icon/icons/IconLogo";
import Link from "../../global/Butt/Link";

class QuickArtMakerToolBar extends Component {

    constructor(props) {
        super(props);

        this.onAddPicClick = this.onAddPicClick.bind(this);
        this.onCropClick = this.onCropClick.bind(this);
        this.onAddTitlesClick = this.onAddTitlesClick.bind(this);
        this.onFrameClick = this.onFrameClick.bind(this);
        this.onRoomClick = this.onRoomClick.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
        this.onShareClick = this.onShareClick.bind(this);
    }

    onAddPicClick() { this.props.onToolSelect('upload') }
    onCropClick() { this.props.onToolSelect('crop') }
    onAddTitlesClick() { this.props.onToolSelect('titles') }
    onFrameClick() { this.props.onToolSelect('frame') }
    onRoomClick() { this.props.onToolSelect('room') }
    onViewClick() { this.props.onToolSelect('view') }
    onShareClick() { this.props.onToolSelect('share') }

    render() {
        const { currentTool, disableEditing, showArtworkControls, onSave } = this.props;

        console.log("showArtworkControls: ", showArtworkControls);

        return (
            <div className={'quickArtMakerTools'}>
                <div className={'quickArtMakerTools--logoHolder'}>
                    <Link linkTo={'/'}>
                        <IconLogo/>
                    </Link>

                </div>

                {showArtworkControls &&
                <ControlPanelButt
                    icon={faSave}
                    onClick={onSave}
                    label={'SAVE'}/>
                }

                <ControlPanelButt
                    isSelected={currentTool === 'upload'}
                    icon={faUpload}
                    onClick={this.onAddPicClick}
                    label={'ADD PIC'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'crop'}
                    disabled={disableEditing}
                    icon={faObjectGroup}
                    onClick={this.onCropClick}
                    label={'CROP & ROTATE'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'titles'}
                    disabled={disableEditing}
                    icon={faListAlt}
                    onClick={this.onAddTitlesClick}
                    label={'TITLES'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'frame'}
                    disabled={disableEditing}
                    icon={faImage}
                    onClick={this.onFrameClick}
                    label={'FRAME'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'room'}
                    disabled={disableEditing}
                    icon={faPalletAlt}
                    onClick={this.onRoomClick}
                    label={'ROOM'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'view'}
                    disabled={disableEditing}
                    icon={faEye}
                    onClick={this.onViewClick}
                    label={'VIEW'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'share'}
                    disabled={disableEditing}
                    icon={faShare}
                    onClick={this.onShareClick}
                    label={'SAVE & SHARE'}/>
            </div>
        );
    }
}

export default QuickArtMakerToolBar;
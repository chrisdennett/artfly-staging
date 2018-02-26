import React, { Component } from "react";
import faObjectGroup from "@fortawesome/fontawesome-pro-solid/faObjectGroup";
import faShare from "@fortawesome/fontawesome-pro-solid/faShare";
import faUpload from "@fortawesome/fontawesome-pro-solid/faUpload";
import faListAlt from "@fortawesome/fontawesome-pro-solid/faListAlt";
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
        this.onViewClick = this.onViewClick.bind(this);
        this.onShareClick = this.onShareClick.bind(this);
    }

    onAddPicClick() { this.props.onToolSelect('upload') }

    onCropClick() { this.props.onToolSelect('crop') }

    onAddTitlesClick() { this.props.onToolSelect('add-titles') }

    onViewClick() { this.props.onToolSelect('view') }

    onShareClick() { this.props.onToolSelect('share') }

    render() {
        const { currentTool, disableEditing } = this.props;

        return (
            <div className={'quickArtMakerTools'}>
                <div className={'quickArtMakerTools--logoHolder'}>
                    <Link linkTo={'/'}>
                        <IconLogo/>
                    </Link>

                </div>

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
                    isSelected={currentTool === 'add-titles'}
                    disabled={disableEditing}
                    icon={faListAlt}
                    onClick={this.onAddTitlesClick}
                    label={'ADD TITLES'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'view'}
                    disabled={disableEditing}
                    icon={faObjectGroup}
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
import React, { Component } from "react";
import { faObjectGroup, faShare } from "@fortawesome/fontawesome-free-solid/index";
// comps
import ControlPanelButt from "../../global/Butt/ControlPanelButt";

class QuickArtMakerTools extends Component {

    constructor(props){
        super(props);

        this.onCropClick = this.onCropClick.bind(this);
        this.onShareClick = this.onShareClick.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
    }

    onViewClick() { this.props.onToolSelect('view') }
    onCropClick(){ this.props.onToolSelect('crop') }
    onShareClick() { this.props.onToolSelect('share') }

    render() {
        return (
            <div>
                <ControlPanelButt
                    isSelected={false}
                    icon={faObjectGroup}
                    onClick={this.onViewClick}
                    label={'VIEW'}/>

                <ControlPanelButt
                    isSelected={false}
                    icon={faObjectGroup}
                    onClick={this.onCropClick}
                    label={'CROP & ROTATE'}/>

                <ControlPanelButt
                    isSelected={false}
                    icon={faShare}
                    onClick={this.onShareClick}
                    label={'SHARE'}/>
            </div>
        );
    }
}

export default QuickArtMakerTools;
import React, { Component } from "react";
import faPalletAlt from "@fortawesome/fontawesome-pro-solid/faPalletAlt";
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './quickRoom_styles.css';
// comps
// import QuickArtwork from "../quickArtwork/QuickArtwork";
import RoomPresets from "./presets/RoomPresets";
import Butt from "../../global/Butt/Butt";
import ToolControlPanel from "../../global/toolControlPanel/ToolControlPanel";

class QuickRoomEditor extends Component {

    constructor(props) {
        super(props);

        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    // Global events
    onDoneClick() {
        this.props.onDone();
    }

    onCancelClick() {
        this.props.onCancel();
    }

    render() {
        const { width, roomData, onDataChange } = this.props;

        const globalButts = [
            <Butt key="done" fullWidth={true} style={{ fontSize: '1rem' }} label={'DONE'} green
                  onClick={this.onDoneClick}/>,
            <Butt key="cancel" fullWidth={true} style={{ fontSize: '1rem' }} label={'CANCEL'} red
                  onClick={this.onCancelClick}/>
        ];

        const toolOptions = [
            {
                label: 'Room options',
                content: <RoomPresets
                    onDataChange={onDataChange}
                    roomData={roomData}
                />
            }
        ];

        return (
            <div className={'quickRoomEditor'}>

                <ToolControlPanel globalButts={globalButts}
                                  width={width}
                                  title={'ROOM'}
                                  titleIcon={faPalletAlt}
                                  toolOptions={toolOptions}/>


            </div>
        );
    }
}

export default QuickRoomEditor;
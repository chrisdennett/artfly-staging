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

        this.state = {initialData:null};

        this.onDoneClick = this.onDoneClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
    }

    componentWillMount(){
        this.setState({initialData: this.props.roomData});
    }

    // Global events
    onDoneClick() {
        this.props.onDone();
    }

    onResetClick() {
        this.props.onDataChange({roomData:this.state.initialData});
    }

    render() {
        const { width, roomData, onDataChange } = this.props;
        const dataChanged = this.state.initialData !== roomData;

        const globalButts = [
            <Butt key="done" fullWidth={true}
                  style={{ fontSize: '1rem' }}
                  label={'DONE'}
                  green
                  onClick={this.onDoneClick}/>,

            <Butt key="reset" fullWidth={true}
                  style={{ fontSize: '1rem' }}
                  label={'RESET'}
                  disabled={!dataChanged}
                  red
                  onClick={this.onResetClick}/>
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
import React, { Component } from "react";
import faPalletAlt from "@fortawesome/fontawesome-pro-solid/faPalletAlt";
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './quickRoom_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import RoomPresets from "./presets/RoomPresets";
import Butt from "../../global/Butt/Butt";
import ToolControlPanel from "../../global/toolControlPanel/ToolControlPanel";

class QuickRoomEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { currentTool: 'presets' };

        this.onDoneClick = this.onDoneClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);

        this.onPresetsSelected = this.onPresetsSelected.bind(this);
        this.onWallEditSelected = this.onWallEditSelected.bind(this);
        this.onFloorEditSelected = this.onFloorEditSelected.bind(this);

        this.onWallSwatchSelected = this.onWallSwatchSelected.bind(this);
        this.onFloorSwatchSelected = this.onFloorSwatchSelected.bind(this);
        this.onIncludeSkirtingChange = this.onIncludeSkirtingChange.bind(this);
        this.onIncludeGuardRailChange = this.onIncludeGuardRailChange.bind(this);
    }

    componentWillMount() {
        const { artworkData } = this.props;

        if (artworkData) {
            this.setState({ ...artworkData.roomData });
        }
    }

    // Tool selector events
    onPresetsSelected() {
        this.setState({ currentTool: 'presets' });
    }

    onWallEditSelected() {
        this.setState({ currentTool: 'wall' });
    }

    onFloorEditSelected() {
        this.setState({ currentTool: 'floor' });
    }

    // Global events
    onDoneClick() {
        const { wallTileUrl, floorTileUrl, includeSkirting, includeGuardRail } = this.state;
        const roomData = { wallTileUrl, floorTileUrl, includeSkirting, includeGuardRail };

        this.props.onDone(roomData);
    }

    onCancelClick() {
        this.props.onCancel();
    }

    // preset selections
    onWallSwatchSelected(wallTileUrl) {
        this.setState({ wallTileUrl });
    }

    onFloorSwatchSelected(floorTileUrl) {
        this.setState({ floorTileUrl });
    }

    onIncludeSkirtingChange(includeSkirting) {
        this.setState({ includeSkirting });
    }

    onIncludeGuardRailChange(includeGuardRail) {
        this.setState({ includeGuardRail });
    }

    render() {
        const { height, width, artworkData, masterCanvas } = this.props;
        const { wallTileUrl, floorTileUrl, includeSkirting, includeGuardRail } = this.state;

        const roomData = { wallTileUrl, floorTileUrl, includeSkirting, includeGuardRail };

        const unsavedArtworkData = { ...artworkData, titlesData: null, roomData };

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
                    onWallSwatchSelected={this.onWallSwatchSelected}
                    onFloorSwatchSelected={this.onFloorSwatchSelected}
                    onIncludeGuardRailChange={this.onIncludeGuardRailChange}
                    onIncludeSkirtingChange={this.onIncludeSkirtingChange}
                    includeGuardRail={includeGuardRail}
                    includeSkirting={includeSkirting}/>
            }
        ];

        return (
            <div className={'quickRoomEditor'}>

                <ToolControlPanel globalButts={globalButts}
                                  width={width}
                                  title={'ROOM'}
                                  titleIcon={faPalletAlt}
                                  toolOptions={toolOptions}/>

                <QuickArtwork height={height}
                              width={width}
                              artworkData={unsavedArtworkData}
                              isFixed={true}
                              masterCanvas={masterCanvas}
                />

            </div>
        );
    }
}

export default QuickRoomEditor;
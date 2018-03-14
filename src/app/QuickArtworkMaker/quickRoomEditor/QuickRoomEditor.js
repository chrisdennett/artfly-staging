import React, { Component } from "react";
// styles
import './quickRoom_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import RoomPresets from "./presets/RoomPresets";
import Butt from "../../global/Butt/Butt";

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
        const { currentTool, wallTileUrl, floorTileUrl, includeSkirting, includeGuardRail } = this.state;

        const roomData = { wallTileUrl, floorTileUrl, includeSkirting, includeGuardRail };

        const unsavedArtworkData = { ...artworkData, titlesData: null, roomData };

        return (
            <div className={'quickRoomEditor'}>

                <div className={'toolControlPanel'}>
                    <div className={'toolControlPanel--content'}>

                       {/* <div className={'toolControlPanel--options'}>
                            <ControlPanelButt onClick={this.onPresetsSelected}
                                              isSelected={currentTool === 'presets'}
                                              icon={faThReg}
                                              style={{ margin: 0 }}
                                              label={'PRESETS'}/>

                            <ControlPanelButt onClick={this.onWallEditSelected}
                                              isSelected={currentTool === 'frame'}
                                              icon={faSquareReg}
                                              style={{ margin: 0 }}
                                              label={'WALL'}/>

                            <ControlPanelButt onClick={this.onFloorEditSelected}
                                              isSelected={currentTool === 'mount'}
                                              icon={faSquare}
                                              style={{ margin: 0 }}
                                              label={'FLOOR'}/>
                        </div>*/}

                        <div className={'toolControlPanel--currentOptionContent'}>
                            {currentTool === 'presets' &&
                            <RoomPresets
                                onWallSwatchSelected={this.onWallSwatchSelected}
                                onFloorSwatchSelected={this.onFloorSwatchSelected}
                                onIncludeGuardRailChange={this.onIncludeGuardRailChange}
                                onIncludeSkirtingChange={this.onIncludeSkirtingChange}
                                includeGuardRail={includeGuardRail}
                                includeSkirting={includeSkirting}
                            />
                            }
                        </div>

                        <div className={'toolControlPanel--globalButts'}>
                            <Butt fullWidth={true} style={{ fontSize: '1rem' }} label={'DONE'} green
                                  onClick={this.onDoneClick}/>
                            <Butt fullWidth={true} style={{ fontSize: '1rem' }} label={'CANCEL'} red
                                  onClick={this.onCancelClick}/>
                        </div>

                    </div>
                </div>

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
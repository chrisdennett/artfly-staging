import React, { Component } from "react";
import faThReg from "@fortawesome/fontawesome-pro-regular/faTh";
import faSquareReg from "@fortawesome/fontawesome-pro-regular/faSquare";
import faSquare from "@fortawesome/fontawesome-pro-solid/faSquare";
import faCheckSquare from "@fortawesome/fontawesome-pro-solid/faCheckSquare";
// styles
import './quickRoom_styles.css';
// comps
import QuickArtwork from "../quickArtwork/QuickArtwork";
import ControlPanelButt from "../../global/Butt/ControlPanelButt";
import RoomPresets from "./presets/RoomPresets";

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
        const { wallTileUrl } = this.state;
        const roomData = { wallTileUrl,  };

        this.props.onDone(roomData);
    }

    onCancelClick() {
        this.props.onCancel();
    }

    // preset selections
    onWallSwatchSelected(wallTileUrl) {
        this.setState({ wallTileUrl });
    }

    render() {
        const { height, width, artworkData, masterCanvas } = this.props;
        const { currentTool, wallTileUrl } = this.state;

        const roomData = { wallTileUrl };

        const unsavedArtworkData = { ...artworkData, titlesData: null, roomData };

        return (
            <div className={'quickRoomEditor'}>

                <div className={'toolControlPanel'}>
                    <div className={'toolControlPanel--content'}>

                        <div className={'toolControlPanel--options'}>
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
                        </div>

                        <div className={'toolControlPanel--currentOptionContent'}>
                            {currentTool === 'presets' &&
                            <RoomPresets
                                onWallSwatchSelected={this.onWallSwatchSelected}
                            />
                            }
                        </div>

                        <div className={'toolControlPanel--globalButts'}>
                            <ControlPanelButt onClick={this.onDoneClick}
                                              icon={faCheckSquare}
                                              style={{ margin: 0, color: '#8ca630' }}
                                              label={'SAVE'}/>

                            <ControlPanelButt onClick={this.onCancelClick}
                                              icon={faCheckSquare}
                                              style={{ margin: 0, color: '#ce373e' }}
                                              label={'CANCEL'}/>
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
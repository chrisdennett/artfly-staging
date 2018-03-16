import React, { Component } from 'react';
// styles
import './presetsControl_styles.css'
// comps
import CheckBox from "../../../global/CheckBox/CheckBox";
import ToolControlPanelContent from "../../../global/toolControlPanel/ToolControlPanelContent";
import ToolControlPanelSection from "../../../global/toolControlPanel/ToolControlPanelSection";
import Palette from "../../../global/pallete/Palette";

const wallPresets = {
    baseUrl: '/images/tiles-wall/',
    tiles: {
        brick0: {
            presetName: 'brick-0',
            fileName: 'brickwall.png'
        },
        brick2: {
            presetName: 'brick-2',
            fileName: 'Brick-2.jpg'
        },
        brick3: {
            presetName: 'brick-3',
            fileName: 'Brick-3.jpg'
        },
        brick4: {
            presetName: 'brick-4',
            fileName: 'Brick-4.jpg'
        },
        brick5: {
            presetName: 'brick-5',
            fileName: 'Brick-5.jpg'
        },
        brick7: {
            presetName: 'brick-7',
            fileName: 'Brick-7.jpg'
        },
        brick8: {
            presetName: 'brick-8',
            fileName: 'Brick-8.jpg'
        },
        brick9: {
            presetName: 'brick-9',
            fileName: 'Brick-9.jpg'
        },
        brick11: {
            presetName: 'brick-11',
            fileName: 'Brick-11.jpg'
        },
        brick13: {
            presetName: 'brick-13',
            fileName: 'Brick-13.jpg'
        },
        brick14: {
            presetName: 'brick-14',
            fileName: 'Brick-14.jpg'
        },
        brick15: {
            presetName: 'brick-15',
            fileName: 'Brick-15.jpg'
        },
        brick16: {
            presetName: 'brick-16',
            fileName: 'Brick-16.jpg'
        },
        brick17: {
            presetName: 'brick-17',
            fileName: 'Brick-17.jpg'
        },
        concrete1: {
            presetName: 'Concrete-1',
            fileName: 'Concrete-1.jpg'
        },
        concrete2: {
            presetName: 'Concrete-2',
            fileName: 'Concrete-2.jpg'
        },
        concrete3: {
            presetName: 'Concrete-3',
            fileName: 'Concrete-3.jpg'
        },
        concrete7: {
            presetName: 'Concrete-7',
            fileName: 'Concrete-7.jpg'
        },
        concrete8: {
            presetName: 'Concrete-8',
            fileName: 'Concrete-8.jpg'
        }

    }
};

const floorPresets = {
    baseUrl: '/images/tiles-floor/',
    tiles: {
        wood1: {
            presetName: 'wood-1',
            fileName: 'floor-boards.png'
        },
        wood3: {
            presetName: 'wood-3',
            fileName: 'Wood-6.jpg'
        }
    }
};

class RoomPresets extends Component {

    constructor(props) {
        super(props);

        this.onWallSwatchClick = this.onWallSwatchClick.bind(this);
        this.onFloorSwatchClick = this.onFloorSwatchClick.bind(this);
    }

    componentWillMount(){
        console.log("this.props: ", this.props);
    }

    onWallSwatchClick(presetKey, tileUrl) {
        // console.log("WALL: ", presetKey);
        this.props.onWallSwatchSelected(tileUrl);
    }

    onFloorSwatchClick(presetKey, tileUrl) {
        // console.log("FLOOR: ", presetKey);
        this.props.onFloorSwatchSelected(tileUrl);
    }

    onIncludeSkirtingChange(value) {
        this.props.onIncludeSkirtingChange(value)
    }

    onIncludeGuardRailChange(value) {
        this.props.onIncludeGuardRailChange(value)
    }

    render() {
        const {roomData} = this.props;
        const {includeSkirting, includeGuardRail, wallTileUrl, floorTileUrl} = roomData;

        return (
            <ToolControlPanelContent>
                <ToolControlPanelSection title={'Wall:'}>
                    <Palette swatchData={wallPresets}
                             selectedUrl={wallTileUrl}
                             onSwatchSelected={this.onWallSwatchClick}
                    />
                </ToolControlPanelSection>

                <ToolControlPanelSection title={'Floor:'}>
                    <Palette swatchData={floorPresets}
                             selectedUrl={floorTileUrl}
                             onSwatchSelected={this.onFloorSwatchClick}
                    />
                </ToolControlPanelSection>

                <ToolControlPanelSection>
                    <div className={'skirtingControlHolder'}>
                        <CheckBox label={'Skirting'}
                                  id={'include-skirting'}
                                  value={includeSkirting}
                                  onChange={(e) => this.onIncludeSkirtingChange(e.target.checked)}
                        />
                    </div>

                    <div className={'skirtingControlHolder'}>
                        <CheckBox label={'Guard rail'}
                                  id={'include-guard-rail'}
                                  value={includeGuardRail}
                                  onChange={(e) => this.onIncludeGuardRailChange(e.target.checked)}
                        />
                    </div>
                </ToolControlPanelSection>
            </ToolControlPanelContent>
        )
    };
}

export default RoomPresets;
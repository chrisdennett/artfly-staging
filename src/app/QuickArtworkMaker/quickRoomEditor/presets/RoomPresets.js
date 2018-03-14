import React, { Component } from 'react';
// styles
import './presetsControl_styles.css'
import CheckBox from "../../../global/CheckBox/CheckBox";
// comps

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
        },
    }
};

class RoomPresets extends Component {

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

    render() {
        const wallTileKeys = Object.keys(wallPresets.tiles);
        const floorPresetKeys = Object.keys(floorPresets.tiles);

        return (
            <div className={'roomPresets'}>
                <h2>Wall:</h2>
                <div className={'wallPresets'}>
                    {wallTileKeys.map((key) => {

                        const preset = wallPresets.tiles[key];
                        const tileUrl = wallPresets.baseUrl + preset.fileName;

                        return (
                            <div key={key} className={'imageSwatch'}
                                 onClick={() => this.onWallSwatchClick(key, tileUrl)}>
                                <img src={tileUrl} alt={preset.name}/>
                            </div>
                        )
                    })
                    }
                </div>


                <h2>Floor:</h2>
                <div className={'wallPresets'}>
                    {floorPresetKeys.map((key) => {
                        const preset = floorPresets.tiles[key];
                        const tileUrl = floorPresets.baseUrl + preset.fileName;

                        return (
                            <div key={key} className={'imageSwatch'}
                                 onClick={() => this.onFloorSwatchClick(key, tileUrl)}>
                                <img src={tileUrl} alt={preset.name}/>
                            </div>
                        )
                    })
                    }
                </div>
                <div className={'skirtingControlHolder'}>
                    <CheckBox label={'Skirting'}
                              id={'include-skirting'}
                              value={this.props.includeSkirting}
                              onChange={(e) => this.onIncludeSkirtingChange(e.target.checked)}
                    />
                </div>
            </div>
        )
    };
}

export default RoomPresets;
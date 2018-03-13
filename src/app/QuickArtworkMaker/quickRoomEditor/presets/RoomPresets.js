import React, { Component } from 'react';
// styles
import './presetsControl_styles.css'
// comps

const wallPresets = {
    baseUrl: '/images/tiles-wall/',
    tiles: {
        brick1: {
            presetName: 'brick-1',
            fileName: 'Brick-1.jpg'
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
        wood2: {
            presetName: 'wood-2',
            fileName: 'dark_wood.png'
        }
    }
};

class RoomPresets extends Component {

    onWallSwatchClick(presetKey, tileUrl) {
        this.props.onWallSwatchSelected(tileUrl);
    }

    onFloorSwatchClick(presetKey, tileUrl) {
        this.props.onFloorSwatchSelected(tileUrl);
    }

    render() {
        const wallTileKeys = Object.keys(wallPresets.tiles);
        const floorPresetKeys = Object.keys(floorPresets.tiles);

        return (
            <div>
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
            </div>
        )
    };
}

export default RoomPresets;
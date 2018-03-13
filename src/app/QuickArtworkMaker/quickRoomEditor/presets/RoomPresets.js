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

class RoomPresets extends Component {

    constructor(props) {
        super(props);

        this.onWallSwatchClick = this.onWallSwatchClick.bind(this);
    }

    componentWillMount() {

    }

    onWallSwatchClick(presetKey, tileUrl) {
        this.props.onWallSwatchSelected(tileUrl);
    }


    render() {
        const wallPresetKeys = Object.keys(wallPresets.tiles);

        return (
            <div className={'wallPresets'}>
                {wallPresetKeys.map((key) => {

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
        )
    };
}

export default RoomPresets;
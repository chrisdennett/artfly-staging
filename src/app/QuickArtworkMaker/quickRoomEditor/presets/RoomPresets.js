import React, { Component } from 'react';
// styles
import './presetsControl_styles.css'
// comps

const wallPresets = {
    baseUrl: '/images/tiles-wall/',
    tiles: {
        brick1: {
            presetName: 'brick-1',
            fileName: 'Brick-1.jpg',
            isTintable: true
        },
        brick2: {
            presetName: 'brick-2',
            fileName: 'Brick-2.jpg',
            isTintable: true
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

    onWallSwatchClick(presetKey, tileUrl){
        console.log("preset selected: ", presetKey);
        this.props.onWallSwatchSelected(tileUrl);
    }


    render() {
        const wallPresetKeys = Object.keys(wallPresets.tiles);

        return (
            <div className={'toolControlPanel'}>

                <div className={'toolControlPanel--content'}>

                    {wallPresetKeys.map((key) => {

                        const preset = wallPresets.tiles[key];
                        const tileUrl = wallPresets.baseUrl + preset.fileName;

                        return (
                            <div key={key} className={'imageSwatch'}
                                 onClick={() => this.onWallSwatchClick(key, tileUrl)}>
                                <img src={tileUrl} alt={preset.name} />
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
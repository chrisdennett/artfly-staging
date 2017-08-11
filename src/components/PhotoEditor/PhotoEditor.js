import React from "react";
import _ from 'lodash';

import ImageCropAndRotate from '../ArtworkEditor/ImageCropAndRotate';

const PhotoEditor = function (props) {

    const fullScreenStyle = {
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        backgroundColor: 'rgb(0,0,0)',
        overflowX: 'hidden',
        transition: '0.5s mode'
    };

    const contentStyle = {
        position: 'relative',
        color: '#fff',
        top: '2%',
        left: '2%'
    };

    return (
        <div style={fullScreenStyle}>
            <div style={contentStyle}>
                <h1>New image to add</h1>
                <button onClick={this.onSave.bind(this)}>SAVE</button>
                <button onClick={this.onCancel.bind(this)}>CANCEL</button>
                <label htmlFor="artistSelector">ARTIST: </label>
                <select value={this.state.selectedArtistId} onChange={(e) => {this.onArtistSelected(e.target.value)}}>
                    {
                        _.map(this.props.artists, (artistData, artistId) => {

                            return <option key={artistId}
                                           value={artistId}>{artistData.name}</option>;


                        })
                    }
                </select>

                <hr/>
                {this.state.imgSrc &&
                <div style={{ width: '50%' }}>
                    <ImageCropAndRotate url={this.state.imgSrc}
                                        onCropDataChange={this.onCropDataChange.bind(this)}
                                        onCropImageSave={this.onCropImageSave.bind(this)}/>
                </div>
                }
            </div>
        </div>
    );
};

export default PhotoEditor;
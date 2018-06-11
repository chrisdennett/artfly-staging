import React, { Component } from "react";
import { Elevation } from 'rmwc/Elevation';
import { Ripple } from 'rmwc/Ripple';
// const
import {THUMB_SIZE} from "../global/GLOBAL_CONSTANTS";
// helpers
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";

class ArtworkThumb extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { artworkData, onClick } = this.props;

        return (
            <div style={{ lineHeight: 0, padding: 10 }}
                 onClick={onClick}>
                <Elevation
                    z={this.state.elevation || 0}
                    transition
                    onMouseOver={() => this.setState({ elevation: 14 })}
                    onMouseOut={() => this.setState({ elevation: 0 })}>
                    <Ripple>
                        <FramedArtworkCanvas artworkData={artworkData}
                                             maxHeight={THUMB_SIZE}
                                             maxWidth={THUMB_SIZE}/>
                    </Ripple>
                </Elevation>
            </div>
        )
            ;
    }
}

export default ArtworkThumb;
import React, { Component } from "react";
// ui
import { Elevation } from 'rmwc/Elevation';
import { Ripple } from 'rmwc/Ripple';
import { Icon } from 'rmwc/Icon';
import { Button } from 'rmwc/Button';
// const
import { THUMB_SIZE } from "../../GLOBAL_CONSTANTS";
// helpers
import FramedArtworkCanvas from "../artwork/FramedArtworkCanvas";

class ArtworkThumb extends Component {

    constructor(props) {
        super(props);

        this.state = { elevation: 0 };
    }

    render() {
        const { artworkData, onClick, UpdateUrl, viewerIsAdmin } = this.props;

        return (
            <div style={{ lineHeight: 0, padding: 10, position: 'relative' }}>
                <Elevation
                    onClick={onClick}
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

                {viewerIsAdmin && artworkData.deleteAfter &&
                <Button raised
                        onClick={() => UpdateUrl('/profile')}
                        style={{ background: '#ffc325', position: 'absolute', minWidth: 42, border: '2px solid rgba(0,0,0,0.2)', zIndex: 2, marginLeft: '-21px', left: '50%', bottom: 0, color: 'rgba(0,0,0,0.6)', padding: 0 }}>
                    <Icon strategy="ligature" icon="warning" style={{ padding: 0 }}/>
                </Button>
                }
            </div>
        )
    }
}

export default ArtworkThumb;
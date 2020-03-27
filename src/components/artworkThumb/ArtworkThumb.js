import React, { Component } from "react";
// styles
import './artworkThumb_styles.css';
// ui
import { Elevation } from 'rmwc/Elevation';
import { Icon } from 'rmwc/Icon';
import { Button } from 'rmwc/Button';
// comps
import ArtworkLabel from "../artworkLabel/ArtworkLabel";

class ArtworkThumb extends Component {

    constructor(props) {
        super(props);

        this.state = { elevation: 0 };
    }

    render() {
        const { artworkData, onClick, UpdateUrl, viewerIsAdmin } = this.props;
        const { artist, age, title } = artworkData;
        const showLabel = artist || title || age;

        return (
            <div className={'artworkThumb--holder'}>
                <Elevation
                    onClick={onClick}
                    z={this.state.elevation || 0}
                    transition
                    onMouseOver={() => this.setState({ elevation: 14 })}
                    onMouseOut={() => this.setState({ elevation: 0 })}>

                    <img src={artworkData.thumbUrl}
                        className={'artworkThumb'}
                        alt={'gallery artwork thumb'} />

                </Elevation>

                {
                    showLabel &&
                    <div className={'artworkLabelHolder'}
                        style={{ margin: 0 }}>
                        <ArtworkLabel artist={artist}
                            age={age}
                            title={title}
                            thumbStyle={true} />
                    </div>
                }

                {viewerIsAdmin && artworkData.deleteAfter &&
                    <Button raised
                        onClick={() => UpdateUrl('/profile')}
                        style={{ background: '#ffc325', position: 'absolute', minWidth: 42, border: '2px solid rgba(0,0,0,0.2)', zIndex: 2, marginLeft: '-21px', left: '50%', bottom: 0, color: 'rgba(0,0,0,0.6)', padding: 0 }}>
                        <Icon strategy="ligature" icon="warning" style={{ padding: 0 }} />
                    </Button>
                }
            </div>
        )
    }
}

export default ArtworkThumb;
import React, { Component } from 'react';
import { connect } from 'react-redux';
// material ui
import { LinearProgress } from 'rmwc/LinearProgress';
import { Typography } from 'rmwc/Typography';

class ArtworkEditorSavingProgress extends Component {
    render() {
        const { label = 'Saving changes:', artworkSavingProgress, } = this.props;
        if(!artworkSavingProgress) return null;

        const { status, large, thumb, source } = artworkSavingProgress;

        if (status === 'dormant') {
            return null;
        }

        const holderStyle = {
            backgroundColor: 'rgba(0,0,0,0.6)',
            position: 'fixed',
            top: 0, bottom: 0, left: 0, right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 9999,
            justifyContent: 'center',
            padding: 5,
            borderBottom: '1px solid rgba(0,0,0,0.2)'
        };
        const processBarStyle = { marginTop: 10, marginBottom: 10 };

        return (
            <div style={holderStyle}>
                <Typography use={'body1'} style={{ color: '#fff' }}>
                    {label}
                </Typography>

                {source < 1 &&
                <LinearProgress style={processBarStyle} determinate={source > 0} progress={source}/>
                }

                {large < 1 &&
                <LinearProgress style={processBarStyle} determinate={large > 0} progress={large}/>
                }

                {thumb < 1 &&
                <LinearProgress style={processBarStyle} determinate={thumb > 0} progress={thumb}/>
                }
            </div>
        )
    }
}

const mapAppStateToProps = (state) => (
    {
        artworkSavingProgress:state.artworkSavingProgress
    }
);

export default connect(mapAppStateToProps)(ArtworkEditorSavingProgress);
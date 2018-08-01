import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './title_styles.css'
// comps
import HoverLogo from "../animatedIcons/HoverLogo";

const Title = function () {
    return (
        <div className={'title--holder'}>

            <HoverLogo/>

            <Typography tag={'h1'} style={{marginLeft: 15, fontWeight:'normal'}}>
                <span style={{color:'#6a6a6a', padding: '0 4px', borderTop:'4px solid #ff0000', borderBottom:'4px solid #ff0000'}}>A</span>
                <span style={{color:'#6a6a6a', padding: '0 4px', borderTop:'4px solid #ff6600', borderBottom:'4px solid #ff6600'}}>R</span>
                <span style={{color:'#6a6a6a', padding: '0 4px', borderTop:'4px solid #ffcc00', borderBottom:'4px solid #ffcc00'}}>T</span>
                <span style={{color:'#6a6a6a', padding: '0 4px', borderTop:'4px solid #abc837', borderBottom:'4px solid #abc837'}}>F</span>
                <span style={{color:'#6a6a6a', padding: '0 4px', borderTop:'4px solid #37abc8', borderBottom:'4px solid #37abc8'}}>L</span>
                <span style={{color:'#6a6a6a', padding: '0 4px', borderTop:'4px solid #aa00d4', borderBottom:'4px solid #aa00d4'}}>Y</span>
            </Typography>
        </div>
    )
};

export default Title;
import React from 'react';
import HoverLogo from "./animatedIcons/HoverLogo";

const Title = function () {
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>

            <HoverLogo/>

            <h1 style={{fontSize: '4rem', fontWeight: 'bold', color:'#fff', marginLeft: 15, marginTop:42}}>
                <span style={{padding: '2px 7px', backgroundColor:"#ff0000", border:'3px solid rgba(0,0,0,0.2)'}}>A</span>
                <span style={{padding: '2px 7px', backgroundColor:"#ff6600", border:'3px solid rgba(0,0,0,0.2)'}}>R</span>
                <span style={{padding: '2px 7px', backgroundColor:"#ffcc00", border:'3px solid rgba(0,0,0,0.2)'}}>T</span>
                <span style={{padding: '2px 7px', backgroundColor:"#abc837", border:'3px solid rgba(0,0,0,0.2)'}}>F</span>
                <span style={{padding: '2px 7px', backgroundColor:"#37abc8", border:'3px solid rgba(0,0,0,0.2)'}}>L</span>
                <span style={{padding: '2px 7px', backgroundColor:"#aa00d4", border:'3px solid rgba(0,0,0,0.2)'}}>Y</span>
            </h1>
        </div>
    )
};

export default Title;
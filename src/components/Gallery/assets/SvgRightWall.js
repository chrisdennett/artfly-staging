import React from 'react';

const SvgRightWall = function (props) {
    return (

        <div className="gallery-right-wall">
            <svg width="36.137" style={{height:'100%'}}>
                <defs>
                    <pattern id="bricksRight" x="0" y="0" width="36.137" height="74.899" patternUnits="userSpaceOnUse">

                        
    <path fill="#fff" color="#000" d="M0 .194h31.83v75H0z"/>
    <path d="M30.69.194v75" fillRule="evenodd" stroke="#666" fill="#666"/>
    <path fillOpacity=".997" stroke="#666" fill="#999" color="#000" d="M2.546 57.12h33.3V68.8h-33.3z"/>
    <path fillOpacity=".997" stroke="#666" fill="#ccc" color="#000" d="M20.37 38.12h15.48v12.19H20.37zM13.3.5h22.55v12.19H13.3z"/>
    <path fillOpacity=".997" stroke="#666" fill="#999" color="#000" d="M2.546 19.5h33.3v11.81h-33.3z"/>


                    </pattern>
                </defs>

                <rect fill="url(#bricksRight)" width="36.137" height={'100%'}/>
            </svg>
        </div>

    )
};

export default SvgRightWall;
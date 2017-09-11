import React from 'react';

const SvgRightWall = function (props) {
    return (

        <div className="gallery-right-wall">
            <svg width="59.459" style={{height:'100%'}}>
                <defs>
                    <pattern id="bricksRight" x="0" y="0" width="59.459" height="122.677" patternUnits="userSpaceOnUse">

                        
    <path fill="#fff" color="#000" d="M0 0h52.34v122.7H0z"/>
    <path d="M50.47 0v122.7" fillRule="evenodd" stroke="#666" fill="#666"/>
    <path fillOpacity=".997" stroke="#666" fill="#999" color="#000" d="M4.187 93.105h54.77v19.11H4.187zM33.5 62.025h25.46v19.94H33.5zM21.88.5h37.08v19.94H21.88zM4.187 31.575h54.77v19.32H4.187z"/>


                    </pattern>
                </defs>

                <rect fill="url(#bricksRight)" width="59.459" height={'100%'}/>
            </svg>
        </div>

    )
};

export default SvgRightWall;
import React from 'react';

const SvgLeftWall = function (props) {
    return (

        <div className="gallery-left-wall">
            <svg width="36.137" style={{height:'100%'}}>
                <defs>
                    <pattern id="bricksLeft" x="0" y="0" width="36.137" height="74.899" patternUnits="userSpaceOnUse">

                        
    <path fill="#fff" color="#000" d="M4.5.196h31.64v74.7H4.5z"/>
    <path d="M4.107.196v74.7" fillRule="evenodd" stroke="#666" fill="#666"/>
    <path fillOpacity=".997" stroke="#666" fill="#ccc" color="#000" d="M.5 56.89h33.11v11.63H.5z"/>
    <path fillOpacity=".997" stroke="#666" fill="#999" color="#000" d="M.5 37.97h15.39v12.14H.5zM.5.5h22.41v12.14H.5z"/>
    <path fillOpacity=".997" stroke="#666" fill="#ccc" color="#000" d="M.5 19.43h33.11v11.76H.5z"/>


                    </pattern>
                </defs>

                <rect fill="url(#bricksLeft)" width="36.137" height={'100%'}/>
            </svg>
        </div>

    )
};

export default SvgLeftWall;
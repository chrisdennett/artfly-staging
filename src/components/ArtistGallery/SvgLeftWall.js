import React from 'react';

const SvgLeftWall = function (props) {
    return (

        <div className="gallery-left-wall">
            <svg width="59.459" style={{height:'100%'}}>
                <defs>
                    <pattern id="bricksLeft" x="0" y="0" width="59.459" height="122.677" patternUnits="userSpaceOnUse">

                        
    <path fill="#fff" color="#000" d="M7.118 0h52.341v122.68H7.118z"/>
    <path d="M6.467 0v122.68" fillRule="evenodd" stroke="#666" fill="#666"/>
    <path fillOpacity=".997" stroke="#666" fill="#999" color="#000" d="M.5 93.107h54.772v19.107H.5zM.5 62.029h25.455v19.944H.5zM.5.5h37.083v19.944H.5zM.5 31.578h54.772v19.316H.5z"/>


                    </pattern>
                </defs>

                <rect fill="url(#bricksLeft)" width="59.459" height={'100%'}/>
            </svg>
        </div>

    )
};

export default SvgLeftWall;
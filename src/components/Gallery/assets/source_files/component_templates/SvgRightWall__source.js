import React from 'react';

const SvgRightWall = function (props) {
    return (

        <div className="gallery-right-wall">
            <changeme width="36.137" style={{height:'100%'}}>
                <defs>
                    <pattern id="bricksRight" x="0" y="0" width="36.137" height="74.899" patternUnits="userSpaceOnUse">

                        <img src="/src/components/Gallery/assets/source_files/svg_optimised/rightWall.svg"/>

                    </pattern>
                </defs>

                <rect fill="url(#bricksRight)" width="36.137" height={'100%'}/>
            </changeme>
        </div>

    )
};

export default SvgRightWall;
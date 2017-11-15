import React from 'react';

const SvgLeftWall = function (props) {
    return (

        <div className="gallery-left-wall">
            <changeme width="36.137" style={{height:'100%'}}>
                <defs>
                    <pattern id="bricksLeft" x="0" y="0" width="36.137" height="74.899" patternUnits="userSpaceOnUse">

                        <img src="/src/components/Gallery/assets/source_files/svg_optimised/leftWall.svg"/>

                    </pattern>
                </defs>

                <rect fill="url(#bricksLeft)" width="36.137" height={'100%'}/>
            </changeme>
        </div>

    )
};

export default SvgLeftWall;
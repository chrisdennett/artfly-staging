import React from 'react';

const Shadow = ({ width, height, y, x = 0, doubled = false, angled = false, opacity=0.1 }) => {
    const shadowHolderStyle = { position: 'absolute', left: x, top: y, padding: 0, lineHeight: 0 };

    const smallShadowHeight = height * 0.75;
    const smallShadowIndent = angled ? 8 : 0;
    const mainShadowIndent = angled ? 2 : 0;

    return (
        <svg height={height} width={width} style={shadowHolderStyle}>

            <polygon points={`0,0 ${width},0 ${width - mainShadowIndent},${height} ${mainShadowIndent},${height}`}
                     style={{ fill: `rgba(0,0,0,${opacity})` }}
            />

            {doubled &&
            <polygon points={`0,0 ${width},0 ${width - smallShadowIndent},${smallShadowHeight} ${smallShadowIndent},${smallShadowHeight}`}
                     style={{ fill: 'rgba(0,0,0,0.1)' }}
            />
            }
        </svg>
    )
};

export default Shadow;
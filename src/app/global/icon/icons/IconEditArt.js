import React from 'react';

const IconEditArt = ({ width = 42, height = 42, fill = '#fff', stroke='none' }) => {
    return (
        <svg height={width} width={height} viewBox="0 0 21 21">
            <path fill={fill} stroke={stroke} strokeWidth={1}
                d="M12.26 4.464l4.336 4.289a.46.46 0 0 1 0 .657L5.996 19.9l-4.46.48A.928.928 0 0 1 .5 19.36l.496-4.41 10.6-10.49a.473.473 0 0 1 .664 0zM19.95 3.475l-2.348-2.322a1.894 1.894 0 0 0-2.653 0l-1.801 1.781a.46.46 0 0 0 0 .657l4.336 4.289c.184.182.48.182.664 0l1.801-1.781a1.838 1.838 0 0 0 0-2.624z"/>
        </svg>
    )
};

export default IconEditArt;
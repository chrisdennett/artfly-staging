import React from 'react';

const IconAddArt = ({ width = 42, height = 42, fill = '#fff', stroke='none' }) => {
    return (
        <svg height={width} width={height} viewBox="0 0 21 21">
            <path fill={fill} stroke={stroke} strokeWidth={1}
                d="M18.62 17.92H2.37a1.865 1.865 0 0 1-1.875-1.855V4.935c0-1.024.84-1.855 1.875-1.855h16.25c1.036 0 1.875.83 1.875 1.855v11.13c0 1.024-.84 1.855-1.875 1.855zM4.87 5.24c-1.208 0-2.187.969-2.187 2.164s.98 2.164 2.187 2.164 2.187-.969 2.187-2.164S6.077 5.24 4.87 5.24zm-1.875 10.2h15v-4.327l-3.419-3.381a.472.472 0 0 0-.663 0l-5.297 5.241-2.168-2.14a.472.472 0 0 0-.663 0l-2.794 2.763v1.855z"/>
        </svg>
    )
};

export default IconAddArt;
import React from "react";

const Cloud = function ({ x, y, scale }) {
    return (
        <g fill="#fff" transform={`translate(${x}, ${y}) scale(${scale})`}>
            <ellipse rx="80.17" ry="65.71" cy="65.71" cx="151.1"/>
            <ellipse rx="69.65" ry="60.45" cy="118.3" cx="232.6"/>
            <ellipse rx="61.77" ry="52.57" cy="63.08" cx="245.8"/>
            <ellipse rx="88.05" ry="52.57" cy="147.2" cx="124.9"/>
            <ellipse rx="61.77" ry="57.83" cy="89.37" cx="61.77"/>
        </g>
    );
};

export default Cloud;
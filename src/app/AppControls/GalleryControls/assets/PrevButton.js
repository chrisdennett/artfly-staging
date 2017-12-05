import React from 'react';

const PrevButton = function (props) {
    return (
        <div className={'sketch-butt'}>
            <svg onClick={props.onClick} height="65" width="67" viewBox="0 0 67 65">
                <rect ry="0" height="65" width="67" fill="#fff" color="#000"/>
                <text fontSize="9.67" y="56.826" x="20.026" fontFamily="sans-serif" wordSpacing="0" letterSpacing="0">
                    <tspan fontWeight="900" fontSize="11.25" y="56.826" x="20.026" fontFamily="'Source Code Pro'">{props.label}</tspan>
                </text>
                <path d="M33.74 11.3c-8.342 0-15.1 6.714-15.1 15s6.759 15 15.1 15c8.342 0 15.1-6.714 15.1-15s-6.759-15-15.1-15zm7.063 17.66H33.74v4.288c0 .647-.792.974-1.248.514l-6.96-6.95a.716.716 0 0 1 0-1.022l6.96-6.956c.463-.46 1.248-.133 1.248.514v4.288h7.063a.73.73 0 0 1 .73.726v3.871a.73.73 0 0 1-.73.726z"/>
            </svg>
        </div>
    )
};

export default PrevButton;
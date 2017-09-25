import React from 'react';

const NextButton = function (props) {
    return (
        <div className={'sketch-butt'}>
            <svg onClick={props.onClick} width={'100%'} height={'100%'} viewBox="0 0 67 65">
                <rect ry="0" height="65" width="67.49" fill="#fff" color="#000"/>
                <text fontSize="9.67" y="56.826" x="19.977" fontFamily="sans-serif" wordSpacing="0" letterSpacing="0">
                    <tspan fontWeight="900" fontSize="11.25" y="56.826" x="19.977" fontFamily="'Source Code Pro'">{props.label}
                    </tspan>
                </text>
                <path
                    d="M33.74 11.3c8.342 0 15.1 6.714 15.1 15s-6.759 15-15.1 15c-8.342 0-15.1-6.714-15.1-15s6.759-15 15.1-15zm-7.063 17.66h7.063v4.288c0 .647.792.974 1.248.514l6.96-6.95a.716.716 0 0 0 0-1.022l-6.96-6.95c-.46-.46-1.25-.14-1.25.51v4.288h-7.063a.73.73 0 0 0-.73.726v3.87c0 .4.328.727.73.727z"/>
            </svg>
        </div>
    )
};

export default NextButton;
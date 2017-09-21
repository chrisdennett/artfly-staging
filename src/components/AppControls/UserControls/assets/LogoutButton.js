import React from 'react';

const LogoutButton = function (props) {
    return (
        <div className={'main-butt'}>
            <svg onClick={props.onClick} height="100%" width="100%" viewBox="0 0 67 65">
                <rect height="65" width="67" x="0" fill="#fff"/>
                <path
                    d="M51.34 25.24L39.13 37.32c-1.09 1.078-2.98.324-2.98-1.222v-6.901h-9.885a1.73 1.73 0 0 1-1.744-1.725v-6.901a1.73 1.73 0 0 1 1.744-1.725h9.885v-6.901c0-1.538 1.882-2.3 2.98-1.222l12.21 12.08a1.726 1.726 0 0 1 0 2.444zM29.17 36.96v-2.876a.87.87 0 0 0-.872-.863h-6.105c-1.287 0-2.326-1.028-2.326-2.3v-13.8c0-1.272 1.039-2.3 2.326-2.3h6.105a.87.87 0 0 0 .872-.862v-2.876a.87.87 0 0 0-.872-.863h-6.105c-3.852 0-6.977 3.09-6.977 6.9v13.8c0 3.81 3.125 6.902 6.977 6.902h6.105a.87.87 0 0 0 .872-.863z"/>
                <text>
                    <tspan fontWeight="900" fontSize="11.86" y="57" x="8.617" fontFamily="'Source Code Pro'">log out
                    </tspan>
                </text>
            </svg>
        </div>
    )
};

export default LogoutButton;
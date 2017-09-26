import React from 'react';

const SignInButton = function (props) {
    return (
        <div className={'sketch-butt'}>
            <svg onClick={props.onClick} height="65" width="67" viewBox="0 0 67 65">
                <path
                    d="M45.35 37.53h-6.105a.87.87 0 0 1-.872-.863v-2.876a.87.87 0 0 1 .872-.862h6.105c1.286 0 2.326-1.028 2.326-2.3v-13.8c0-1.272-1.039-2.3-2.326-2.3h-6.105a.87.87 0 0 1-.872-.863V10.79a.87.87 0 0 1 .872-.863h6.105c3.852 0 6.977 3.091 6.977 6.901v13.8c0 3.81-3.125 6.901-6.977 6.901zm-3.416-14.45L29.724 11c-1.09-1.078-2.98-.323-2.98 1.222v6.901h-9.885a1.73 1.73 0 0 0-1.744 1.725v6.901a1.73 1.73 0 0 0 1.744 1.725h9.885v6.901c0 1.546 1.89 2.3 2.98 1.222l12.21-12.08a1.726 1.726 0 0 0 0-2.444z"/>
                <text>
                    <tspan fontWeight="900" fontSize="11.86" y="57" x="15.945" fontFamily="'Source Code Pro'">sign in
                    </tspan>
                </text>
            </svg>
        </div>
    )
};

export default SignInButton;
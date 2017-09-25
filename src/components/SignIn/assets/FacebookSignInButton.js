import React from 'react';
import Butt from "../../global/Butt";

const FacebookSignInButton = function (props) {

    const facebookIcon = (
        <svg width={25} viewBox="0 0 120 120">
            <g stroke="none" fill="none">
                <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z"/>
                <path
                    d="M113.377146,0 L6.62285402,0 C2.96477253,0 0,2.96432291 0,6.62285402 L0,113.377146 C0,117.034778 2.96477253,120 6.62285402,120 L64.0955585,120 L64.0955585,73.5298658 L48.45744,73.5298658 L48.45744,55.419305 L64.0955585,55.419305 L64.0955585,42.0634409 C64.0955585,26.5638044 73.5622382,18.1240492 87.388851,18.1240492 C94.011705,18.1240492 99.7043021,18.6172788 101.362938,18.837591 L101.362938,35.0354823 L91.7735131,35.0399784 C84.2536737,35.0399784 82.7978149,38.6130823 82.7978149,43.8565123 L82.7978149,55.419305 L100.731676,55.419305 L98.3963671,73.5298658 L82.7978149,73.5298658 L82.7978149,120 L113.377146,120 C117.034778,120 120,117.034778 120,113.377146 L120,6.62285402 C120,2.96432291 117.034778,0 113.377146,0"
                    fill="#FFFFFF"/>
            </g>
        </svg>);


    return (
        <Butt svgIcon={facebookIcon}
              onClick={props.onClick}
              label={'Sign in with Facebook'}/>
    )
};

export default FacebookSignInButton;
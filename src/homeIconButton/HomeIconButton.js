import React from 'react';
import { Ripple } from 'rmwc/Ripple';
// helpers
import history from '../app/global/history';
// comps
import IconLogo from "../app/global/icon/icons/IconLogo";

const HomeIconButton = function () {
    return (
        <Ripple unbounded>
            <div onClick={() => history.push('/')} style={{ paddingTop: 7, cursor: 'pointer' }}>
                <IconLogo width={30} height={30}/>
            </div>
        </Ripple>
    )
};

export default HomeIconButton;
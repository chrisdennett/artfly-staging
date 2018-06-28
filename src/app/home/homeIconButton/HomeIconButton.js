import React from 'react';
import {connect} from 'react-redux';
// ui
import { Ripple } from 'rmwc/Ripple';
// actions
import {UpdateUrl} from "../../../actions/UrlActions";
// comps
import IconLogo from './IconLogo';

const HomeIconButton = ({UpdateUrl}) => {
    return (
        <Ripple unbounded>
            <div onClick={() => UpdateUrl('/')} style={{ paddingTop: 7, cursor: 'pointer' }}>
                <IconLogo width={30} height={30}/>
            </div>
        </Ripple>
    )
};

export default connect(null, {UpdateUrl})(HomeIconButton);
import React from 'react';
// ui
import {Icon} from '@rmwc/icon';
// styles
import './offlineMessage_styles.css';

const OfflineMessage = () => {

    return (
        <div className={'offlineMessage'}>
            <Icon icon={'report_problem'} className={'offlineMessage--icon'}/> Offline: Things may go wonky.
        </div>
    )
};

export default OfflineMessage;

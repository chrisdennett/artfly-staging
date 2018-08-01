import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './labelValueItem_styles.css';

const LabelValueItem = ({label, value}) => {
    return (
        <Typography use="body1"
                    className={'labelValueItem'}
                    tag="div"
                    theme="text-secondary-on-background">
            <div className={'labelValueItem--label'}>{label}</div>
            <div className={'labelValueItem--value'}>{value}</div>
        </Typography>
    )
};

export default LabelValueItem;
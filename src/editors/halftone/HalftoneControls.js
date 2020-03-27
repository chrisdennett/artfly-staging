import React from 'react';
import { Typography } from "@rmwc/typography";
import { Slider } from "@rmwc/slider";

const HalftoneControls = ({ editData, onChange }) => {

    const { gridRows } = editData;

    return (
        <div className={'editor--controls'}>

            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                            tag={'div'}
                            style={{ width: 200 }}
                            className={'editor--controls--set--label'}>
                    Grid width:
                </Typography>

                <Slider
                    min={5} max={100}
                    step={1}
                    discrete={true}
                    value={gridRows}
                    onInput={e => onChange({ ...editData, gridRows: e.detail.value })}
                />
            </div>
        </div>
    )
};

export default HalftoneControls;
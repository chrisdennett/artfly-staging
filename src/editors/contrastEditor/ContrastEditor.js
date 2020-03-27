import React from "react";
// ui
import { Slider } from '@rmwc/slider';
import { Typography } from "@rmwc/typography";

const ContrastEditor = ({ editData, onChange }) => {

    const { contrast, brightness } = editData;

    return (
        <div className={'editor--controls'}>

            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                    tag={'div'}
                    style={{ width: 130 }}
                    className={'editor--controls--set--label'}>
                    Brightness:
                </Typography>
                <div style={{ width: '100%', paddingRight: 20, paddingLeft: 20 }}>
                    <Slider
                        discrete
                        min={-100} max={100}
                        value={brightness}
                        onInput={e => onChange({ ...editData, brightness: e.detail.value })}
                    />
                </div>
            </div>

            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                    tag={'div'}
                    style={{ width: 130 }}
                    className={'editor--controls--set--label'}>
                    Constrast:
                </Typography>
                <div style={{ width: '100%', paddingRight: 20, paddingLeft: 20 }}>
                    <Slider
                        discrete
                        min={-100} max={100}
                        value={contrast}
                        onInput={e => onChange({ ...editData, contrast: e.detail.value })}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContrastEditor;
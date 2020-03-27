import React from "react";
// ui
import { Slider } from '@rmwc/slider';
import { Typography } from "@rmwc/typography";

const PixelStretcherControls = ({ editData, onChange }) => {

    const { hStretch = { pos: 0.5, size: 0.2 } } = editData;

    return (
        <div className={'editor--controls'}>

            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                            tag={'div'}
                            style={{ width: 200 }}
                            className={'editor--controls--set--label'}>
                    Horizontal:
                </Typography>

                <Slider
                    min={0} max={1}
                    step={0.001}
                    value={hStretch.pos}
                    onInput={e => onChange(
                        {
                            ...editData,
                            hStretch: { ...hStretch, pos: e.detail.value }
                        }
                    )}
                />
            </div>
            <div className={'editor--controls--set'}>
                <Typography use={'button'}
                            tag={'div'}
                            style={{ width: 200 }}
                            className={'editor--controls--set--label'}>
                    H Size:
                </Typography>

                <Slider
                    min={0} max={1}
                    step={0.001}
                    value={hStretch.size}
                    onInput={e => onChange(
                        {
                            ...editData,
                            hStretch: { ...hStretch, size: e.detail.value }
                        }
                    )}
                />
            </div>
        </div>
    );
};

export default PixelStretcherControls;

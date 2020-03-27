import React from "react";
// ui
import { Slider } from 'rmwc/Slider';
import { Typography } from 'rmwc/Typography';
import { Radio } from '@rmwc/radio';
// comps
import ColourPicker from "../../components/appControls/colourPicker/ColourPicker";

const FrameEditor = ({ editData, onChange }) => {

    const { frameThicknessDecimal, mountThicknessDecimal, mountColour, frameColour, frameType = 'standard' } = editData;

    return (
        <div className={'editor--controls'}>
            <div className={'editor--controls--inner'}>

                <div className={'editor--controls--set'} style={{ marginBottom: 10 }}>
                    <Typography use={'button'}
                        tag={'div'}
                        className={'editor--controls--set--label'}
                        style={{ width: 80 }}>
                        Type:
                    </Typography>
                    <div>
                        <div style={{ marginRight: 25, display: 'inline-block' }}>
                            <Radio
                                value="Standard"
                                checked={frameType === 'standard'}
                                onChange={e => onChange({ ...editData, frameType: 'standard' })}>
                                Standard
                            </Radio>
                        </div>

                        <Radio
                            value="Ornate"
                            checked={frameType === 'ornate'}
                            onChange={e => onChange({ ...editData, frameType: 'ornate' })}>
                            Ornate
                        </Radio>
                    </div>
                </div>

                <div className={'editor--controls--set'}>
                    <Typography use={'button'}
                        tag={'div'}
                        className={'editor--controls--set--label'}
                        style={{ width: 80 }}>
                        Frame:
                    </Typography>


                    <div style={{ width: 100 }}>
                        {frameType !== 'ornate' &&
                            <ColourPicker colour={frameColour}
                                onChange={({ hue, saturation, lightness }) => onChange({ ...editData, frameColour: { hue, saturation, lightness } })}
                            />
                        }
                    </div>
                    <Slider
                        min={0} max={0.2}
                        value={frameThicknessDecimal}
                        onInput={e => onChange({ ...editData, frameThicknessDecimal: e.detail.value })}
                    />
                </div>

                <div className={'editor--controls--set'}>

                    <Typography use={'button'} tag={'div'} className={'editor--controls--set--label'} style={{ width: 80 }}>
                        Mount:
                    </Typography>

                    <div style={{ width: 100 }}>
                        <ColourPicker colour={mountColour}
                            onChange={({ hue, saturation, lightness }) => onChange({ ...editData, mountColour: { hue, saturation, lightness } })}
                        />
                    </div>

                    <Slider
                        min={0} max={0.2}
                        value={mountThicknessDecimal}
                        onInput={e => onChange({ ...editData, mountThicknessDecimal: e.detail.value })}
                    />
                </div>
            </div>
        </div>
    );
};

export default FrameEditor;
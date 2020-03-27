import React from "react";
// styles
import './colourSplitter_styles.css'
// comps
import SliderControl from "../../components/appControls/sliderControl/SliderControl";

const ColourSplitter = ({ editData, onChange }) => {

    const { cyanXPercent, magentaXPercent, yellowXPercent } = editData;

    return (
        <div className={'editor--controls'}>
            <div className={'editor--controls--inner'}>

                <SliderControl label={'Cyan:'}
                               min={0}
                               max={100}
                               value={cyanXPercent}
                               onChange={value => onChange({ ...editData, cyanXPercent: value })}/>

                <SliderControl label={'Magenta:'}
                               min={0}
                               max={100}
                               value={magentaXPercent}
                               onChange={value => onChange({ ...editData, magentaXPercent: value })}/>

                <SliderControl label={'Yellow:'}
                               min={0}
                               max={100}
                               value={yellowXPercent}
                               onChange={value => onChange({ ...editData, yellowXPercent: value })}/>

            </div>
        </div>

    );
};

export default ColourSplitter;

/*
const checkIfChanged = (initialValues, currentValues) => {
    const { cyanXPercent: initialCyan, magentaXPercent: initialMagenta, yellowXPercent: initialYellow } = initialValues;
    const { cyanXPercent, magentaXPercent, yellowXPercent } = currentValues;

    return cyanXPercent !== initialCyan || magentaXPercent !== initialMagenta || yellowXPercent !== initialYellow;
};*/

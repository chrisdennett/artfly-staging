import React from "react";
import { Slider } from 'rmwc/Slider';
// styles
import './peopleOptions_styles.css';
import HorizontalList from "../../global/horizontalList/HorizontalList";

const peopleOptions = {
    baseUrl: '/images/audience/',
    people: {
        womanStanding1: {
            presetName: 'womanStanding1',
            thumb: 'woman-standing-1-darker-thumb.png',
            fileName: 'woman-standing-1-darker.png',
            height: 300, width: 120,
            maxProportionOfScreenHeight: 0.5
        },
        peopleSitting1: {
            thumb: 'people-sitting-1-thumb.png',
            fileName: 'people-sitting-1.png',
            height: 200, width: 310,
            maxProportionOfScreenHeight: 0.3
        },
        peopleWalking1: {
            thumb: 'people-walking-1-thumb.png',
            fileName: 'people-walking-1.png',
            height: 320, width: 224,
            maxProportionOfScreenHeight: 0.5
        }
    }
};

const PeopleOptions = ({ people, onDataChange }) => {

    const peopleIds = Object.keys(people);
    const peopleOptionsIds = Object.keys(peopleOptions.people);
    const baseUrl = peopleOptions.baseUrl;

    console.log("peopleIds: ", peopleIds);

    const onPersonPositionSliderChangeX = (x) => {
        console.log("x: ", x);
        /*const newFrameData = { ...frameData, mountThicknessDecimal };
        onDataChange({ frameData: newFrameData });*/
    };

    return (
        <div style={{ padding: 10 }} className={'pretty-scroll'}>
            <HorizontalList>
                {peopleOptionsIds.map(id => {
                    const option = peopleOptions.people[id];

                    return <div key={id}><img src={baseUrl+option.thumb} /></div>
                })

                }
            </HorizontalList>

            Position:
            <Slider
                min={0} max={1}
                value={0.5}
                onInput={e => onPersonPositionSliderChangeX(e.detail.value)}
            />
        </div>
    );
}

export default PeopleOptions;
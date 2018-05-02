import React from "react";
import { Slider } from 'rmwc/Slider';
// styles
import './peopleOptions_styles.css';
import HorizontalList from "../../global/horizontalList/HorizontalList";

const baseUrl = '/images/audience/';
const peopleOptionData = {
    womanStanding1: {
        thumb: `${baseUrl}woman-standing-1-darker-thumb.png`,
        url: `${baseUrl}woman-standing-1-darker.png`,
        height: 300, width: 120,
        maxProportionOfScreenHeight: 0.5
    },
    peopleSitting1: {
        thumb: `${baseUrl}people-sitting-1-thumb.png`,
        url: `${baseUrl}people-sitting-1.png`,
        height: 200, width: 310,
        maxProportionOfScreenHeight: 0.3
    },
    peopleWalking1: {
        thumb: `${baseUrl}people-walking-1-thumb.png`,
        url: `${baseUrl}people-walking-1.png`,
        height: 320, width: 224,
        maxProportionOfScreenHeight: 0.5
    }
};

const PeopleOptions = ({ people, onDataChange }) => {

    const peopleIds = Object.keys(people);
    const peopleOptionsIds = Object.keys(peopleOptionData);
        const firstPersonId = peopleIds[0];
        const person = people[firstPersonId];

    const onPersonPositionSliderChangeX = (x) => {

        const roundedX = Math.round(x * 1000) / 1000;

        const updatedPersonData = { ...person, x: roundedX };
        const updatedPeople = {...people, [firstPersonId]:updatedPersonData};

        onDataChange({ people: updatedPeople });
    };

    return (
        <div style={{ padding: 10 }} className={'pretty-scroll'}>
            <HorizontalList>
                {peopleOptionsIds.map(id => {
                    const option = peopleOptionData[id];
                    return <div key={id}><img src={option.thumb}/></div>
                })

                }
            </HorizontalList>

            Position:
            <Slider
                min={0} max={1}
                value={person.x}
                onInput={e => onPersonPositionSliderChangeX(e.detail.value)}
            />
        </div>
    );
}

export default PeopleOptions;
import React, { Component } from "react";
import { Slider } from 'rmwc/Slider';
// styles
import './peopleOptions_styles.css';
import HorizontalList from "../../global/horizontalList/HorizontalList";
import PersonTile from "./PersonTile";

const baseUrl = '/images/audience/';
const peopleOptionData = {
    womanStanding1: {
        id: 'womanStanding1',
        name: 'woman standing 1',
        thumb: `${baseUrl}woman-standing-1-darker-thumb.png`,
        url: `${baseUrl}woman-standing-1-darker.png`,
        imageHeight: 300, imageWidth: 120,
        x: 0.5, y: 1.02,
        realLifeHeight: 1.83
    },
    peopleSitting1: {
        id: 'peopleSitting1',
        name: 'people sitting 1',
        thumb: `${baseUrl}people-sitting-1-thumb.png`,
        url: `${baseUrl}people-sitting-1.png`,
        imageHeight: 200, imageWidth: 310,
        x: 0.5, y: 1.02,
        realLifeHeight: 1.2
    },
    peopleWalking1: {
        id: 'peopleWalking1',
        name: 'people walking 1',
        thumb: `${baseUrl}people-walking-1-thumb.png`,
        url: `${baseUrl}people-walking-1.png`,
        imageHeight: 320, imageWidth: 224,
        x: 0.5, y: 1.02,
        realLifeHeight: 1.75
    }
};

class PeopleOptions extends Component {

    constructor(props) {
        super(props);

        this.state = { selectedId: -1 };

        this.onPersonPositionSliderChangeX = this.onPersonPositionSliderChangeX.bind(this);
        this.onPersonIncludedChange = this.onPersonIncludedChange.bind(this);
        this.onPersonSelected = this.onPersonSelected.bind(this);
    }

    componentWillMount() {
        const { people } = this.props;
        const peopleIds = Object.keys(people);
        if (peopleIds.length > 0) {
            const firstId = peopleIds[0];
            this.setState({ selectedId: firstId })
        }
    }

    onPersonSelected(personId) {
        this.setState({ selectedId: personId })
    }

    onPersonPositionSliderChangeX(x, personId, person) {
        const { people, onDataChange } = this.props;
        const roundedX = Math.round(x * 1000) / 1000;

        const updatedPersonData = { ...person, x: roundedX };
        const updatedPeople = { ...people, [personId]: updatedPersonData };

        onDataChange({ people: updatedPeople });
    }

    onPersonIncludedChange(isIncluded, personId, person) {
        const { people, onDataChange } = this.props;
        const updatedPeople = { ...people };

        if (isIncluded) {
            updatedPeople[personId] = person;
        }
        else {
            updatedPeople[personId] = null;
        }

        onDataChange({ people: updatedPeople });
    }

    render() {
        const { people } = this.props;
        const { selectedId } = this.state;
        const selectedPerson = people[selectedId];
        const peopleOptionsIds = Object.keys(peopleOptionData);

        return (
            <div style={{ padding: 10 }} className={'pretty-scroll'}>
                <HorizontalList>
                    {peopleOptionsIds.map(id => {
                        const person = peopleOptionData[id];
                        const peopleIds = Object.keys(people);
                        const isIncluded = peopleIds.indexOf(id) > -1 && people[id] !== null;
                        const isSelected = selectedId === id;

                        return (
                            <PersonTile key={id}
                                        imgSrc={person.thumb}
                                        name={person.name}
                                        onPersonSelected={() => this.onPersonSelected(id)}
                                        onIncludeChange={isIncluded => this.onPersonIncludedChange(isIncluded, id, person)}
                                        isIncluded={isIncluded}
                                        isSelected={isSelected}/>
                        )
                    })
                    }

                </HorizontalList>


                <div>
                    Position:
                    <Slider
                        disabled={!selectedPerson}
                        min={0} max={1}
                        value={selectedPerson ? selectedPerson.x : 0}
                        onInput={e => this.onPersonPositionSliderChangeX(e.detail.value, selectedId, selectedPerson)}
                    />
                </div>

            </div>
        );
    }
};

export default PeopleOptions;
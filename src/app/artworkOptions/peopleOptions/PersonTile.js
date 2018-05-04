import React from 'react';
import { IconToggle } from 'rmwc/IconToggle';


const PersonTile = ({ imgSrc, name, isSelected, isIncluded=false, onIncludeChange, onPersonSelected }) => {
    const classes = isSelected ? 'person-tile person-tile--selected' : 'person-tile';

    return (
        <div className={classes} onClick={onPersonSelected}>
            <div className={'person-tile--imgHolder'}>
                <img src={imgSrc} alt={name}/>
            </div>

            <div className={'person-tile--toggleHolder'}>
                <IconToggle
                    onChange={() => onIncludeChange(!isIncluded)}
                    checked={isIncluded}
                    on={{ label: 'Remove from picture', content: 'check_box' }}
                    off={{ label: 'Add to picture', content: 'check_box_outline_blank' }}
                />
            </div>
        </div>
    )
};

export default PersonTile;
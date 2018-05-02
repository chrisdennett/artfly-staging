import React from "react";
import { TabBar, Tab } from 'rmwc/Tabs';
// styles
import './artworkOptionsToolBar_styles.css';
import HorizontalList from "../../global/horizontalList/HorizontalList";

const ArtworkOptionsToolBar = ({onOptionSelect,options, selectedOptionIndex}) => {

    const optionKeys = options ? Object.keys(options) : [];
    const onTabSelect = (e) => {
        const activeTabIndex = e.target.value;
        onOptionSelect(activeTabIndex);
    };

    return (
        <div className={`artworkOptionsToolBar`}>

            <HorizontalList>

                <TabBar activeTabIndex={selectedOptionIndex}
                        onChange={onTabSelect}>

                    {optionKeys.map(key => {
                        const option = options[key];

                        return (
                            <Tab key={key}>
                                <img src={option.icon} alt={option.name}/>
                            </Tab>
                        )
                    })
                    }

                </TabBar>
            </HorizontalList>
        </div>
    );
};

export default ArtworkOptionsToolBar;
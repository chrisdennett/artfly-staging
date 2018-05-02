import React, { Component } from "react";
import { TabBar, Tab } from 'rmwc/Tabs';
// styles
import './artworkOptionsToolBar_styles.css';
import HorizontalList from "../../global/horizontalList/HorizontalList";
// images
import IconFrameSize from './../../images/icons/frame-size.png';
import IconFrameColour from './../../images/icons/frame-colour.png';
import IconPeople from './../../images/icons/people.png';
import IconCropRotate from './../../images/icons/crop-rotate.png';

class ArtworkOptionsToolBar extends Component {

    constructor(props) {
        super(props);

        this.state = { editingControlsAreOpen: true, activeTabIndex: 0 };

        this.onEditOpenClick = this.onEditOpenClick.bind(this);

        this.onTabSelect = this.onTabSelect.bind(this);
    }

    onEditOpenClick() {
        this.setState((state) => {
            return { editingControlsAreOpen: !state.editingControlsAreOpen }
        })
    }

    onTabSelect(e) {
        const activeTabIndex = e.target.value;
        this.setState({ activeTabIndex });

        let toolName = '';
        switch (activeTabIndex) {
            case 0:
                toolName = 'frame';
                break;
            case 1:
                toolName = 'frameColour';
                break;
            case 2:
                toolName = 'room';
                break;
            case 3:
                toolName = 'crop';
                break;
            default: break;
        }

        this.props.onToolSelect(toolName);
    }

    render() {

        return (
            <div className={`artworkOptionsToolBar`}>

                <HorizontalList>

                    <TabBar activeTabIndex={this.state.activeTabIndex}
                            onChange={this.onTabSelect}>


                        <Tab>
                            <img src={IconFrameSize} alt={'Frame size'}/>
                        </Tab>

                        <Tab>
                            <img src={IconFrameColour} alt={'Frame colour'}/>
                        </Tab>

                        <Tab>
                            <img src={IconPeople} alt={'People'}/>
                        </Tab>

                        <Tab>
                            <img src={IconCropRotate} alt={'People'}/>
                        </Tab>

                    </TabBar>
                </HorizontalList>
            </div>
        );
    }
}

export default ArtworkOptionsToolBar;
import React, { Component } from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as faObjectGroup from "@fortawesome/fontawesome-pro-solid/faObjectGroup";
import { TabBar, Tab, TabIcon, TabIconText } from 'rmwc/Tabs';
import * as faPalletAlt from "@fortawesome/fontawesome-pro-solid/faPalletAlt";

// styles
import './artworkOptionsToolBar_styles.css';
import HorizontalList from "../../global/horizontalList/HorizontalList";
// images
import IconFrameSize from './../../images/icons/frame-size.png';
import IconFrameColour from './../../images/icons/frame-colour.png';

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
                            <FontAwesomeIcon fixedWidth style={{width:40,height:40}} icon={faPalletAlt}/>
                        </Tab>

                        <Tab>
                            <TabIcon>
                                <FontAwesomeIcon icon={faObjectGroup}/>
                            </TabIcon>
                            <TabIconText className={'artworkOptionsToolBar--tabLabel'}>
                                Crop
                            </TabIconText>
                        </Tab>

                        {/*<Tab>
                            <TabIcon>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </TabIcon>
                            <TabIconText className={'artworkOptionsToolBar--tabLabel'}>
                                Delete
                            </TabIconText>
                        </Tab>*/}


                    </TabBar>
                </HorizontalList>

                {/*{!saveButtonIsDisabled &&
                    <ControlPanelButt
                        icon={faSave}
                        onClick={onSave}
                        label={'SAVE'}/>
                    }*/}

                {/*<ControlPanelButt
                        isSelected={currentTool === 'upload'}
                        icon={faUpload}
                        onClick={() => onToolSelect('upload')}
                        label={'ADD PIC'}/>*/}

                {/*<ControlPanelButt
                    isSelected={currentTool === 'crop'}
                    disabled={disableEditing}
                    icon={faTrashAlt}
                    style={{ color: '#d02828' }}
                    onClick={() => onToolSelect('delete')}
                    label={'DELETE'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'crop'}
                    disabled={disableEditing}
                    icon={faObjectGroup}
                    onClick={() => onToolSelect('crop')}
                    label={'CROP & ROTATE'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'titles'}
                    disabled={disableEditing}
                    icon={faListAlt}
                    onClick={() => onToolSelect('titles')}
                    label={'TITLES'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'frame'}
                    disabled={disableEditing}
                    icon={faImage}
                    onClick={() => onToolSelect('frame')}
                    label={'FRAME'}/>

                <ControlPanelButt
                    isSelected={currentTool === 'room'}
                    disabled={disableEditing}
                    icon={faPalletAlt}
                    onClick={() => onToolSelect('room')}
                    label={'ROOM'}/>*/}

            </div>
        );
    }
}

export default ArtworkOptionsToolBar;
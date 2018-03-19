import React, { Component } from "react";
import faUsers from "@fortawesome/fontawesome-pro-solid/faUsers";
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
// import './quickRoom_styles.css';
// comps
// import QuickArtwork from "../quickArtwork/QuickArtwork";
// import RoomPresets from "./presets/RoomPresets";
// import Butt from "../../global/Butt/Butt";
import ToolControlPanel from "../../global/toolControlPanel/ToolControlPanel";
import ToolControlPanelContent from "../../global/toolControlPanel/ToolControlPanelContent";
import ToolControlPanelSection from "../../global/toolControlPanel/ToolControlPanelSection";
import CheckBox from "../../global/CheckBox/CheckBox";

class QuickPeopleEditor extends Component {

    constructor(props) {
        super(props);

        this.onIncludePeopleChange = this.onIncludePeopleChange.bind(this);
    }

    componentWillMount() {
        const { roomData } = this.props;

        if (roomData) {
            this.setState({ initialData:roomData }); // use if add an undo
        }
    }

    onIncludePeopleChange(includePeople) {
        const newRoomData = {...this.props.roomData, includePeople};

        this.props.onPeopleDataChange({roomData:newRoomData});
    }

    render() {
        const { width, roomData } = this.props;
        const { includePeople } = roomData;

        const toolOptions = [
            {
                label: 'People options',
                content: <ToolControlPanelContent>
                    <ToolControlPanelSection>
                        <div className={'skirtingControlHolder'}>
                            <CheckBox label={'Include people'}
                                      id={'include-people'}
                                      value={includePeople}
                                      onChange={(e) => this.onIncludePeopleChange(e.target.checked)}
                            />
                        </div>
                    </ToolControlPanelSection>
                </ToolControlPanelContent>
            }
        ];

        return (
            <div className={'quickPeopleEditor'}>
                <ToolControlPanel width={width}
                                  title={'PEOPLE'}
                                  titleIcon={faUsers}
                                  toolOptions={toolOptions}/>
            </div>
        );
    }
}

export default QuickPeopleEditor;
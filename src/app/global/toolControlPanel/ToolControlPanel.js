import React, { Component } from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// styles
import './toolControlPanel_styles.css';
// comps
import ToolOptionButton from "./ToolOptionButton";

class ToolControlPanel extends Component {

    constructor(props) {
        super(props);

        // this.state = { currentTool: 'FRAME' };

        this.onSelectToolOption = this.onSelectToolOption.bind(this);
    }

    onSelectToolOption(label) {
        this.setState({ currentTool: label })
    }

    render() {
        const { toolOptions, globalButts, title, titleIcon, minWidth=220 } = this.props;

        // prevent errors to help dev
        if(!toolOptions || toolOptions.length < 1) return null;

        // find or set current tool
        const currentTool = this.state && this.state.currentTool ? this.state.currentTool : toolOptions[0].label;

        // create option buttons if needed
        const useOptionButts = toolOptions.length > 1;
        let optionButts = [];
        for (let option of toolOptions) {
            const isSelected = option.label === currentTool;
            optionButts.push(
                <ToolOptionButton onClick={() => this.onSelectToolOption(option.label)}
                                  key={option.label}
                                  isSelected={isSelected}
                                  label={option.label}/>
            )
        }

        // find the currently selected content
        const currentOption = toolOptions.find(option => {
            return option.label === currentTool;
        });
        const content = currentOption.content;
        const maxWidth = Math.max(200, minWidth);

        return (
            <div className={'toolControlPanel'}>

                {title &&
                <h1>
                    {titleIcon &&
                    <FontAwesomeIcon icon={titleIcon}/>
                    }
                    <span> {title}</span>
                </h1>
                }

                {useOptionButts &&
                <div className={'toolControlPanel--options'}>
                    {optionButts}
                </div>
                }

                <div className={'toolControlPanel--contentScroller'}>
                    <div className={'toolControlPanel--contentScroller--content'}>
                        {content}
                    </div>
                </div>

                {globalButts &&
                <div className={'toolControlPanel--globalButts'}>
                    {globalButts}
                </div>
                }

            </div>
        );
    }
}

export default ToolControlPanel;
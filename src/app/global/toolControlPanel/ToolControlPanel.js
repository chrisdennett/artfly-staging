import React from "react";
//
import './toolControlPanel_styles.css';

const ToolControlPanel = ({ children, optionButts, globalButts }) => {

    /*let contentStyle = {};
    if(optionButts) contentStyle.marginTop = 90;*/

    return (
        <div className={'toolControlPanel'}>

            {optionButts &&
            <div className={'toolControlPanel--options'}>
                {optionButts}
            </div>
            }

            <div className={'toolControlPanel--content'}>
                <div className={'toolControlPanel--currentOptionContent'}>
                    {children}
                </div>
            </div>

            {globalButts &&
            <div className={'toolControlPanel--globalButts'}>
                {globalButts}
            </div>
            }

        </div>
    );
};

export default ToolControlPanel;
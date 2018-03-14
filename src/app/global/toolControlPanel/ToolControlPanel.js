import React from "react";

const ToolControlPanel = ({ children, optionButts, globalButts }) => {

    return (
        <div className={'toolControlPanel'}>
            <div className={'toolControlPanel--content'}>

                {optionButts &&
                <div className={'toolControlPanel--options'}>
                    {optionButts}
                </div>
                }

                <div className={'toolControlPanel--currentOptionContent'}>

                    {children}

                </div>

                {globalButts &&
                <div className={'toolControlPanel--globalButts'}>
                    {globalButts}
                </div>
                }

            </div>
        </div>
    );
};

export default ToolControlPanel;
import React from 'react';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarFixedAdjust
} from 'rmwc/Toolbar';
import SignInOutButton from "../SignInOut/SignInOutButton";

const AppTopBar = function (props) {
    return (
        <div>
            <Toolbar fixed>
                <ToolbarRow>
                    <ToolbarSection alignEnd>
                        <SignInOutButton/>
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
            <ToolbarFixedAdjust/>
        </div>
    )
};

export default AppTopBar;
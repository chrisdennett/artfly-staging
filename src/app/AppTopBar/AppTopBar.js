import React from 'react';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarFixedAdjust,
} from 'rmwc/Toolbar';
//
import UserMenu from "../userMenu/UserMenu";

const AppTopBar = function () {
    return (
        <div>
            <Toolbar fixed>
                <ToolbarRow>
                    <ToolbarSection alignEnd>
                        <UserMenu />
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
            <ToolbarFixedAdjust/>
        </div>
    )
};

export default AppTopBar;
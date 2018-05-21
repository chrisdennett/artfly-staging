import React from 'react';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarFixedAdjust,
    ToolbarTitle,
} from 'rmwc/Toolbar';
//
import UserMenu from "../userMenu/UserMenu";

const AppTopBar = function ({title}) {
    return (
        <div>
            <Toolbar fixed>
                <ToolbarRow>
                    {title &&
                    <ToolbarSection alignStart>
                        <ToolbarTitle>{title}</ToolbarTitle>
                    </ToolbarSection>
                    }
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
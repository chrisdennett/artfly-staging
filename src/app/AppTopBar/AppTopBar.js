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
import HomeIconButton from "../../homeIconButton/HomeIconButton";

const AppTopBar = function ({title}) {
    return (
        <div>
            <Toolbar fixed>
                <ToolbarRow>
                    {title &&
                    <ToolbarSection alignStart>
                        <HomeIconButton/>
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
import React from 'react';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarFixedAdjust,
    ToolbarTitle,
    ToolbarIcon,
} from 'rmwc/Toolbar';
//
import history from "../global/history";
//
import UserMenu from "../userMenu/UserMenu";
import HomeIconButton from "../../homeIconButton/HomeIconButton";

const AppTopBar = function ({title, showUserMenu=true, showCloseButt=false}) {

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
                        {showUserMenu &&
                        <UserMenu />
                        }

                        {showCloseButt &&
                        <ToolbarIcon use="close" onClick={() => history.push('/')}/>
                        }
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
            <ToolbarFixedAdjust/>
        </div>
    )
};

export default AppTopBar;
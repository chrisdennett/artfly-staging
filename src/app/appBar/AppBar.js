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

const AppBar = function ({title, showUserMenu=true, showCloseButt=false, fixed=true}) {

    return (
        <div>
            <Toolbar fixed={fixed}>
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
            {fixed &&
            <ToolbarFixedAdjust/>
            }
        </div>
    )
};

export default AppBar;
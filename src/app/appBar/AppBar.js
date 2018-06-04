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

    const style = { borderBottom: '1px solid rgba(0,0,0,0.2)'};

    return (
        <div>
            <Toolbar fixed={fixed} theme={'background'}>
                <ToolbarRow style={style} theme={'background text-primary-on-background'}>
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
                        <ToolbarIcon use="close"
                                     theme={'text-primary-on-background'}
                                     onClick={() => history.push('/')}/>
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
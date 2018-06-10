import React from 'react';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarFixedAdjust,
    ToolbarTitle,
    ToolbarIcon,
    ToolbarMenuIcon
} from 'rmwc/Toolbar';
// styles
import './appBar_styles.css';
// helpers
import history from "../global/history";
// comps
import UserMenu from "../userMenu/UserMenu";
import HomeIconButton from "../../homeIconButton/HomeIconButton";

export const ArtworkAppBar = ({onCloseClick, onMenuClick}) => (
        <Toolbar theme={'background'}>
            <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
                <ToolbarSection alignStart>
                    <ToolbarMenuIcon use="menu"
                                     onClick={onMenuClick}/>
                    <ToolbarTitle>Artwork</ToolbarTitle>
                </ToolbarSection>

                <ToolbarSection alignEnd>
                    <UserMenu/>
                    <ToolbarIcon use="close"
                                 theme={'text-primary-on-background'}
                                 onClick={onCloseClick}/>
                </ToolbarSection>
            </ToolbarRow>
        </Toolbar>
    );

const AppBar = function ({ title, navigation, showUserMenu = true, showCloseButt = false, fixed = true, butts = null }) {
    return (
        <div>
            <Toolbar fixed={fixed} theme={'background'}>
                <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
                    {title &&
                    <ToolbarSection alignStart>

                        <HomeIconButton/>

                        <ToolbarTitle>{title}</ToolbarTitle>
                    </ToolbarSection>
                    }
                    <ToolbarSection alignEnd>

                        {butts &&
                        butts
                        }

                        {showUserMenu &&
                        <UserMenu/>
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
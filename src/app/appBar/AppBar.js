import React from 'react';
import { Button } from 'rmwc/Button';
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
// comps
import UserMenu from "../userMenu/UserMenu";
import HomeIconButton from "../../homeIconButton/HomeIconButton";


export const ArtworkEditAppBar = ({ title, onSaveClick, onCancelClick, hasChanges,onCloseClick }) => (
    <Toolbar theme={'background'}>
        <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
            <ToolbarTitle>{title}</ToolbarTitle>

            {hasChanges &&
            <ToolbarSection alignEnd>
                <div style={{ height: 48, display: 'flex', alignItems: 'center', marginRight: 5 }}>
                    <Button onClick={onSaveClick} dense unelevated>
                        Save
                    </Button>
                </div>
                <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
                    <Button onClick={onCancelClick} dense>
                        Cancel
                    </Button>
                </div>
            </ToolbarSection>
            }

            {!hasChanges &&
            <ToolbarSection alignEnd>
                <ToolbarIcon use={'close'}
                             theme={'text-primary-on-background'}
                             onClick={onCloseClick}/>
            </ToolbarSection>
            }

        </ToolbarRow>
    </Toolbar>
);


export const ArtworkAppBar = ({ onCloseClick, onMenuClick }) => (
    <Toolbar theme={'background'}>
        <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
            <ToolbarSection alignStart>
                <ToolbarMenuIcon use="dashboard"
                                 onClick={onMenuClick}/>
                <ToolbarTitle>Artwork</ToolbarTitle>
            </ToolbarSection>

            <ToolbarSection alignEnd>
                <UserMenu/>
            </ToolbarSection>
        </ToolbarRow>
    </Toolbar>
);

const AppBar = function ({ title, navigation, onCloseClick, showHomeIcon = true, showUserMenu = true, showCloseButt = false, fixed = true, butts = null }) {
    return (
        <div>
            <Toolbar fixed={fixed} theme={'background'}>
                <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
                    {title &&
                    <ToolbarSection alignStart>

                        {showHomeIcon &&
                        <HomeIconButton/>
                        }

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
                                     onClick={onCloseClick}/>
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
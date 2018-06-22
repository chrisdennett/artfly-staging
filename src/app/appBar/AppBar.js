import React from 'react';
import { Button } from 'rmwc/Button';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarTitle,
    ToolbarIcon,
    ToolbarMenuIcon
} from 'rmwc/Toolbar';
// styles
import './appBar_styles.css';
// comps
import UserMenu from "../userMenu/UserMenu";
import HomeIconButton from "../../homeIconButton/HomeIconButton";

// Includes save and cancel options
export const EditAppBar = ({ title, onSaveClick, onCancelClick, hasChanges, onCloseClick }) => (
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

// Includes artwork delete option
export const ArtworkAppBar = ({ onCloseClick, onMenuClick, isEditable, onDeleteClick }) => (
    <Toolbar theme={'background'}>
        <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
            <ToolbarSection alignStart>
                <ToolbarMenuIcon use="dashboard"
                                 onClick={onMenuClick}/>
                <ToolbarTitle>Artwork</ToolbarTitle>
            </ToolbarSection>

            <ToolbarSection alignEnd>
                {isEditable &&
                <ToolbarMenuIcon use="delete"
                                 onClick={onDeleteClick}/>
                }
                <UserMenu/>
            </ToolbarSection>
        </ToolbarRow>
    </Toolbar>
);

// Just a title and a close option
export const TempScreenAppBar = ({ title, onCloseClick, isFixed = false }) => (
    <Toolbar theme={'background'} fixed={isFixed}>
        <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
            <ToolbarTitle>{title}</ToolbarTitle>

            <ToolbarSection alignEnd>
                <ToolbarIcon use={'close'}
                             theme={'text-primary-on-background'}
                             onClick={onCloseClick}/>
            </ToolbarSection>

        </ToolbarRow>
    </Toolbar>
);

export const GalleryHomeAppBar = function ({ title, isEditable, onEditClick, onAddClick, onCloseClick, showUserMenu = true, fixed = true }) {
    return (
        <Toolbar fixed={fixed} theme={'background'}>
            <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>

                <ToolbarSection alignStart>
                    <HomeIconButton/>
                    <ToolbarTitle>{title}</ToolbarTitle>
                </ToolbarSection>

                <ToolbarSection alignEnd>
                    {isEditable &&
                    <ToolbarIcon use="add"
                                 theme={'text-primary-on-background'}
                                 onClick={onAddClick}/>
                    }
                    {isEditable &&
                    <ToolbarIcon use="edit"
                                 theme={'text-primary-on-background'}
                                 onClick={onEditClick}/>
                    }
                    <UserMenu/>
                </ToolbarSection>

            </ToolbarRow>
        </Toolbar>
    )
};


const AppBar = function ({ title, navigation, onCloseClick, showHomeIcon = true, showUserMenu = true, showCloseButt = false, fixed = true, butts = null }) {
    return (
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
    )
};

export default AppBar;
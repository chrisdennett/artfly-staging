import React from 'react';
import { Button } from 'rmwc/Button';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, ToolbarMenuIcon } from 'rmwc/Toolbar';
// styles
import './appBar_styles.css';
// comps
import UserMenu from "../userMenu/UserMenu";
import HomeIconButton from "../home/homeIconButton/HomeIconButton";

// Includes save and cancel options
export const EditAppBar = ({ title, onSaveClick, onCancelClick, fixed = false, hasChanges, onCloseClick }) => (
    <Toolbar theme={'background'} fixed={fixed}>
        <ToolbarRow className={'appBar'}
                    theme={'background text-primary-on-background'}>
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
export const ArtworkAppBar = ({ onCloseClick, onMenuClick, isEditable, onAddClick, onDeleteClick }) => (
    <Toolbar theme={'background'}>
        <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
            <ToolbarSection alignStart>
                <ToolbarMenuIcon use="dashboard"
                                 onClick={onMenuClick}/>
                <ToolbarTitle>Artwork</ToolbarTitle>
            </ToolbarSection>

            <ToolbarSection alignEnd>
                {isEditable &&
                <ToolbarIcon use="add"
                             theme={'text-primary-on-background'}
                             onClick={onAddClick}/>
                }
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

            <ToolbarSection alignStart>
                {/*<HomeIconButton/>*/}
                <ToolbarTitle>{title}</ToolbarTitle>
            </ToolbarSection>

            <ToolbarSection alignEnd>
                {/*<UserMenu/>*/}
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

export const HomeAppBar = function ({ title, navigation, onCloseClick, showHomeIcon = true, showUserMenu = true, showCloseButt = false, fixed = true, butts = null }) {
    return (
        <Toolbar fixed={fixed} theme={'background'}>
            <ToolbarRow className={'appBar'} theme={'background text-primary-on-background'}>
                <ToolbarSection alignStart>
                    <HomeIconButton/>
                    <ToolbarTitle style={{marginLeft: 15, color:'#6a6a6a'}}>
                        <span style={{padding: '0 0px', borderTop:'2px solid #ff0000', borderBottom:'2px solid #ff0000'}}>A</span>
                        <span style={{padding: '0 0px', borderTop:'2px solid #ff6600', borderBottom:'2px solid #ff6600'}}>R</span>
                        <span style={{padding: '0 0px', borderTop:'2px solid #ffcc00', borderBottom:'2px solid #ffcc00'}}>T</span>
                        <span style={{padding: '0 0px', borderTop:'2px solid #abc837', borderBottom:'2px solid #abc837'}}>F</span>
                        <span style={{padding: '0 0px', borderTop:'2px solid #37abc8', borderBottom:'2px solid #37abc8'}}>L</span>
                        <span style={{padding: '0 0px', borderTop:'2px solid #aa00d4', borderBottom:'2px solid #aa00d4'}}>Y</span>
                    </ToolbarTitle>
                </ToolbarSection>

                <ToolbarSection alignEnd>
                    <UserMenu/>
                </ToolbarSection>
            </ToolbarRow>
        </Toolbar>
    )
};

export default AppBar;
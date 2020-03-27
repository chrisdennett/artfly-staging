import React from "react";
// ui
import { Button } from '@rmwc/button';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarIcon, ToolbarTitle } from '@rmwc/toolbar';
// comps

const GalleryEditorAppBar = ({ onSaveClick, onCancelClick, hasChanges, onCloseClick }) => {
    return (
        <Toolbar style={{ backgroundColor: '#333' }} fixed>
            <ToolbarRow className={'appBar'}>
                <ToolbarSection alignStart>
                    <ToolbarTitle>Edit Gallery</ToolbarTitle>
                </ToolbarSection>

                {hasChanges &&
                <ToolbarSection alignEnd>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: 5 }}>
                        <Button onClick={onSaveClick} unelevated theme={'secondary-bg'}>
                            Save
                        </Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={onCancelClick} theme={'on-primary'}>
                            Cancel
                        </Button>
                    </div>
                </ToolbarSection>
                }

                <ToolbarSection alignEnd shrinkToFit>
                    <ToolbarIcon icon={'close'}
                                 onClick={onCloseClick}/>
                </ToolbarSection>
            </ToolbarRow>
        </Toolbar>
    )
};

export default GalleryEditorAppBar;

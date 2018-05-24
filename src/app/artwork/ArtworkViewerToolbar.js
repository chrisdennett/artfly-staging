import React, { Component } from 'react';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarIcon } from 'rmwc/Toolbar';
import { SimpleDialog } from 'rmwc/Dialog';
import { Button } from 'rmwc/Button';
//
import HomeIconButton from "../../homeIconButton/HomeIconButton";
import UserMenu from "../userMenu/UserMenu";

class ArtworkViewerToolbar extends Component {

    constructor(props) {
        super(props);

        this.state = { errorConfirmDialogIsOpen: false };
    }

    render() {
        const {
                  isEditOpen,
                  hasUnsavedChanges,
                  onArtworkEditorSave,
                  onArtworkUndoChanges,
                  onEditOpenChange,
                  onArtworkDeleteConfirm
              } = this.props;

        return (
            <div>

                <SimpleDialog
                    title="Delete Artwork"
                    body="Are you sure you want to delete this Artwork?"
                    open={this.state.errorConfirmDialogIsOpen}
                    acceptLabel={'DELETE IT'}
                    cancelLabel={'KEEP IT'}
                    onClose={() => this.setState({ errorConfirmDialogIsOpen: false })}
                    onAccept={onArtworkDeleteConfirm}
                />

                <Toolbar>
                    <ToolbarRow>
                        <ToolbarSection alignStart>
                            <HomeIconButton/>

                            {!isEditOpen &&
                            <ToolbarIcon onClick={() => onEditOpenChange(true)}
                                         use="edit"/>
                            }

                            {isEditOpen &&
                            <ToolbarIcon onClick={() => onEditOpenChange(false)}
                                         use="cloud_done"/>
                            }

                            {isEditOpen &&
                            <ToolbarIcon onClick={() => this.setState({ errorConfirmDialogIsOpen: true })}
                                         use="delete_forever"/>
                            }
                        </ToolbarSection>

                        {hasUnsavedChanges &&
                        <ToolbarSection>
                            <Button raised theme="secondary-bg text-primary-on-secondary"
                                    onClick={onArtworkEditorSave}>Save</Button>
                        </ToolbarSection>
                        }

                        {hasUnsavedChanges &&
                        <ToolbarSection>
                            <Button raised theme="secondary-bg text-primary-on-secondary"
                                    onClick={onArtworkUndoChanges}>Undo</Button>
                        </ToolbarSection>
                        }

                        <ToolbarSection alignEnd>
                            <UserMenu/>
                        </ToolbarSection>

                    </ToolbarRow>
                </Toolbar>
            </div>
        )
    }
}

export default ArtworkViewerToolbar;

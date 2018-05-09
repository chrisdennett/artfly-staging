import React, { Component } from 'react';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarIcon } from 'rmwc/Toolbar';
import { SimpleDialog } from 'rmwc/Dialog';
import { Button } from 'rmwc/Button';
//
import Link from "../global/Butt/Link";
import IconLogo from "../global/icon/icons/IconLogo";

class ArtworkViewerToolbar extends Component {

    constructor(props) {
        super(props);

        this.state = {errorConfirmDialogIsOpen: false,};
    }

    render() {
        const {
                  isEditOpen,
                  hasUnsavedChanges,
                  onArtworkEditorSave,
                  onArtworkUndoChanges,
                  onEditOpenChange,
                  onArtworkDeleteConfirm,
              } = this.props;

        const deleteStyle = { color: '#a82021' };

        return (
            <Toolbar style={{ background: '#fff', color: '#000' }}>

                <SimpleDialog
                    title="Delete Artwork"
                    body="Are you sure you want to delete this Artwork?"
                    open={this.state.errorConfirmDialogIsOpen}
                    acceptLabel={'DELETE IT'}
                    cancelLabel={'KEEP IT'}
                    onClose={() => this.setState({ errorConfirmDialogIsOpen: false })}
                    onAccept={onArtworkDeleteConfirm}
                />

                <ToolbarRow>
                    <ToolbarSection alignStart>
                        <Link linkTo={'/'} style={{ paddingTop: 7 }}>
                            <IconLogo width={30} height={30}/>
                        </Link>

                        {!isEditOpen &&
                        <ToolbarIcon onClick={() => onEditOpenChange(true)}
                                     use="edit"
                                     style={{ color: 'black' }}/>
                        }

                        {isEditOpen &&
                        <ToolbarIcon onClick={() => onEditOpenChange(false)}
                                     use="cloud_done"
                                     style={{ color: 'black' }}/>
                        }
                    </ToolbarSection>
                    {hasUnsavedChanges &&
                    <ToolbarSection>
                        <Button raised theme="secondary-bg text-primary-on-secondary"
                                onClick={onArtworkEditorSave}>Save</Button>
                        <Button onClick={onArtworkUndoChanges}>Undo</Button>
                    </ToolbarSection>
                    }

                    {isEditOpen &&
                    <ToolbarSection alignEnd>
                        <ToolbarIcon onClick={() => this.setState({ errorConfirmDialogIsOpen: true })}
                                     use="delete_forever"
                                     style={deleteStyle}/>
                    </ToolbarSection>
                    }
                </ToolbarRow>
            </Toolbar>
        )
    }
}

export default ArtworkViewerToolbar;
import React, { Component } from "react";
// styles
import './artworkEditorAppBar_styles.css';
// ui
import { IconButton } from '@rmwc/icon-button';

class ArtworkEditorAppBar extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { onSaveClick, onCancelClick, isOpen, hasChanges, onCloseClick, onNavToggle } = this.props;
        const menuIcon = isOpen ? "menu_open" : "playlist_add";

        return (
            <div className={'artworkEditorAppBar'}>

                <IconButton icon={menuIcon}
                            onClick={onNavToggle}/>

                <div className={'artworkEditorAppBar--endButts'}>
                    {hasChanges &&
                    <React.Fragment>
                        <IconButton icon={'save'}
                                    theme={'secondary-bg onSecondary'}
                                    onClick={onSaveClick}
                                    className={'artworkEditorAppBar--endButts--save'}/>

                        <IconButton icon={'undo'}
                                    onClick={onCancelClick}
                                    className={'artworkEditorAppBar--endButts--undo'}/>

                    </React.Fragment>
                    }
                    <IconButton icon={'close'}
                                onClick={onCloseClick}/>
                </div>

            </div>
        );
    }
}

export default ArtworkEditorAppBar;

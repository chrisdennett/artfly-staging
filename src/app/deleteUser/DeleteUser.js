import React, { Component } from 'react';
import { Button, ButtonIcon } from 'rmwc/Button';
import {
    Dialog,
    DialogSurface,
    DialogHeader,
    DialogHeaderTitle,
    DialogBody,
    DialogFooter,
    DialogFooterButton,
    DialogBackdrop
} from 'rmwc/Dialog';

class DeleteUser extends Component {

    constructor(props) {
        super(props);

        this.state = { deleteConfirmIsOpen: false };

        this.onConfirmDelete = this.onConfirmDelete.bind(this);

    }

    onConfirmDelete() {
        const { deleteUser, deleteArtworks, userArtworks, deleteResources, userResources } = this.props;
        deleteArtworks(userArtworks);
        deleteResources(userResources);
        deleteUser();
    }

    render() {
        const { deleteConfirmIsOpen } = this.state;
        const { userArtworks, deleteUserAuth, userSignInMethod } = this.props;
        const totalUserArtworks = Object.keys(userArtworks).length;

        return (
            <div>
                <Button outlined onClick={() => this.setState({ deleteConfirmIsOpen: true })}>
                    <ButtonIcon use="delete_forever"/>
                    Delete All Data
                </Button>

                <Button outlined onClick={() => deleteUserAuth(userSignInMethod)}>
                    <ButtonIcon use="delete_forever"/>
                    Disconnect from Sign using {userSignInMethod}
                </Button>

                <Dialog
                    open={deleteConfirmIsOpen}
                    onClose={() => this.setState({ deleteConfirmIsOpen: false })}
                >
                    <DialogSurface>
                        <DialogHeader>
                            <DialogHeaderTitle>Are you sure you want to Delete everything?</DialogHeaderTitle>
                        </DialogHeader>
                        <DialogBody>This can't be undone. You'll delete your account and a total
                            of {totalUserArtworks} artworks.</DialogBody>
                        <DialogFooter>
                            <DialogFooterButton cancel>Cancel</DialogFooterButton>

                            <DialogFooterButton accept
                                                onClick={this.onConfirmDelete}
                            >
                                DELETE IT ALL!
                            </DialogFooterButton>
                        </DialogFooter>
                    </DialogSurface>
                    <DialogBackdrop/>
                </Dialog>
            </div>
        )
    }
}

export default DeleteUser;
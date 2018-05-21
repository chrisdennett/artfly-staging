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

        this.state = {deleteConfirmIsOpen:false};
    }

    render() {
        const {deleteConfirmIsOpen} = this.state;
        const {deleteUser, userId, totalUserArtworks} = this.props;

        return (
            <div>
                {/*<Button outlined onClick={() => deleteUser(userId)}>*/}
                <Button outlined onClick={() => this.setState({deleteConfirmIsOpen: true})}>
                    <ButtonIcon use="delete_forever"/>
                    Delete Account
                </Button>


                <Dialog
                    open={deleteConfirmIsOpen}
                    onClose={() => this.setState({deleteConfirmIsOpen: false})}
                >
                    <DialogSurface>
                        <DialogHeader>
                            <DialogHeaderTitle>Are you sure you want to Delete everything?</DialogHeaderTitle>
                        </DialogHeader>
                        <DialogBody>This can't be undone. You'll delete your account and a total of {totalUserArtworks} artworks.</DialogBody>
                        <DialogFooter>
                            <DialogFooterButton cancel>Cancel</DialogFooterButton>

                            <DialogFooterButton accept
                                                onClick={() => deleteUser(userId)}
                            >
                                DELETE IT ALL!
                            </DialogFooterButton>
                        </DialogFooter>
                    </DialogSurface>
                    <DialogBackdrop />
                </Dialog>
            </div>
        )
    }
}

export default DeleteUser;
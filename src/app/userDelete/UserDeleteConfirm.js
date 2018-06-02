import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';

const UserDeleteConfirm = function ({totalUserArtworks, onConfirmAccountDelete}) {
    return (
        <Typography use={'body1'}>
            <p>
                <strong>Step 3: Confirm delete</strong>
            </p>

            <p>
                Are you certain you want to delete everything?
            </p>

            <p>
                You'll be deleting:
            </p>

            <ul>
                <li>Your sign in</li>
                <li>{totalUserArtworks} artwork{totalUserArtworks !== 1 && 's'}</li>
            </ul>

            <Button raised onClick={onConfirmAccountDelete}>
                Yes, delete everything
            </Button>
        </Typography>
    )
};

export default UserDeleteConfirm;
import React from 'react';
import history from "../global/history";
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';

const UserDeleteGoToSignIn = function () {
    return (
        <Typography use={'body1'}>
            <p>
                You need to be signed in to delete an account. If you want to delete your account:
            </p>

            <Button raised onClick={() => history.push('/delete/step_2_step')}>
                Sign in here first
            </Button>
        </Typography>
    )
};

export default UserDeleteGoToSignIn;
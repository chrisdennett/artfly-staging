import React from 'react';
import { Button, ButtonIcon } from 'rmwc/Button';
import history from "../global/history";

const SignInButt = function () {
    return (
        <Button raised
                theme="secondary-bg on-secondary"
                onClick={() => history.push('/profile')}
        >
            <ButtonIcon use="input" />
            Sign in / up
        </Button>
    )
};

export default SignInButt;
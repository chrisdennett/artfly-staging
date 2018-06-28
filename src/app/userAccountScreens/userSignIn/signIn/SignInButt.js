import React from 'react';
import { Button, ButtonIcon } from 'rmwc/Button';

const SignInButt = ({onClick}) => {
    return (
        <Button raised
                theme="secondary-bg on-secondary"
                onClick={onClick}
        >
            <ButtonIcon use="input" />
            Sign in / up
        </Button>
    )
};

export default SignInButt;
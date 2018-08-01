import React from 'react';
import { Button } from 'rmwc/Button';

const SignInButt = ({onClick}) => {
    return (
        <Button raised
                theme="secondary-bg on-secondary"
                onClick={onClick}>
            Sign in
        </Button>
    )
};

export default SignInButt;
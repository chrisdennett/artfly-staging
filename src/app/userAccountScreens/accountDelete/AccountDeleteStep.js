import React from 'react';
import { Typography } from 'rmwc/Typography';

const AccountDeleteStep = () => {
    return (
        <Typography tag={'div'} className={'accountDelete--step--holder'}>
            {/*<div className={'accountDelete--step'}>
                <div className={'accountDelete--step--label'}>
                    Step 3: Remove {userSignInMethod.label} sign in
                </div>

                {authStepEnabled && showAuthDeleteButton &&
                <Button raised primary
                        disabled={!authStepEnabled}
                        className={'accountDelete--step--button'}
                        onClick={() => deleteUserAuth()}>
                    confirm
                </Button>
                }

                {authStepEnabled && showSignInButton &&
                <SignIn providerId={userSignInMethod.id}
                        successRedirect={'/profile/temp_auth_temp'}/>
                }
            </div>

            {!authStepEnabled &&
            <p className={'accountDelete--step--warning'}>
                Sign in data can only be removed after all other data has been deleted.
            </p>
            }

            <p className={'accountDelete--step--info'}>
                This will remove your sign in authorisation. <br/>
            </p>*/}
        </Typography>
    )
};

export default AccountDeleteStep;
import React, { Component } from "react";
// ui
import { Button } from 'rmwc/Button';
// styles
import './accountDelete_styles.css';
import { TempScreenAppBar } from "../../appBar/AppBar";

class AccountDelete extends Component {

    render() {
        const { onCancelDelete, totalArtworks, userSignInMethod } = this.props;

        return (
            <div className={'accountDeletePage'}>
                <TempScreenAppBar title={'Delete account'} onCloseClick={onCancelDelete}/>

                <div className={'accountDelete'}>

                    <div className={'accountDelete--step'}>
                        <div className={'accountDelete--step--label'}>
                            Step 1: Cancel subscription
                        </div>
                        <Button raised primary
                                className={'accountDelete--step--button'}
                                onClick={onCancelDelete}>
                            confirm
                        </Button>
                    </div>

                    <div className={'accountDelete--step'}>
                        <div className={'accountDelete--step--label'}>
                            Step 2: Delete {totalArtworks} artwork images:
                        </div>
                        <Button raised primary
                                className={'accountDelete--step--button'}
                                onClick={onCancelDelete}>
                            confirm
                        </Button>
                    </div>

                    <div className={'accountDelete--step'}>
                        <div className={'accountDelete--step--label'}>
                            Step 3: Delete all user data:
                        </div>
                        <Button raised primary
                                className={'accountDelete--step--button'}
                                onClick={onCancelDelete}>
                            confirm
                        </Button>
                    </div>

                    <div className={'accountDelete--step'}>
                        <div className={'accountDelete--step--label'}>
                            Step 4: Remove {userSignInMethod} sign in
                            <p>
                                This needs to be done after everything else because this will log you off.
                            </p>
                        </div>
                        <Button raised primary
                                className={'accountDelete--step--button'}
                                onClick={onCancelDelete}>
                            confirm
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountDelete;
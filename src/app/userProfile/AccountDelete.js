import React, { Component } from "react";
// ui
import { Button } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
// styles
import './accountDelete_styles.css';

class AccountDelete extends Component {

    render() {
        const {onCancelDelete, totalArtworks, userSignInMethod} = this.props;

        return (
            <div className={'accountDelete'}>

                <Typography use={'headline6'}>
                    Delete your ArtFly account...
                </Typography>

                <Button outlined primary onClick={onCancelDelete}>
                    Cancel
                </Button>

                <div>
                    <div>Cancel subscription:</div>
                </div>

                <div>
                    <div>Artworks:</div>
                    <Button raised primary onClick={onCancelDelete}>
                        Delete {totalArtworks} Artworks
                    </Button>
                </div>

                <div>
                    <div>User data:</div>
                    <Button raised primary onClick={onCancelDelete}>
                        Delete all user data
                    </Button>
                </div>

                <div>
                    <div>Sign in:</div>
                    <Button raised primary onClick={onCancelDelete}>
                        Remove {userSignInMethod} sign in
                    </Button>
                </div>
            </div>
        );
    }
}

export default AccountDelete;
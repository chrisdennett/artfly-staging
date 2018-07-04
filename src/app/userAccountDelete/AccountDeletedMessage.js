import React from 'react';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';

const AccountDeletedMessage = ({onNewAccountClick}) => {

    const holderStyle = { backgroundColor: 'rgba(255,255,0,0.8)', padding: 20 };
    const messageStyle = { maxWidth: 600, margin: '0 auto', textAlign: 'center' };

    return (
        <div style={holderStyle}>
            <div style={messageStyle}>
                <Typography tag={'div'} use={'body1'} style={{marginBottom: 10}}>
                    Account deletion nearly complete. Continue below or:
                </Typography>

                <Button onClick={onNewAccountClick}
                        raised theme={'secondary-bg on-secondary'}>
                    Set up a new account
                </Button>
            </div>
        </div>
    )
};

export default AccountDeletedMessage;
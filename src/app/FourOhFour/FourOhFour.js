import React from 'react';
import { Button } from 'rmwc/Button';
import history from "../global/history";

const FourOhFour = function () {
    return (
        <div style={{padding: 20}}>
            <h1>Four OH Four</h1>
            <p>Can't find that page, eek and such.</p>
            <Button raised
                    onClick={() => history.push('/')}>
                Go Home
            </Button>
        </div>
    )
};

export default FourOhFour;
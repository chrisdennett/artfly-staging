import React from 'react';
import { connect } from 'react-redux';
// actions
import {UpdateUrl} from "../../actions/UrlActions";
// comps
import { Button } from 'rmwc/Button';

const FourOhFour = function ({UpdateUrl}) {
    return (
        <div style={{padding: 20}}>
            <h1>Four OH Four</h1>
            <p>Can't find that page, eek and such.</p>
            <Button raised
                    onClick={() => UpdateUrl('/')}>
                Go Home
            </Button>
        </div>
    )
};

export default connect(null, {UpdateUrl})(FourOhFour);
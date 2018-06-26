import React, { Component } from "react";
// ui
import { goHome } from "../../../AppNavigation";
import { Typography } from 'rmwc/Typography';
// styles
import './accountSubscription_styles.css';
// comps
import { TempScreenAppBar } from "../../appBar/AppBar";

class AccountSubscription extends Component {

    render() {
        return (
            <div className={'accountSubscription'}>
                <TempScreenAppBar title={'Membership'}
                                  isFixed={true}
                                  onCloseClick={goHome}/>

                <div className={'accountSubscription--content'}>
                    <Typography tag={'h1'} use={'headline6'}>
                        Account Subscription
                    </Typography>
                    <Typography use={'body1'}>
                        I've disabled this for now until testing is complete.
                    </Typography>
                </div>
            </div>
        );
    }
}

export default AccountSubscription;
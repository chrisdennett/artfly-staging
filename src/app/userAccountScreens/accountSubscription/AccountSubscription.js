import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './accountSubscription_styles.css';
// actions
import { UpdateUrl } from "../../../actions/UrlActions";
// comps
import { TempScreenAppBar } from "../../appBar/AppBar";
import SubscribeButton from '../../global/SubscribeButton';

class AccountSubscription extends Component {

    render() {
        const { UpdateUrl } = this.props;

        return (
            <div className={'accountSubscription'}>
                <TempScreenAppBar title={'Membership'}
                                  isFixed={true}
                                  onCloseClick={() => UpdateUrl('/')}/>

                <div className={'accountSubscription--content'}>
                    <Typography tag={'h1'} use={'headline6'}>
                        Account Subscription
                    </Typography>
                    <Typography use={'body1'}>
                        I've disabled this for now until testing is complete.
                    </Typography>
                    <SubscribeButton/>
                </div>
            </div>
        );
    }
}

export default connect(null, { UpdateUrl })(AccountSubscription);
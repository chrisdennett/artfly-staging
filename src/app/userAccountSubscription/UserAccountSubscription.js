import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Typography } from 'rmwc/Typography';
// styles
import './accountSubscription_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// data
import membershipPlans from '../userAccountSubscription/membershipPlans';
// comps
import { TempScreenAppBar } from "../appBar/AppBar";
import SubscribeButton from '../global/SubscribeButton';

class UserAccountSubscription extends Component {

    render() {
        const { UpdateUrl, account } = this.props;

        const { subscription, dateJoined, status } = account;

        console.log("subscription: ", subscription);

        return (
            <div className={'accountSubscription'}>
                <TempScreenAppBar title={'Membership'}
                                  isFixed={true}
                                  onCloseClick={() => UpdateUrl('/profile')}/>
                {subscription &&
                <div className={'accountSubscription--content'}>
                    <Typography tag={'h1'} use={'headline6'}>
                        Account Subscription
                    </Typography>

                    <div>
                        account Status: {status}
                    </div>

                    <div>
                        paid until: {subscription.paidUntil}
                    </div>

                    <div>
                        date joined: {dateJoined}
                    </div>

                    <div>
                        cancel url: {subscription.cancelUrl}
                    </div>

                    <div>
                        update url: {subscription.updateUrl}
                    </div>
                </div>
                }

                {!subscription &&
                <div>
                    Join ArtFly: <SubscribeButton/>
                </div>
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};
export default connect(mapStateToProps, { UpdateUrl })(UserAccountSubscription);
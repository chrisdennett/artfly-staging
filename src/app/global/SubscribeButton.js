// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Button } from 'rmwc/Button';
// actions
import { subscribeUser } from '../../actions/PaddleActions';

class SubscribeButton extends Component {

    onSubscribe = () => {
        const { userId } = this.props;
        this.props.subscribeUser(userId);
    };

    render() {
        const buttonTxt = this.props.label || 'Subscribe';

        return (
            <Button onClick={this.onSubscribe}>
                {buttonTxt}
            </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid
    }
};

export default connect(mapStateToProps, { subscribeUser })(SubscribeButton);
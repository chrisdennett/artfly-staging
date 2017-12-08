// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { subscribeUser } from '../../actions/PaddleActions';
// components
import Butt from "./Butt/Butt";

class SubscribeButton extends Component {

    onSubscribe = () => {
        const { userId } = this.props;
        this.props.subscribeUser(userId, this.props.userEmail);
    };

    render() {
        const buttonTxt = this.props.label || 'Subscribe';

        return (
            <Butt green inline size={'small'} label={buttonTxt} onClick={this.onSubscribe}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.user.email,
        userId: state.user.uid
    }
};

export default connect(
    mapStateToProps, { subscribeUser }
)(SubscribeButton);
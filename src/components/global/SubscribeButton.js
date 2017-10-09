// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { subscribeUser } from '../../actions/PaddleActions';
// components
import Butt from "./Butt";

class SubscribeButton extends Component {

    onSubscribe = () => {
        const { userId } = this.props;
        this.props.subscribeUser(userId, this.props.userEmail);
    };

    render() {
        return (
            <Butt inline={true} size={'small'} label={`Subscribe`} onClick={this.onSubscribe}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userEmail: state.user.email,
    }
};

export default connect(
    mapStateToProps, { subscribeUser }
)(SubscribeButton);
import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './UserActions';

class Login extends Component {

    login() {
        this.props.loginUser();
    }

    logout() {
        this.props.logoutUser();
    }

    render() {



        if (!this.props.user || !this.props.user.uid) {
            return (
                <span>
                    <button onClick={this.login.bind(this)}>Sign up / Log in</button>
                </span>
            );
        }

        return (
            <span>
                <button onClick={this.logout.bind(this)}>Log out</button>
            </span>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { loginUser, logoutUser })(Login);
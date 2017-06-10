import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginUser, logoutUser } from './UserActions';

import NewUserForm from './NewUserForm';

class Login extends Component {

    login() {
        this.props.loginUser();
    }

    logout() {
        this.props.logoutUser();
    }

    render() {
        if (!this.props.userAuth || !this.props.userAuth.uid) {
            return (
                <span>
                    <button onClick={this.login.bind(this)}>Sign up / Log in</button>
                </span>
            );
        }

        /*If there's not user data it must be a new user*/
        if (!this.props.user) {
            return (
                <div>
                    <NewUserForm {...this.props} />
                </div>
            )
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
        userAuth: state.userAuth,
        user: state.user
    }
}

export default connect(mapStateToProps, { loginUser, logoutUser })(Login);
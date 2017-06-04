import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserAuth, fetchUser, fetchArtists, loginUser, logoutUser } from '../actions';

import NewUserForm from './NewUserForm';

class Login extends Component {

    componentDidMount() {
        this.props.fetchUserAuth(() => {
            // if userAuth is not null...
            if (this.props.userAuth) {
                // ...fetch user data with a callback function
                this.props.fetchUser(this.props.userAuth.uid, () => {
                    // ...fetch the user's artists
                    if(this.props.user) {
                        this.props.fetchArtists(this.props.user.artists);
                    }
                });
            }
        });
    }

    login() {
        this.props.loginUser();
    }

    logout() {
        this.props.logoutUser();
    }

    render() {
        if (!this.props.userAuth || !this.props.userAuth.uid) {
            return (
                <div>
                    <button onClick={this.login.bind(this)}>Sign up / Log in</button>
                </div>
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
            <div>
                <button onClick={this.logout.bind(this)}>Log out</button>
                <Link to="/mygallery">My Gallery</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth,
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUserAuth, fetchUser, fetchArtists, loginUser, logoutUser })(Login);
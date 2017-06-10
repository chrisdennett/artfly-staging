import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserAuth, fetchUser, fetchArtists } from './UserActions';

import Login from './Login';

class UserControls extends Component {

    componentDidMount() {
        this.props.fetchUserAuth(() => {
            // if userAuth is not null...
            if (this.props.userAuth) {
                // ...fetch user data with a callback function
                this.props.fetchUser(this.props.userAuth.uid, () => {
                    // ...fetch the user's artists
                    if (this.props.user) {
                        this.props.fetchArtists(this.props.user.artists);
                    }
                });
            }
        });
    }

    render() {
        if (!this.props.userAuth || !this.props.user) {
            return (
                <div>
                    <Link to="/">home</Link>
                    <Login />
                </div>
            )
        }

        return (
            <div>
                <Link to="/">home</Link>
                <Login />
                <Link to={`/gallery/${this.props.user.galleryId}`}>Gallery</Link>
                <Link to="/controlPanel">Control Panel</Link>
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

export default connect(mapStateToProps, { fetchUserAuth, fetchUser, fetchArtists })(UserControls);
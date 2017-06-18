import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserData } from './UserActions';

import Login from './Login';
import GalleryControls from './GalleryControls/GalleryControls';

class UserControls extends Component {

    componentDidMount(){
        this.props.fetchUserData();
    }

    render() {
        if (!this.props.user) {
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
                <GalleryControls />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUserData })(UserControls);
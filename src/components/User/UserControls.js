import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserData } from './UserActions';

import Login from './Login';
import GalleryControls from './GalleryControls/GalleryControls';

class UserControls extends Component {

    componentDidMount() {
        this.props.fetchUserData();
    }

    render() {
        const { artworkId, galleryId } = this.props.match.params;

        if (this.props.user.status === "pending") {
            return <div>Checking the salad draw...</div>
        }

        if (!this.props.user || !this.props.user.uid) {
            return (
                <div>
                    <Link to="/">home</Link>
                    <Login />
                    <GalleryControls artworkId={artworkId}
                                     galleryId={this.props.user.galleryId}
                                     currentGalleryId={galleryId}
                                     history={this.props.history}/>
                </div>
            )
        }

        return (

            <div>
                <Link to="/">home</Link>
                <Login />
                <Link to="/controlPanel">Control Panel</Link>

                <GalleryControls artworkId={artworkId}
                                 galleryId={this.props.user.galleryId}
                                 currentGalleryId={galleryId}
                                 history={this.props.history}/>
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
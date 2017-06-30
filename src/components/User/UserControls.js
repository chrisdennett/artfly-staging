import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserData } from './UserActions';
import { fetchGallery } from '../Gallery/GalleryActions';

import Login from './Login';
import NewUserForm from './NewUserForm';
import GalleryControls from './GalleryControls/GalleryControls';

class UserControls extends Component {

    componentDidMount() {
        this.props.fetchUserData();
    }

    componentWillUpdate(nextProps) {
        const params = nextProps.match.params;
        const { galleryId } = params;

        if (galleryId) {
            this.props.fetchGallery(galleryId);
        }
    }

    addUserOnlyControlsIfLoggedIn() {
        if (this.props.user.status === "none" || !this.props.user || !this.props.user.uid) {
            return "";
        }

        return <Link to="/controlPanel">Control Panel</Link>;
    }

    render() {
        const artworkIdFromUrl = this.props.match.params.artworkId;
        const galleryIdFromUrl = this.props.match.params.galleryId;
        const userStatus = this.props.user.status;

        if (userStatus === "pending") {
            return <div>Checking the salad draw...</div>
        }

        if (userStatus === "new") {
            return <NewUserForm {...this.props} />
        }

        return (
            <div>
                <Link to="/">home</Link>
                <Login />
                { this.addUserOnlyControlsIfLoggedIn()}

                <GalleryControls artworkId={artworkIdFromUrl}
                                 userGalleryId={this.props.user.galleryId}
                                 galleryIdFromUrl={galleryIdFromUrl}
                                 history={this.props.history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUserData, fetchGallery })(UserControls);
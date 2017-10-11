// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { logoutUser } from '../../../actions/UserActions';
// components
import UserControls from './UserControls';

class UserControlsHolder extends Component {
    render() {
        // status can be undefined, pending, complete, none
        return <UserControls userStatus={this.props.userStatus}
                             maxArtworksReached={this.props.maxArtworksReached}
                             logout={this.props.logoutUser}
                             galleryId={this.props.galleryId}
                             artworkId={this.props.artworkId}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        userStatus: state.user.status,
        maxArtworksReached: state.user.maxArtworksReached
    }
};

const UserControlsContainer = connect(
    mapStateToProps, { logoutUser }
)(UserControlsHolder);

export default UserControlsContainer;

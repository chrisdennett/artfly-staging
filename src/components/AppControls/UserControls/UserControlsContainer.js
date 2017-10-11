// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { logoutUser } from '../../../actions/UserActions';
// components
import UserControls from './UserControls';

class UserControlsHolder extends Component {
    render() {
        const { userStatus, allowEditing, maxArtworksReached, logoutUser, galleryId, artworkId} = this.props;

        return <UserControls userStatus={userStatus}
                             allowEditing={allowEditing}
                             maxArtworksReached={maxArtworksReached}
                             logout={logoutUser}
                             galleryId={galleryId}
                             artworkId={artworkId}/>;
    }
}

const mapStateToProps = (state, ownProps) => {
    let allowEditing = false;
    if(ownProps.galleryId && state.user.artistIds){
        // if the galleryId is listed in the user.artistIds
        allowEditing = state.user.artistIds.hasOwnProperty(ownProps.galleryId);
    }

    return {
        userStatus: state.user.status,
        allowEditing: allowEditing,
        maxArtworksReached: state.user.maxArtworksReached
    }
};

const UserControlsContainer = connect(
    mapStateToProps, { logoutUser }
)(UserControlsHolder);

export default UserControlsContainer;

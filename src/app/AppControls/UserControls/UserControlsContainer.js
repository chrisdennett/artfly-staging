// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { signOutUser } from '../../../actions/UserDataActions';
// components
import UserControls from './UserControls';

class UserControlsHolder extends Component {
    render() {
        const { userStatus, allowEditing, maxArtworksReached, logoutUser, galleryId, artworkId} = this.props;

        if(userStatus === 'new'){
            return null;
        }

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

    if(ownProps.galleryId && state.artworks[ownProps.artworkId]){
        allowEditing = state.artworks[ownProps.artworkId].adminId === state.user.uid;
    }

    return {
        userStatus: state.user.status,
        allowEditing: allowEditing,
        maxArtworksReached: state.user.maxArtworksReached
    }
};

const UserControlsContainer = connect(
    mapStateToProps, { logoutUser: signOutUser }
)(UserControlsHolder);

export default UserControlsContainer;

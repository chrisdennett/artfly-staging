// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// components
import UserControls from './UserControls';

class UserControlsHolder extends Component {
    render() {
        const { userStatus, allowEditing, maxArtworksReached, galleryId, artworkId} = this.props;

        if(userStatus === 'new'){
            return null;
        }

        return <UserControls userStatus={userStatus}
                             allowEditing={allowEditing}
                             maxArtworksReached={maxArtworksReached}
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

export default connect(mapStateToProps)(UserControlsHolder);
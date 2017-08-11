import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserData, loginUser, logoutUser } from '../../../actions/UserActions';

import UserControls from './UserControls';

// Intermediary component so ui component isn't required to call data
class UserControlsHolder extends Component {
    componentDidMount() {
        this.props.fetchUserData();
    }

    render() {
        const { status } = this.props.user;
        // status can be undefined, pending, complete, none
        return <UserControls userStatus={status}
                             history={this.props.history}
                             login={this.props.loginUser}
                             logout={this.props.logoutUser}
                             galleryId={this.props.galleryId}
                             artworkId={this.props.artworkId}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { galleryId, artworkId } = ownProps;

    return {
        user: state.user,
        galleryId: galleryId,
        artworkId: artworkId
    }
};

const UserControlsContainer = connect(
    mapStateToProps, { fetchUserData, loginUser, logoutUser }
)(UserControlsHolder);

export default UserControlsContainer;

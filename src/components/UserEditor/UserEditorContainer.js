// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { addNewUser, signOutUser } from '../../actions/ArtistGalleryActions';
// components
import UserEditor from './UserEditor';

class UserEditorHolder extends Component {
    render() {
        const {user, createNewUser, logoutUser} = this.props;

        let initialValues = {
            email: user.email,
            firstName: '',
            lastName: ''
        };

        return <UserEditor user={user}
                           initialValues={initialValues}
                           createNewUser={createNewUser}
                           logoutUser={logoutUser}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const UserEditorContainer = connect(
    mapStateToProps, { createNewUser: addNewUser, logoutUser: signOutUser }
)(UserEditorHolder);

export default UserEditorContainer;
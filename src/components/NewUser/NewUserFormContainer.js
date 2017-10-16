// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { addNewUser, signOutUser } from '../../actions/ArtistGalleryActions';
// components
import NewUserForm from './NewUserForm';
import WelcomeMessage from "./WelcomeMessage";

class UserEditorHolder extends Component {

    render() {
        const { userId, userStatus, userEmail, addNewUser, signOutUser } = this.props;

        if (userStatus === 'complete') {
            return ( <WelcomeMessage/>);
        }
        else {

            let initialValues = {
                email: userEmail,
                firstName: '',
                lastName: ''
            };
            return ( <NewUserForm userId={userId}
                                  initialValues={initialValues}
                                  addNewUser={addNewUser}
                                  signOutUser={signOutUser}/>);
        }
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state) => {
    return {
        userId: state.user.uid,
        userStatus: state.user.status,
        userEmail: state.user.email
    }
};

const UserEditorContainer = connect(
    mapStateToProps, { addNewUser, signOutUser }
)(UserEditorHolder);

export default UserEditorContainer;
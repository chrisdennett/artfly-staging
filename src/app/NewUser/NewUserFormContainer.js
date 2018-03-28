// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { addNewUser, signOutUser } from '../../actions/UserDataActions';
// components
import NewUserForm from './NewUserForm';
import Redirect from "../global/Redirect";

class UserEditorHolder extends Component {

    render() {
        const { userId, userStatus, userEmail, addNewUser, signOutUser } = this.props;

        if (userStatus === 'complete') {
            return <Redirect to={'/'}/>
        }
        else {

            let initialValues = {
                email: userEmail,
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
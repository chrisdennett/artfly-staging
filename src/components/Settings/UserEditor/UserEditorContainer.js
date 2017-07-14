import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createNewUser, deleteUser } from '../../AppControls/UserControls/UserActions';

import UserEditor from './UserEditor';

class UserEditorHolder extends Component {
    componentDidMount() {

    }

    render() {
        const {user, createNewUser, deleteUser} = this.props;
        const {status} = user;

        if(status === "none"){
            return <Redirect to={`/`} />
        }
        else if(status === "complete"){
            return <Redirect to={`/settings/`} />
        }
        else if(status === "pending"){
            return <div>loading new user form...</div>;
        }

        let initialValues = {
            email: user.email,
            artistName: user.displayName,
            galleryName: `The curious gallery of ${user.displayName}`
        };

        return <UserEditor user={user}
                           initialValues={initialValues}
                           createNewUser={createNewUser}
                           deleteUser={deleteUser}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const UserEditorContainer = connect(
    mapStateToProps, { createNewUser, deleteUser }
)(UserEditorHolder);

export default UserEditorContainer;
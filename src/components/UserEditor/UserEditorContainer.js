import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import { createNewUser, logoutUser } from '../../actions/UserActions';

import UserEditor from './UserEditor';

class UserEditorHolder extends Component {
    componentDidMount() {

    }

    render() {
        const {user, createNewUser, logoutUser} = this.props;
        const {status} = user;

        /*if(status === "none"){
            return <Redirect to={`/`} />
        }
        else if(status === "complete"){
            return <Redirect to={`/settings/`} />
        }*/
        if(status === "pending"){
            return <div>loading new user form...</div>;
        }

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
    mapStateToProps, { createNewUser, logoutUser }
)(UserEditorHolder);

export default UserEditorContainer;
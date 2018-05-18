import React from "react";
import { connect } from 'react-redux';
import {
    List,
    ListItem,
    ListItemText,
    ListItemGraphic
} from 'rmwc/List';
//
import { signOutUser } from "../../actions/UserDataActions";
import history from "../global/history";

const SignOutMenu = ({ signOutUser }) => {
    return (
        <List>
            <ListItem onClick={() => history.push('/profile')}>
                <ListItemGraphic>person</ListItemGraphic>
                <ListItemText>Profile</ListItemText>
            </ListItem>
            <ListItem onClick={signOutUser}>
                <ListItemGraphic>exit_to_app</ListItemGraphic>
                <ListItemText>Sign out</ListItemText>
            </ListItem>
        </List>
    );
};

export default connect(null, { signOutUser })(SignOutMenu);
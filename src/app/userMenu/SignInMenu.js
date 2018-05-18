import React, { Component } from "react";
import { connect } from 'react-redux';
import * as faFacebook from "@fortawesome/fontawesome-free-brands/faFacebookSquare";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    List,
    ListItem,
    ListItemText,
    ListItemGraphic
} from 'rmwc/List';
// actions
import { signInWithGoogle, signInWithFacebook } from '../../actions/UserDataActions';
// comps
import GoogleIcon from "../global/GoogleIcon";

const SignInMenu = ({ signInWithGoogle, signInWithFacebook }) => {

    return (
        <List>
            <ListItem onClick={signInWithGoogle}>
                <ListItemGraphic><GoogleIcon/></ListItemGraphic>
                <ListItemText>with Google</ListItemText>
            </ListItem>

            <ListItem onClick={signInWithFacebook}>
                <ListItemGraphic><FontAwesomeIcon icon={faFacebook}/></ListItemGraphic>
                <ListItemText>with Facebook</ListItemText>
            </ListItem>

        </List>
    );
};

const mapActionsToProps = { signInWithGoogle, signInWithFacebook };
export default connect(null, mapActionsToProps)(SignInMenu);
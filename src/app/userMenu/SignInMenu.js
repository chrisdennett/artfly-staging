import React from "react";
import { connect } from 'react-redux';
import * as faFacebookSquare from "@fortawesome/fontawesome-free-brands/faFacebookSquare";
import * as faTwitterSquare from "@fortawesome/fontawesome-free-brands/faTwitterSquare";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    List,
    ListItem,
    ListItemText,
    ListItemGraphic
} from 'rmwc/List';
// actions
import { signInWithGoogle, signInWithFacebook, signInWithTwitter } from '../../actions/UserDataActions';
// comps
import GoogleIcon from "../global/GoogleIcon";

const SignInMenu = ({ signInWithGoogle, signInWithFacebook, signInWithTwitter }) => {

    return (
        <List>
            <ListItem onClick={signInWithGoogle}>
                <ListItemGraphic><GoogleIcon/></ListItemGraphic>
                <ListItemText>with Google</ListItemText>
            </ListItem>

            <ListItem onClick={signInWithTwitter}>
                <ListItemGraphic><FontAwesomeIcon icon={faTwitterSquare}/></ListItemGraphic>
                <ListItemText>with Twitter</ListItemText>
            </ListItem>

            <ListItem onClick={signInWithFacebook}>
                <ListItemGraphic><FontAwesomeIcon icon={faFacebookSquare}/></ListItemGraphic>
                <ListItemText>with Facebook</ListItemText>
            </ListItem>

        </List>
    );
};

const mapActionsToProps = { signInWithGoogle, signInWithFacebook, signInWithTwitter };
export default connect(null, mapActionsToProps)(SignInMenu);
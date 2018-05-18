import React from "react";
import { connect } from 'react-redux';
import { MenuItem } from 'rmwc/Menu';
//
import { signOutUser } from "../../actions/UserDataActions";

const SignOutMenu = ({ signOutUser }) => {
    return (
        <MenuItem
            onClick={signOutUser}>
            Sign out
        </MenuItem>
    );
};

export default connect(null, { signOutUser })(SignOutMenu);
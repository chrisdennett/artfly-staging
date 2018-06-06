import React, { Component } from "react";
import { connect } from 'react-redux';
import { ToolbarIcon } from 'rmwc/Toolbar';
import { Menu, MenuAnchor } from 'rmwc/Menu';
import {
    List,
    ListItem,
    ListItemText,
    ListItemGraphic
} from 'rmwc/List';
// actions
import { signOutUser } from "../../actions/UserAuthActions";
// comps
import SignInButt from '../signIn/SignInButt';
import history from "../global/history";

class UserMenu extends Component {

    constructor(props) {
        super(props);

        this.state = { menuIsOpen: false };
    }

    render() {
        const { menuIsOpen } = this.state;
        const { userSignedIn, signOutUser } = this.props;

        return (
            <div>
                <MenuAnchor>
                    <Menu
                        open={menuIsOpen}
                        anchorCorner={'topLeft'}
                        onClose={() => this.setState({ menuIsOpen: false })}
                    >
                        {userSignedIn &&
                        <List>
                            <ListItem onClick={() => history.push('/profile')}>
                                <ListItemGraphic>person</ListItemGraphic>
                                <ListItemText>Profile</ListItemText>
                            </ListItem>
                            <ListItem onClick={() => signOutUser()}>
                                <ListItemGraphic>exit_to_app</ListItemGraphic>
                                <ListItemText>Sign out</ListItemText>
                            </ListItem>
                        </List>
                        }
                    </Menu>

                    {!userSignedIn && <SignInButt/>}

                    {userSignedIn &&
                    <ToolbarIcon use="person"
                                 theme={'text-primary-on-background'}
                                 onClick={() => this.setState({ menuIsOpen: true })}/>
                    }
                </MenuAnchor>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // just care about a 
    return {
        userSignedIn: !!state.user.uid
    }
};
export default connect(mapStateToProps, {signOutUser})(UserMenu);
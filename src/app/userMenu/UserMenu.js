import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
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
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import SignInButt from '../userAccountScreens/userSignIn/signIn/SignInButt';

class UserMenu extends Component {

    constructor(props) {
        super(props);

        this.state = { menuIsOpen: false };

        this.onProfileClick = this.onProfileClick.bind(this);
    }

    onProfileClick(){
        this.setState({menuIsOpen: false}, () => {
            setTimeout(() => this.props.UpdateUrl('/profile'), 100);
        });
    }

    render() {
        const { menuIsOpen } = this.state;
        const { userSignedIn, signOutUser, userPending, UpdateUrl } = this.props;

        return (
            <div>
                {!userPending &&
                <MenuAnchor>
                    <Menu
                        open={menuIsOpen}
                        anchorCorner={'topLeft'}
                        onClose={() => this.setState({ menuIsOpen: false })}
                    >
                        {userSignedIn &&
                        <List>
                            <ListItem onClick={this.onProfileClick}>
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

                    {!userSignedIn &&
                    <SignInButt onClick={() => UpdateUrl('/profile')}/>
                    }

                    {userSignedIn &&
                    <ToolbarIcon use="person"
                                 theme={'text-primary-on-background'}
                                 onClick={() => this.setState({ menuIsOpen: true })}/>
                    }
                </MenuAnchor>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userPending: state.user === 'pending',
        userSignedIn: !!state.user.uid
    }
};
export default connect(mapStateToProps, { signOutUser, UpdateUrl })(UserMenu);
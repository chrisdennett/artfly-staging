import React, { Component } from "react";
import { connect } from 'react-redux';
import { ToolbarIcon } from 'rmwc/Toolbar';
import { Menu, MenuAnchor } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';
// comps
import history from '../global/history';
import SignInMenu from "./SignInMenu";
import SignOutMenu from "./SignOutMenu";

/*
* If user isn't logged in show sign in / up button
* The sign in/up button opens a menu to sign in with
* google or facebook
*
* If they've not logged in before show a popup dialog
* asking to confirm their email address with funny tick
* boxes to say what I can use the email for.
*
* Once logged in completely show the user icon or display
* image if they have one in a little circle.
*
* Clicking this brings up the menu to 'log out' (and
* 'profile' in the future)
*
* */
class UserMenu extends Component {

    constructor(props) {
        super(props);

        this.state = { menuIsOpen: false };
    }

    render() {
        const { menuIsOpen } = this.state;
        const { userLoginStatus } = this.props;
        // userStatus: complete, pending, none, new
        // userLoginStatus: loggedIn, loggedOut, pending

        const isLoggedIn = userLoginStatus === 'loggedIn';

        return (
            <div>

                <MenuAnchor>
                    <Menu
                        open={menuIsOpen}
                        anchorCorner={'topLeft'}
                        onClose={() => this.setState({ menuIsOpen: false })}
                    >

                        {!isLoggedIn &&
                        <SignInMenu/>
                        }

                        {isLoggedIn &&
                        <SignOutMenu/>
                        }

                    </Menu>

                    {
                        !isLoggedIn &&
                        <Button raised
                                theme="secondary-bg on-secondary"
                                onClick={() => history.push('/signIn')}
                        >
                            Sign in / up
                        </Button>
                    }

                    {
                        isLoggedIn &&
                        <ToolbarIcon use="person"
                                     onClick={() => this.setState({ menuIsOpen: true })}/>
                    }
                </MenuAnchor>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLoginStatus: state.user.loginStatus
    }
};
export default connect(mapStateToProps)(UserMenu);
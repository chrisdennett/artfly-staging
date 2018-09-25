import React, { Component } from 'react';
import { connect } from 'react-redux';
// ui
import { TabBar, Tab } from 'rmwc/Tabs';
import { Typography } from 'rmwc/Typography';
// styles
import './userSignIn_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import SignIn from './signIn/SignIn';
import { TempScreenAppBar } from "../../components/appBar/AppBar";

class UserSignIn extends Component {

    constructor(props) {
        super(props);

        const activeTabIndex = props.show === 'signUp' ? 0 : 1;

        this.state = { activeTabIndex };
    }

    render() {
        const { UpdateUrl } = this.props;
        const { activeTabIndex } = this.state;
        const showSignUp = activeTabIndex === 0;

        return (
            <div className={'userSignIn'}>
                <TempScreenAppBar title={'Sign in'} onCloseClick={() => UpdateUrl('/')}/>

                <TabBar
                    style={{backgroundColor:'rgba(255,255,255,0.5)', width:'100%'}}
                    activeTabIndex={activeTabIndex}
                    onActivate={e => this.setState({ activeTabIndex: e.detail.index })}>
                    <Tab>new user sign up</Tab>
                    <Tab>sign in</Tab>
                </TabBar>

                <div className={'signIn-intro'}>
                    {showSignUp &&
                    <div>
                        <Typography use={'headline5'} style={{marginBottom:3}} tag={'h2'}>Create your free account</Typography>
                        <Typography use={'body1'}>Set up an account using a social media account or email:</Typography>
                    </div>
                    }

                </div>

                <SignIn isSignUp={showSignUp}/>
            </div>
        )
    }
}

export default connect(null, { UpdateUrl })(UserSignIn);
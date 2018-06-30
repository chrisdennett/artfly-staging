import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
// styles
import './userSignIn_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import SignIn from './signIn/SignIn';
import { TempScreenAppBar } from "../appBar/AppBar";

const UserSignIn = ({UpdateUrl}) => {
    return (
        <div className={'userSignIn'}>
            <TempScreenAppBar title={'Sign in'} onCloseClick={() => UpdateUrl('/')}/>

            <div className={'signIn-intro'}>
                <Typography use={'body1'}>
                    <p>Sign in OR sign up for the first time.</p>
                </Typography>
                <SignIn/>
            </div>
        </div>
    )
};

export default connect(null, { UpdateUrl })(UserSignIn);
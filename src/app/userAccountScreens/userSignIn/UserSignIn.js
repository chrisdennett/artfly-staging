import React from 'react';
import { Typography } from 'rmwc/Typography';
// styles
import './userSignIn_styles.css';
// comps
import SignIn from './signIn/SignIn';
import { TempScreenAppBar } from "../../appBar/AppBar";
import { goHome } from "../../../AppNavigation";

const UserSignIn = () => {
    return (
        <div className={'userSignIn'}>
            <TempScreenAppBar title={'Sign in'} onCloseClick={goHome}/>

            <div className={'signIn-intro'}>
                <Typography use={'body1'}>
                    <p>Sign in OR sign up for the first time.</p>
                </Typography>
                <SignIn/>
            </div>
        </div>
    )
};

export default UserSignIn;
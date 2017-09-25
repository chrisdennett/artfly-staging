import React, { Component } from "react";
import FacebookSignInButton from "./assets/FacebookSignInButton";
import GoogleSignInButton from "./assets/GoogleSignInButton";
import { loginWithGoogle, loginWithFacebook } from '../../actions/UserActions';
import Butt from "../global/Butt";

class SignInModal extends Component {

    constructor(props){
        super(props);

        this.onGoogleSelect = this.onGoogleSelect.bind(this);
        this.onFacebookSelect = this.onFacebookSelect.bind(this);
        this.close = this.close.bind(this);
    }

    onGoogleSelect(){
        loginWithGoogle();
    }


    onFacebookSelect(){
        loginWithFacebook();
    }

    close() {
        if (this.props.closeModal) {
            this.props.closeModal()
        }
    }

    render() {
        if (this.props.isOpen === false)
            return null;

        let modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            display: 'flex',
            flexDirection: 'column'
        };


        let backdropStyle = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            backgroundColor: '#0288D1',
            background: 'radial-gradient(circle, #039BE5, #01579b)'
        };

        return (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    <h1 style={{color:'#fff', fontSize:36}}>Sign in to ArtFly</h1>

                    <GoogleSignInButton onClick={this.onGoogleSelect}/>
                    <FacebookSignInButton onClick={this.onFacebookSelect}/>

                    <Butt label={`Don't sign in`}
                          showAsLink={true}
                          onClick={this.close}/>
                </div>
            </div>
        )
    }


}

export default SignInModal;
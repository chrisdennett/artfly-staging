import React, { Component } from 'react';
import SignInButton from "./SignInButton";
import SignInModal from "./SignInModal";

class SignInContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }

    render() {

        return (
            <div>
                <SignInModal closeModal={this.closeModal} isOpen={this.state.isModalOpen}/>
                <SignInButton onClick={this.openModal}/>
            </div>
        )
    }
};

export default SignInContainer;
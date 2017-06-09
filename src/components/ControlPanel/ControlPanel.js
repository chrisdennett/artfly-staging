import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ArtworkAdder from './ArtworkAdder/ArtworkAdder';
import AddNewArtistForm from '../User/ArtistAdder/AddNewArtistForm';

class ControlPanel extends Component {

    render() {
        if (!this.props.userAuth || !this.props.user) {
            return (<Redirect to="/"/>)
        }

        return (
            <div>
                <h1>Control Panel</h1>
                <ArtworkAdder />
                <AddNewArtistForm userId={this.props.userAuth.uid}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userAuth: state.userAuth,
        user: state.user
    }
}

export default connect(mapStateToProps, {  })(ControlPanel);
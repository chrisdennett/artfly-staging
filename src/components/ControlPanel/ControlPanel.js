import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CuratorDetails from './CuratorDetails';
import GalleryDetails from './GalleryDetails';
import ArtistsDetails from './ArtistsDetails';

class ControlPanel extends Component {

    render() {
        if (!this.props.user) {
            return (<Redirect to="/"/>)
        }

        return (
            <div>
                <h1>Control Panel</h1>
                <CuratorDetails name={this.props.user.curator }/>
                <GalleryDetails name={this.props.user.gallery.name }/>
                <ArtistsDetails userId={this.props.user.uid} galleryId={this.props.user.galleryId}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {  })(ControlPanel);
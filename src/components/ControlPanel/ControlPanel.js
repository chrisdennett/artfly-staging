import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CuratorDetails from './Curator/CuratorDetails';
import GalleryDetails from './GalleryDetails';
import ArtistsDetails from './ArtistsDetails';

class ControlPanel extends Component {

    render() {
        if(this.props.user.status === "complete"  && this.props.user.gallery){
            return (
                <div>
                    <h1>Control Panel</h1>
                    <CuratorDetails userId={this.props.user.uid} name={this.props.user.curator }/>
                    <GalleryDetails userId={this.props.user.uid} name={this.props.user.gallery.name }/>
                    <ArtistsDetails userId={this.props.user.uid} galleryId={this.props.user.galleryId}/>
                </div>
            );
        }

        if (this.props.user.status === "none" ) {
            return (<Redirect to="/"/>)
        }

        return <div>Looking for socks</div>;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {  })(ControlPanel);
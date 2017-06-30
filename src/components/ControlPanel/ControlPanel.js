import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CuratorDetails from './CuratorDetails/CuratorDetails';
import GalleryDetails from './GalleryDetails/GalleryDetails';
import ArtistList from './ArtistList/ArtistList';

class ControlPanel extends Component {

    render() {

        // set value to Id of artist being edited or
        const artistIdBeingEdited = (!this.props.controlPanel.currentArtist) ? null : this.props.controlPanel.currentArtist.artistId;
        const userStatus = this.props.user.status;

        if(userStatus === "complete"  && this.props.user.gallery){
            return (
                <div>
                    <h1>Control Panel</h1>
                    <CuratorDetails userId={this.props.user.uid} name={this.props.user.curator }/>
                    <GalleryDetails galleryId={this.props.user.galleryId} name={this.props.user.gallery.name }/>
                    <ArtistList artistIdBeingEdited={artistIdBeingEdited} artists={this.props.user.artists} userId={this.props.user.uid} galleryId={this.props.user.galleryId}/>
                </div>
            );
        }

        if (userStatus === "none" || userStatus === "new" ) {
            return (<Redirect to="/"/>)
        }

        return <div>Busy doing something important no doubt...</div>;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        controlPanel: state.controlPanel
    }
}

export default connect(mapStateToProps, {  })(ControlPanel);
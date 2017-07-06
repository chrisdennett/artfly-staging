import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
                    <h1>My Galleries</h1>
                    <GalleryDetails galleryId={this.props.user.galleryId} name={this.props.user.gallery.name }/>
                    <Link to={`/gallery/${this.props.user.galleryId}`}>Open Gallery</Link>
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
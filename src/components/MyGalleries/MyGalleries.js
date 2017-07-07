import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ArtistList from './ArtistGalleryList/ArtistList';

class MyGalleries extends Component {
    render() {
        // set value to Id of artist being edited or
        const artistIdBeingEdited = (!this.props.controlPanel.currentArtist) ? null : this.props.controlPanel.currentArtist.artistId;
        const userStatus = this.props.user.status;

        if(userStatus === "complete"){
            return (
                <div>
                    <h1>My Galleries</h1>
                    <ArtistList artistIdBeingEdited={artistIdBeingEdited}
                                artists={this.props.artists}
                                userId={this.props.user.uid}
                                history={this.props.history}
                                galleries={this.props.galleries}
                                galleryId={this.props.user.galleryId}/>
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
        controlPanel: state.controlPanel,
        galleries: state.galleries,
        artists: state.artists
    }
}

export default connect(mapStateToProps, {  })(MyGalleries);
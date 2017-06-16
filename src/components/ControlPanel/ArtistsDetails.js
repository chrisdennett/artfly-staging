import React, { Component } from "react";

import ArtworkAdder from './ArtworkAdder/ArtworkAdder';
import AddNewArtistForm from '../User/ArtistAdder/AddNewArtistForm';

class ArtistsDetails extends Component {

    render() {
        return (
            <div>
                <h2>Artists</h2>
                <AddNewArtistForm userId={this.props.userId} galleryId={this.props.galleryId}/>
                <ArtworkAdder />
            </div>
        );
    }
}

export default ArtistsDetails;
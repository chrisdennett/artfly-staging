import React, { Component } from "react";
import _ from 'lodash';

import AddNewArtistForm from '../ArtistAdder/AddNewArtistForm';
import ArtistInfo from './ArtistInfo';

class ArtistsDetails extends Component {

    /*TODO: Only allow one artist to be edited at at time*/

    render() {
        return (
            <div>
                <h2>Artists</h2>
                <AddNewArtistForm userId={this.props.userId} galleryId={this.props.galleryId}/>

                {
                    _.map(this.props.artists, (artist, artistId) => {
                        const disableEditing = this.props.artistIdBeingEdited && this.props.artistIdBeingEdited !== artistId;

                        return (
                            <ArtistInfo disableEditing={disableEditing}
                                        key={artistId}
                                        userId={this.props.userId}
                                        artist={artist}
                                        artistId={artistId} /> )
                    })
                }

            </div>
        );
    }
}

export default ArtistsDetails;
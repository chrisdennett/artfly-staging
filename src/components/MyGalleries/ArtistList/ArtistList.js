import React, { Component } from "react";
import _ from 'lodash';

import AddNewArtistForm from '../ArtistAdder/AddNewArtistForm';
import ArtistInfo from './ArtistInfo';

class ArtistList extends Component {
    render() {
        return (
            <div>
                <AddNewArtistForm userId={this.props.userId} galleryId={this.props.galleryId}/>
                <hr />
                {
                    _.map(this.props.artists, (artist, artistId) => {
                        const disableEditing = this.props.artistIdBeingEdited && this.props.artistIdBeingEdited !== artistId;

                        return (
                            <ArtistInfo disableEditing={disableEditing}
                                        key={artistId}
                                        history={this.props.history}
                                        userId={this.props.userId}
                                        galleryId={this.props.galleryId}
                                        galleries={this.props.galleries}
                                        artist={artist}
                                        artistId={artistId} /> )
                    })
                }

            </div>
        );
    }
}

export default ArtistList;
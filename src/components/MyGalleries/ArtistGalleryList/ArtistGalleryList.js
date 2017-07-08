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

                        if(!this.props.artistsArtworkIds[artistId]){
                            return "";
                        }

                        const artistArtworkIds = Object.keys(this.props.artistsArtworkIds[artistId]);

                        return (
                            <ArtistInfo disableEditing={disableEditing}
                                        key={artistId}
                                        artistArtworkIds={artistArtworkIds}
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
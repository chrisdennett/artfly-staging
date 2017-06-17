import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import _ from 'lodash';

class GalleryEntrance extends Component {

    onArtistClick(artistId, event) {
        this.showArtistPictures(artistId)
    }

    showArtistPictures(artistId) {
        //TODO: add filter to list to show only artworks matching artist
    }

    render() {
        const artistList = _.map(this.props.gallery.artists, (artistData, artistId) => {
            return (
                <li key={artistId}>
                    <button onClick={this.onArtistClick.bind(this, artistId)}>{ artistData.name }</button>
                </li>)
        });

        return (
            <div>
                GalleryEntrance:
                <h1>{this.props.gallery.name}</h1>
                <p>Curator: {this.props.gallery.curator}</p>
                <h2>Artists in residence:</h2>
                <ul>
                    {artistList}
                </ul>

                <div className="gallery">
                    {
                        _.map(this.props.gallery.artworks, (artworkData, artworkId) => {

                            /*This should only be triggered if I've been mucking around with the database*/
                            if (!artworkData || !artworkData.artist || !this.props.gallery.artists[artworkData.artist]) {
                                return <div key={artworkId}>Can't find artwork: {artworkId}</div>
                            }

                            const artistName = this.props.gallery.artists[artworkData.artist].name;
                            const dateAdded = new Date(artworkData.dateAdded).toDateString(); // TODO: when these are proper dates, convert to string
                            const imgUrl = `https://res.cloudinary.com/artfly/image/fetch/w_150,h_150/${encodeURIComponent(artworkData.url)}`;

                            return (
                                <div key={artworkId}>
                                    <Link to={`${this.props.galleryId}/artwork/${artworkId}`}>
                                        <img
                                            src={imgUrl}
                                            alt={`artwork by user`}/>
                                        <p>By {artistName}</p>
                                        <p>{dateAdded}</p>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
};

export default GalleryEntrance;
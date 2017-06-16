import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchGallery, fetchArtworks } from './GalleryActions';

class Gallery extends Component {

    componentDidMount() {
        const { galleryId } = this.props.match.params;
        this.props.fetchGallery(galleryId);
    }

    onArtistClick(artistId, event) {
        this.showArtistPictures(artistId)
    }

    showArtistPictures(artistId) {
        //TODO: add filter to list to show only artworks matching artist
        /*this.props.fetchArtworkKeys(artistId, () => {
            this.props.fetchArtworks(this.props.currentArtworkKeys);
        });*/
    }

    render() {
        if (!this.props.gallery) {
            return (<h1>Add your first gallery</h1>)
        }

        if (!this.props.gallery.artists) {
            return <h1>Looks like you've got a gallery with no artists!</h1>
        }

        const artistList = _.map(this.props.gallery.artists, (artistData, artistId) => {
            return (
                <li key={artistId}>
                    <button onClick={this.onArtistClick.bind(this, artistId)}>{ artistData.name }</button>
                </li>)
        });

        return (
            <div>
                <h1>{this.props.gallery.name}</h1>
                <p>Curator: {this.props.gallery.curator}</p>
                <h2>Artists in residence:</h2>
                <ul>
                    {artistList}
                </ul>

                <div className="gallery">
                    {
                        _.map(this.props.currentArtworks, (artworkData, artworkId) => {

                            /*This should only be triggered if I've been mucking around with the database*/
                            if (!artworkData || !artworkData.artist || !this.props.gallery.artists[artworkData.artist]) {
                                return <div key={artworkId}>Can't find artwork: {artworkId}</div>
                            }

                            const artistName = this.props.gallery.artists[artworkData.artist].name;
                            const dateAdded = new Date(artworkData.dateAdded).toDateString(); // TODO: when these are proper dates, convert to string
                            const imgUrl = `https://res.cloudinary.com/artfly/image/fetch/w_150,h_150/${encodeURIComponent(artworkData.url)}`;

                            return (
                                <div key={artworkId}>
                                    <Link to={`/artwork/${artworkId}`}>
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
        );
    }
}

/*

 {/*<div className="responsive" key={artworkId}>
 <div className="img">
 <Link to={`/artwork/${artworkId}`}>
 <Image publicId={artworkData.url}  secure="true">
 <Transformation
 crop="fit"
 width="300"
 height="300"
 responsive_placeholder="blank"
 />
 </Image>
 </Link>
 <div className="desc">
 Artist {artistName}</div>
 <div className="desc">Created at {dateAdded}</div>
 </div>
 </div>
 */

function mapStateToProps(state) {
    return {
        gallery: state.gallery,
        currentArtworks: state.currentArtworks
    }
}

export default connect(
    mapStateToProps,
    { fetchGallery, fetchArtworks }
)(Gallery);
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import _ from 'lodash';

import AddNewAristForm from './AddNewArtistForm';
import { fetchUserAuth, fetchUser, fetchArtists, fetchArtworks, fetchArtworkKeys } from '../actions';

class MyGallery extends Component {

    onArtistClick(artistId, event) {
        this.showArtistPictures(artistId)
    }

    showArtistPictures(artistId) {
        this.props.fetchArtworkKeys(artistId, () => {
            this.props.fetchArtworks(this.props.currentArtworkKeys);
        });
    }

    render() {
        if (!this.props.userAuth || !this.props.user) {
            return (<Redirect to="/"/>)
        }

        if (!this.props.userArtists) {
            return (<h1>Add your first gallery</h1>)
        }

        const artistList = _.map(this.props.userArtists, (artistData, artistId) => {
            return (
                <li key={artistId}>
                    <button onClick={this.onArtistClick.bind(this, artistId)}>{ artistData.name }</button>
                </li>)
        });

        return (
            <div>
                <h1>{this.props.user.galleryName}</h1>
                <p>Curator: {this.props.user.username}</p>
                <h2>Artists in residence:</h2>
                <AddNewAristForm userId={this.props.userAuth.uid}/>
                <ul>
                    {artistList}
                </ul>

                <div className="gallery">
                    {
                        _.map(this.props.currentArtworks, (artworkData, artworkId) => {

                            /*This should only be triggered if I've been mucking around with the database*/
                            if(!artworkData || !artworkData.artist || !this.props.userArtists[artworkData.artist]){
                                return <div key={artworkId}>Can't find artwork: {artworkId}</div>
                            }

                            const artistName = this.props.userArtists[artworkData.artist].name;
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
        userAuth: state.userAuth,
        user: state.user,
        userArtists: state.userArtists,
        currentArtworkKeys: state.currentArtworkKeys,
        currentArtworks: state.currentArtworks
    }
}

export default connect(
    mapStateToProps,
    { fetchUserAuth, fetchUser, fetchArtists, fetchArtworks, fetchArtworkKeys }
)(MyGallery);
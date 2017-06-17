import React, { Component } from "react";
import { connect } from 'react-redux';


import Artwork from './Artwork/Artwork';
import GalleryEntrance from './GalleryEntrance';
import { fetchGallery } from './GalleryActions';

class Gallery extends Component {

    componentDidMount() {
        const { galleryId } = this.props.match.params;
        this.props.fetchGallery(galleryId);
    }

    render() {
        const { galleryId, artworkId } = this.props.match.params;

        if (artworkId) {
            if (this.props.gallery &&
                this.props.gallery.artworks &&
                this.props.gallery.artworks[artworkId]) {

                return <Artwork artwork={this.props.gallery.artworks[artworkId]}/>
            }
            else {
                return <div>Loading currentArtwork...</div>
            }
        }

        if (!this.props.gallery) {
            return (<h1>Add your first gallery</h1>)
        }

        if (!this.props.gallery.artists) {
            return <h1>Looks like you've got a gallery with no artists!</h1>
        }

        return (
            <GalleryEntrance galleryId={galleryId} {...this.props} />

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
        gallery: state.gallery
    }
}

export default connect(
    mapStateToProps,
    { fetchGallery }
)(Gallery);
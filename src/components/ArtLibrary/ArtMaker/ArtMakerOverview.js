import React, { Component } from "react";
// components
import history from '../../global/history';

class ArtMakerOverview extends Component {

    render() {
        const { isJustAdded, artist, artwork, artworkId } = this.props;

        return (
            <div>
                <h5>Artwork summary screen</h5>
                {isJustAdded &&
                <p>Artwork saved.</p>
                }
                <button onClick={() => {history.push(`/gallery/${artist.artistId}/artwork/${artworkId}`)}}>Open
                    artwork
                    in gallery
                </button>
                <img src={artwork.thumb_url} alt={'user artwork thumb'}/>
                <button onClick={() => history.push(`/artStudio/${artworkId}/editPhoto`)}>Edit Photo</button>

                <div>
                    <p>Artwork by {artist.firstName} {artist.lastName}</p>
                    <button onClick={() => history.push(`/artStudio/${artworkId}/editArtist`)}>edit artist</button>
                </div>

                <button>Delete Artwork</button>
            </div>
        );
    }
}

export default ArtMakerOverview;
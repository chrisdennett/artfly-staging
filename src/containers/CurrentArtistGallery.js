import { connect } from 'react-redux';
import ArtistGallery from '../components/Gallery/ArtistGallery';

/*
Gathers all the data needed for the gallery and combines it.
I'm unsure if combining it is preferable to returning several properties e.g.:
{
    gallery: getCurrentGallery,
    artist: getGalleryArtist,
    artworks getGalleryArtworks
}
*/

const getCurrentGallery = (currentGalleryId, galleries, artists, artistsArtworkIds, artworks) => {
    let gallery = { name: "", status: "loading" };
    let galleryArtist = { name: "", status: "loading" };
    let galleryArtworks = [];

    if (galleries[currentGalleryId]) {
        gallery = galleries[currentGalleryId];

        const artistId = Object.keys(gallery.artistIds)[0];
        if (artists[artistId]) {
            galleryArtist = artists[artistId];

            if(artistsArtworkIds[artistId]){
                const artworkIds = artistsArtworkIds[artistId];

                for(let id of artworkIds){
                    if(artworks[id]){
                        galleryArtworks.push(artworks[id]);
                    }
                }
            }
        }
    }
    gallery.artist = galleryArtist;
    gallery.artworks = galleryArtworks;

    return gallery;
};

const mapStateToProps = (state, ownProps) => {
    const { galleryId } = ownProps.match.params;
    return {
        gallery: getCurrentGallery(galleryId, state.galleries, state.artists, state.artistsArtworkIds, state.artworks)
    }
};

const CurrentArtistGallery = connect(
    mapStateToProps
)(ArtistGallery);

export default CurrentArtistGallery;


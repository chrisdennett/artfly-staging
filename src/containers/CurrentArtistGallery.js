import { connect } from 'react-redux';
import ArtistGallery from '../components/Gallery/ArtistGallery';

const getCurrentGallery = (currentGalleryId, galleries, artists) => {
    let galleryData = { name: "", status: "loading" };
    let artistData = { name: "", status: "loading" };

    if (galleries[currentGalleryId]) {
        galleryData = galleries[currentGalleryId];

        const artistId = Object.keys(galleryData.artistIds)[0];
        if (artists[artistId]) {
            artistData = artists[artistId];

        }
    }
    galleryData.artist = artistData;

    return galleryData;
};

const mapStateToProps = (state, ownProps) => {
    const { galleryId } = ownProps.match.params;
    return {
        gallery: getCurrentGallery(galleryId, state.galleries, state.artists, state.artworks,)
    }
};

const CurrentArtistGallery = connect(
    mapStateToProps
)(ArtistGallery);

export default CurrentArtistGallery;


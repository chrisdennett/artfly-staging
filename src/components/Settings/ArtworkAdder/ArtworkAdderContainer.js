import { connect } from 'react-redux';

import { uploadImage } from './ArtworkAdderActions';

import ArtworkAdder from './ArtworkAdder';

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    const { uid, artistGalleryIds, galleryId } = state.user;
    let artistId;
    if (artistGalleryIds) {
        if (galleryId) {
            artistId = galleryId;
        }
        else {
            artistId = Object.keys(artistGalleryIds)[0]
        }
    }

    return {
        userId: uid,
        artistId: artistId,
        history: ownProps.history,
        uploadInfo: state.imageUploader[artistId],
        uploadImage: uploadImage
    }
};

const ArtworkAdderContainer = connect(
    mapStateToProps, { uploadImage }
)(ArtworkAdder);

export default ArtworkAdderContainer;

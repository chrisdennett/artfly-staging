/*
import React from 'react';
import { connect } from 'react-redux';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import { addDerivedArtwork } from "../../actions/SaveArtworkActions";

const DerivedArtworkAdder = ({ sourceArtwork, children, addDerivedArtwork, UpdateUrl, galleryId }) => {

    const path = (newArtworkId, currentGalleryId) => {
        return `/artworkEditor/galleryId_${currentGalleryId}_galleryId/artworkId_${newArtworkId}_artworkId`;
    };

    const onAddDerivedArtwork = () => {
        const { largeUrl } = sourceArtwork;
        const cropData = {bottomPercent: 1, leftPercent: 0, rightPercent: 1, topPercent: 0};
        const newArtworkData = { ...sourceArtwork, sourceUrl: largeUrl, orientation:1, cropData };

        addDerivedArtwork(newArtworkData, (newArtworkId) => {
            UpdateUrl(path(newArtworkId, galleryId));
        })
    };

    return (
        <div onClick={() => onAddDerivedArtwork()}>
            {children}
        </div>
    )
};

export default connect(null, { addDerivedArtwork, UpdateUrl })(DerivedArtworkAdder);*/

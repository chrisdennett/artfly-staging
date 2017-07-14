import React from "react";
import { Link } from 'react-router-dom'

const GalleryControls = function (props) {
    const { artworkId, galleryId, nextArtworkId, prevArtworkId } = props;

    let prevPath = `/gallery/${galleryId}/artwork/${prevArtworkId}`;
    let nextPath = `/gallery/${galleryId}/artwork/${nextArtworkId}`;

    let nextButtonLabel = 'next';
    let prevButtonLabel = 'prev';
    let prevButtonStyles = {};
    let nextButtonStyles = {};
    let galleryButtonStyles = {};

    if (!galleryId) {
        // only show the next a previous controls inside a gallery
        prevButtonStyles.display = 'none';
        nextButtonStyles.display = 'none';
    }
    else if (!artworkId) {
        nextButtonLabel = "Enter >";
        prevButtonStyles.display = 'none';
    }
    else {
        if (!nextArtworkId) {
            nextButtonLabel = 'exit >';
            nextPath = `/gallery/${galleryId}`;
        }
        if (!prevArtworkId) {
            prevButtonLabel = '< entrance';
            prevPath = `/gallery/${galleryId}`;
        }
    }

    if (!galleryId) {
        galleryButtonStyles.display = 'none';
    }

    return (
        <div className="controls-block">
            <Link to={`/gallery/${galleryId}`}>Gallery Home</Link>
            <Link to={prevPath}>{prevButtonLabel}</Link>
            <Link to={nextPath}>{nextButtonLabel}</Link>
        </div>
    )
};

export default GalleryControls;
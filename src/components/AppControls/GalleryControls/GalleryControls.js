import React from "react";
import { Link } from 'react-router-dom'
import GalleryButton from "./assets/GalleryButton";
import PrevButton from "./assets/PrevButton";
import NextButton from "./assets/NextButton";

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
        nextButtonLabel = "enter";
        prevButtonStyles.display = 'none';
    }
    else {
        if (!nextArtworkId) {
            nextButtonLabel = 'exit';
            nextPath = `/gallery/${galleryId}`;
        }
        if (!prevArtworkId) {
            prevButtonLabel = 'exit';
            prevPath = `/gallery/${galleryId}`;
        }
    }

    if (!galleryId) {
        galleryButtonStyles.display = 'none';
    }

    return (
        <div className="controls-block">
            <Link to={`/gallery/${galleryId}`}><GalleryButton/></Link>
            {/*<Link to={prevPath}>{prevButtonLabel}</Link>*/}
            <Link to={prevPath}><PrevButton label={prevButtonLabel}/></Link>
            {/*<Link to={nextPath}>{nextButtonLabel}</Link>*/}
            <Link to={nextPath}><NextButton label={nextButtonLabel}/></Link>
        </div>
    )
};

export default GalleryControls;
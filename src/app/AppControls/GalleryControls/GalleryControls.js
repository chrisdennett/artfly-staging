import React from "react";

import GalleryButton from "./assets/GalleryButton";
import PrevButton from "./assets/PrevButton";
import NextButton from "./assets/NextButton";
import ZoomButton from "./assets/ZoomButton";
import EnterGalleryButton from "./assets/EnterGalleryButton";
import Link from "../../global/Link";

const GalleryControls = function (props) {
    const { artworkId, galleryId, nextArtworkId, prevArtworkId, galleryIsZoomedOut } = props;

    const onGalleryPage = !artworkId;
    let prevPath = `/gallery/${galleryId}/artwork/${prevArtworkId}`;
    let nextPath = `/gallery/${galleryId}/artwork/${nextArtworkId}`;
    let nextButtonLabel = 'next';
    let prevButtonLabel = 'prev';
    let controls = [];

    if (onGalleryPage) {
        controls.push([
            <ZoomButton key={1} onClick={props.onZoomClick} isZoomedOut={galleryIsZoomedOut}/>,
            <EnterGalleryButton key={2} linkTo={nextPath}/>
        ]);
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

        controls.push([
            <Link key={3} linkTo={`/gallery/${galleryId}`}><GalleryButton/></Link>,
            <Link key={4} linkTo={prevPath}><PrevButton label={prevButtonLabel}/></Link>,
            <Link key={5} linkTo={nextPath}><NextButton label={nextButtonLabel}/></Link>]
        );
    }

    return (
        <div className='appControls--galleryControls'>
            {controls}
        </div>
    )
};

export default GalleryControls;
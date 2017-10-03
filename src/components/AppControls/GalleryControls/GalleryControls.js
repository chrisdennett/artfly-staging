import React from "react";
import { Link } from 'react-router-dom'
import GalleryButton from "./assets/GalleryButton";
import PrevButton from "./assets/PrevButton";
import NextButton from "./assets/NextButton";
import Butt from "../../global/Butt";
import LinkButt from "../../global/LinkButt";

const GalleryControls = function (props) {
    const { artworkId, galleryId, nextArtworkId, prevArtworkId, galleryIsZoomedOut } = props;

    // const currentPath = props.history.location.pathname;
    const onGalleryPage = !artworkId;

    let prevPath = `/gallery/${galleryId}/artwork/${prevArtworkId}`;
    let nextPath = `/gallery/${galleryId}/artwork/${nextArtworkId}`;

    let nextButtonLabel = 'next';
    let prevButtonLabel = 'prev';

    let controls = [];

    if (onGalleryPage) {
        nextButtonLabel = "enter";
        controls.push([
            <Butt key={1} onClick={props.onZoomClick} label={galleryIsZoomedOut ? 'zoom in' : 'zoom out'} />,
            <LinkButt key={2} linkTo={nextPath} label={nextButtonLabel}/>
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
            <Link key={3} to={`/gallery/${galleryId}`}><GalleryButton/></Link>,
            <Link key={4} to={prevPath}><PrevButton label={prevButtonLabel}/></Link>,
            <Link key={5} to={nextPath}><NextButton label={nextButtonLabel}/></Link>]
        );
    }

    return (
        <div className="controls-block">
            {controls}
        </div>
    )
};

export default GalleryControls;
import React from "react";
import { Link } from 'react-router-dom'
import GalleryButton from "./assets/GalleryButton";
import PrevButton from "./assets/PrevButton";
import NextButton from "./assets/NextButton";
import ZoomButton from "./assets/ZoomButton";
import EnterGalleryButton from "./assets/EnterGalleryButton";

const GalleryControls = function (props) {
    const { artworkId, galleryId, nextArtworkId, prevArtworkId, galleryIsZoomedOut } = props;

    const onGalleryPage = !artworkId;
    let prevPath = `/gallery/${galleryId}/artwork/${prevArtworkId}`;
    let nextPath = `/gallery/${galleryId}/artwork/${nextArtworkId}`;
    let nextButtonLabel = 'next';
    let prevButtonLabel = 'prev';
    let controls = [];

    const controlBlockStyle = {
        margin: 'auto',
        width: onGalleryPage ? 200 : 250,
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '10px 10px 0 0',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center'
    };

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
            <Link key={3} to={`/gallery/${galleryId}`}><GalleryButton/></Link>,
            <Link key={4} to={prevPath}><PrevButton label={prevButtonLabel}/></Link>,
            <Link key={5} to={nextPath}><NextButton label={nextButtonLabel}/></Link>]
        );
    }

    return (
            <div style={controlBlockStyle}>
                {controls}
            </div>
    )
};

export default GalleryControls;
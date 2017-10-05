import React from 'react';
import { Link } from 'react-router-dom';

import UserControlsContainer from './UserControls/UserControlsContainer';
import GalleryControlsContainer from './GalleryControls/GalleryControlsContainer';
import HomeButton from "./Logo";
// import GalleryControlsSplat from "./GalleryControls/assets/GalleryControlsSplat";

const AppControls = function ({ history, match }) {
    const { galleryId, artworkId } = match.params;

    return (
        <div>
            <div style={{ position: 'fixed', top: 0, zIndex: 1001 }}>
                <Link to="/">
                    <HomeButton/>
                </Link>
            </div>

            <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1002 }}>
                <UserControlsContainer history={history} galleryId={galleryId} artworkId={artworkId}/>
            </div>

            {galleryId &&
            <div>
                {/*<div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1003 }}>
                    <GalleryControlsSplat/>
                </div>*/}
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1004 }}>
                    <GalleryControlsContainer history={history} galleryId={galleryId} artworkId={artworkId}/>
                </div>
            </div>
            }
        </div>
    )
};

export default AppControls;
// externals
import React from 'react';
// components
import UserControlsContainer from './UserControls/UserControlsContainer';
import GalleryControlsContainer from './GalleryControls/GalleryControlsContainer';
import HomeButton from "./Logo";
import Link from "../global/Link";

const AppControls = function ({ galleryId, artworkId, user }) {

    return (
        <div>
            <div style={{ position: 'fixed', top: 0, zIndex: 1001 }}>
                <Link linkTo={'/'}><HomeButton/></Link>
            </div>

            <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1002 }}>
                <UserControlsContainer galleryId={galleryId} artworkId={artworkId}/>
            </div>

            {galleryId &&
            <div>
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1004 }}>
                    <GalleryControlsContainer galleryId={galleryId} artworkId={artworkId}/>
                </div>
            </div>
            }
        </div>
    )
};

export default AppControls;
// externals
import React from 'react';
// components
import UserControlsContainer from './UserControls/UserControlsContainer';
import GalleryControlsContainer from './GalleryControls/GalleryControlsContainer';
import Link from "../global/Link";
import IconButt from "../global/IconButt";

const AppControls = function ({ galleryId, artworkId, user }) {

    const userId = user.uid;

    return (
        <div>
            <div style={{ position: 'fixed', top: 5, left:10, zIndex: 1001 }}>
                <Link linkTo={'/'}><IconButt icon={'home'} label={'home'} /></Link>
            </div>

            <div style={{ position: 'fixed', top: 5, right: 10, zIndex: 1002 }}>
                <UserControlsContainer galleryId={galleryId} artworkId={artworkId}/>
            </div>

            {galleryId &&
            <GalleryControlsContainer galleryId={galleryId} artworkId={artworkId} userId={userId}/>
            }
        </div>
    )
};

export default AppControls;
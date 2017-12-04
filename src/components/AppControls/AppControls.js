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

            <Link linkTo={'/'}>
                <IconButt icon={'home'}
                          stroke={'hsl(250,28%,30%)'}
                          fill={'hsl(250,98%,80%)'}
                          label={'home'}/>
            </Link>

            <UserControlsContainer galleryId={galleryId}
                                   artworkId={artworkId}/>

            {galleryId &&
            <GalleryControlsContainer galleryId={galleryId}
                                      artworkId={artworkId}
                                      userId={userId}/>
            }

        </div>
    )
};

export default AppControls;

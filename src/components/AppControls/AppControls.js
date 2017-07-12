import React from 'react';

import UserControls from './UserControls/UserControls';
import GalleryControls from './GalleryControls/GalleryControls';

const AppControls = function ({ user, galleryId, artworkId, history, artworkIds }) {
    return (
        <div>
            <GalleryControls history={history}
                             artworkIds={artworkIds}
                             galleryId={galleryId}
                             artworkId={artworkId}/>

            <UserControls user={user}
                          galleryId={galleryId}
                          artworkId={artworkId}/>
        </div>
    )
};

export default AppControls;
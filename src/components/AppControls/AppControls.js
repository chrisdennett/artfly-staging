import React from 'react';
import { Link } from 'react-router-dom';

import UserControlsContainer from './UserControls/UserControlsContainer';
import GalleryControlsContainer from './GalleryControls/GalleryControlsContainer';

const AppControls = function ({ history, match }) {
    const { galleryId, artworkId } = match.params;

    return (
        <div>
            <div style={{ position: 'fixed', top:0, zIndex: 1001 }}>
                <div className="controls-block"><Link to="/">home</Link></div>
            </div>

            <div style={{ position: 'fixed', top:0, right:0, zIndex: 1002 }}>
                <UserControlsContainer history={history} galleryId={galleryId} artworkId={artworkId}/>
            </div>

            {galleryId &&
            <div style={{ position: 'fixed', bottom:0, right:0, zIndex: 1000 }}>
                <GalleryControlsContainer history={history} galleryId={galleryId} artworkId={artworkId}/>
            </div>
            }
        </div>
    )
};

export default AppControls;
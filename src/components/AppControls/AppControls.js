import React from 'react';
import { Link } from 'react-router-dom';

import UserControlsContainer from './UserControls/UserControlsContainer';
import GalleryControlsContainer from './GalleryControls/GalleryControlsContainer';

const AppControls = function ({ history, match }) {
    const { galleryId, artworkId } = match.params;
    /*const deployToLive = false;

    if(deployToLive){
        return null;
    }*/

    return (
        <div>
            <div className="controls-block"><Link to="/">home</Link></div>
            <UserControlsContainer history={history} galleryId={galleryId} artworkId={artworkId}/>

            {galleryId &&
            <GalleryControlsContainer history={history} galleryId={galleryId} artworkId={artworkId}/>
            }
        </div>
    )
};

export default AppControls;
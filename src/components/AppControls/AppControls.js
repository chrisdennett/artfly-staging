// externals
import React from 'react';
import styled from 'styled-components';
// components
import UserControlsContainer from './UserControls/UserControlsContainer';
import GalleryControlsContainer from './GalleryControls/GalleryControlsContainer';
import Link from "../global/Link";
import IconButt from "../global/IconButt";

const AppControls = function ({ galleryId, artworkId, user }) {

    const userId = user.uid;

    return (
        <ControlPanel>

            <Link linkTo={'/'}><IconButt icon={'home'} stroke={'hsl(250,28%,30%)'} fill={'hsl(250,98%,80%)'} label={'home'}/></Link>

            <UserControlsContainer galleryId={galleryId} artworkId={artworkId}/>

            {galleryId &&
            <GalleryControlsContainer galleryId={galleryId} artworkId={artworkId} userId={userId}/>
            }

        </ControlPanel>
    )
};

export default AppControls;

//background-color:  hsl(250,78%,70%);

const ControlPanel = styled.div`
    position: fixed;
    width: 100px;
    background-color: hsl(250,28%,30%);
    border-right: none;
    top: 0;
    color: hsl(250,98%,80%);
    bottom: 0;
`;

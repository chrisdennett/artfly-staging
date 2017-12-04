import React from 'react';
import OverlayLinkButton from "../../../global/OverlayLinkButton";

const EnterGalleryButton = function ({ linkTo }) {

    return (
        <OverlayLinkButton label={'enter'} linkTo={linkTo}>
            <path
                d="M16.33.55l13.12 13.27c1.172 1.185.351 3.239-1.328 3.239h-7.499v10.74a1.88 1.88 0 0 1-1.875 1.895h-7.499a1.88 1.88 0 0 1-1.875-1.895v-10.74H1.875c-1.672 0-2.5-2.045-1.328-3.238L13.677.55a1.876 1.876 0 0 1 2.656 0z"/>
        </OverlayLinkButton>
    )
};

export default EnterGalleryButton;
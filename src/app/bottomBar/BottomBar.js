import React from 'react';
// ui
import { Button } from 'rmwc/Button';
// styles
import './bottomBar_styles.css'


const BottomBar = ({onEnterGallery, disabled}) => {
    return (
        <div className={'bottomBar'}>
            <Button disabled={disabled} outlined onClick={onEnterGallery}>
                Enter
            </Button>
        </div>
    )
};

export default BottomBar;
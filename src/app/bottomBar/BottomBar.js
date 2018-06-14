import React from 'react';
// ui
// import { Icon } from 'rmwc/Icon'
import { Button } from 'rmwc/Button';
// styles
import './bottomBar_styles.css'

const BottomBar = ({onEnterGallery, disabled}) => {
    const buttStyle = {margin:'0 3px'};

    return (
        <div className={'bottomBar'}>
            {/*<Button style={buttStyle} disabled={disabled} onClick={onEnterGallery}>
                <Icon use={'edit'}/>
            </Button>*/}
            <Button style={buttStyle} outlined disabled={disabled} onClick={onEnterGallery}>
                Enter
            </Button>
        </div>
    )
};

export default BottomBar;
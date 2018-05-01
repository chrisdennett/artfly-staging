import React from 'react';
// styles
import './horizontalList_styles.css';

const HorizontalList = function ({children, showScrollBar=false}) {

    const classes = `horizontalList ${showScrollBar ? 'simpleScrollbar' : 'hideScrollBar'}`;

    return (
        <div className={classes}>
            {children}
        </div>
    )
};

export default HorizontalList;
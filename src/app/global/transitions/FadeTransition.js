import React from 'react';
import { CSSTransition } from 'react-transition-group';
// styles
import './transition_styles.css';

const FadeTransition = function ({children, ...props}) {
    const duration = 300;

    return (
        <CSSTransition
            {...props}
            timeout={duration}
            classNames="fade"
        >
            {children}
        </CSSTransition>
    )
};

export default FadeTransition;
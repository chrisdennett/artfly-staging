import React from "react";

const Modal = function ({ children, isOpen }) {

    const backdropStyle = {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: '9998',
        backgroundColor: '#0288D1',
        background: 'radial-gradient(circle, #039BE5, #01579b)',
        overflowX: 'hidden'
    };

    if (isOpen === false) {
        return null;
    }
    else {
        return (
            <div style={backdropStyle}>
                {children}
            </div>
        );
    }
};

export default Modal;
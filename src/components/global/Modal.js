import React from "react";

const Modal = function ({ children, title, isOpen }) {

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column'
    };

    const backdropStyle = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndex: '9998',
        backgroundColor: '#0288D1',
        background: 'radial-gradient(circle, #039BE5, #01579b)'
    };

    if (isOpen === false) {
        return null;
    }
    else {
        return (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    <h1 style={{ color: '#fff', fontSize: 36 }}>{title}</h1>
                    {children}
                </div>
            </div>
        );
    }

};

export default Modal;
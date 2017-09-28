import React from "react";

const Modal = function ({ children, title, isOpen, allowScrolling }) {

    let modalStyle = {
        position: 'absolute',
        zIndex: '9999',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
    };

    if(allowScrolling){
        modalStyle.height = '100%';
    }

    const backdropStyle = {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
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
                <div style={modalStyle}>
                    <h1 style={{ color: '#fff', fontSize: 36 }}>{title}</h1>
                    {children}
                </div>
            </div>
        );
    }
};

export default Modal;
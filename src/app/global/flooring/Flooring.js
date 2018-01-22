import React from 'react';
// styles
import './flooring_styles.css';
import Skirting from "./Skirting";

const Flooring = function ({ children }) {
    return (
        <div className={'flooring'}>
            <Skirting/>
            <div className={'flooring--floorBoards'}>
                {children}
            </div>
        </div>
    )
};

export default Flooring;
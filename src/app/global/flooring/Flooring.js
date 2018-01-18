import React from 'react';
// styles
import './flooring_styles.css';
import Skirting from "./Skirting";
import CrossSection from "./CrossSection";

const Flooring = function ({ children }) {
    return (
        <div className={'flooring'}>
            <Skirting/>
            <div className={'flooring--floorBoards'}>
                {children}
            </div>
            {/*<CrossSection />*/}
        </div>
    )
};

export default Flooring;
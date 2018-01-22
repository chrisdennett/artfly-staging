import React from 'react';
// styles
import './footer_styles.css';
// comps
import Flooring from "../../global/flooring/Flooring";

const Footer = function () {
    return (
        <Flooring>
            <h3>About us</h3>
            <div className='home--footer--p'>
                ArtFly is a massive global corporate monster run by the high-powered business types below from
                the sprawling metropolis of Ulverson, Cumbria, UK.
            </div>
            <div className='home--footer--personTile'>
                Chris
            </div>
            <div className='home--footer--personTile'>
                Jennie
            </div>
            <div className='home--footer--personTile'>
                Holly
            </div>
            <div className='home--footer--personTile'>
                Dot
            </div>
            <div className='home--footer--personTile'>
                Stitch
            </div>
        </Flooring>
    )
};

export default Footer;
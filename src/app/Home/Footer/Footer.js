import React from 'react';
// styles
import './footer_styles.css';
// comps
import Flooring from "../../global/flooring/Flooring";

const Footer = function () {

    return (
        <Flooring>
            <div className={'footer'}>
                <div className={'footer--content'}>

                    <h3>About us</h3>
                    <div className={'footer--intro'}>
                        <p>Based in the sprawling metropolis of Ulverston, Cumbria, UK.</p>
                        <p>ArtFly is a massive corporate monster run by these high-powered business types:</p>
                    </div>
                    <div className='footer--personTiles'>
                        <div className='footer--personTile'>
                            <img src={'./images/about-us/chris_100.png'} alt={'Chris'}/>
                            <p className='footer--personTile--name'>
                                Chris
                            </p>
                            <p className='footer--personTile--role'>
                                Head of hair
                            </p>

                        </div>
                        <div className='footer--personTile'>
                            <img src={'./images/about-us/jennie_100.png'} alt={'Jennie'}/>
                            <p className='footer--personTile--name'>
                                Jennie
                            </p>
                            <p className='footer--personTile--role'>
                                Big Cheese (hat)
                            </p>
                        </div>
                        <div className='footer--personTile'>
                            <img src={'./images/about-us/holly_100.png'} alt={'Holly'}/>
                            <p className='footer--personTile--name'>
                                Holly
                            </p>
                            <p className='footer--personTile--role'>
                                CEO of Hard Stares
                            </p>
                        </div>
                        <div className='footer--personTile'>
                            <img src={'./images/about-us/dot_100.png'} alt={'Dot'}/>
                            <p className='footer--personTile--name'>
                                Dot
                            </p>
                            <p className='footer--personTile--role'>
                                Spells and Potions
                            </p>
                        </div>
                        <div className='footer--personTile'>
                            <img src={'./images/about-us/stitch_100.png'} alt={'Stitch'}/>
                            <p className='footer--personTile--name'>
                                Stitch
                            </p>
                            <p className='footer--personTile--role'>
                                Boss
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Flooring>
    )
};

export default Footer;
import React from 'react';
// styles
import './footer_styles.css';
// images
import chrisPic from './../../images/chris_150.png';
import jenniePic from './../../images/jennie_150.png';
import hollyPic from './../../images/holly_150.png';
import dotPic from './../../images/dot_150.png';
import stitchPic from './../../images/stitch_150.png';
// comps
import Flooring from "../../global/flooring/Flooring";

const Footer = function () {

    const titleColour = '#68482c';

    return (
        <Flooring>
            <div className={'footer'}>

                <svg width="276" height="52" viewBox="0 0 46 7">
                    <g color="#000">
                        <path
                            d="M6.23 4.3H5.7L5.344 0H2.437l-.223.977h.31L.741 4.3H.227L0 5.29h2.407l.227-.991h-.591l.277-.515h1.552l.04.515h-.718l-.227.991h3.036zM3.675 1.242L3.8 2.877H2.81zM9.115 5.292c1.461 0 2.167-.47 2.411-1.537.168-.734-.194-1.136-.705-1.287.62-.227.865-.537 1.01-1.173C12.021.47 11.53 0 10.273 0H7.45l-.223.977h.439l-.763 3.33h-.439l-.225.985zm-.04-.984H8.47L8.77 2.99h.583c.417 0 .572.28.484.666-.094.409-.445.651-.763.651zM9.704 1c.288 0 .453.204.373.553-.083.363-.247.582-.648.582h-.462L9.227 1zM14.2 5.292c1.764 0 2.974-.992 3.346-2.617C17.916 1.057 17.269 0 15.357 0c-1.615 0-2.984 1.071-3.34 2.624-.411 1.797.552 2.667 2.183 2.667zm.258-1.129c-.499 0-.73-.597-.514-1.539.204-.891.677-1.524 1.151-1.517.601 0 .7.697.5 1.567-.204.892-.645 1.488-1.137 1.488zM18.18.96h.414l-.418 1.826c-.384 1.678.235 2.46 1.718 2.505 1.389 0 2.302-.791 2.703-2.542l.411-1.796h.4l.217-.954h-2.188l-.223.976h.4l-.36 1.567c-.29 1.271-.627 1.449-1.077 1.449-.473 0-.682-.251-.41-1.441l.366-1.596h.399l.218-.953H18.4zM23.86 0l-.45 1.968h1.112l.222-.969h.651l-.752 3.286h-.62l-.231 1.007h2.816l.23-1.007h-.628l.752-3.286h.636l-.222.969h1.113L28.94 0zM31.57.96h.414l-.418 1.826c-.384 1.678.235 2.46 1.718 2.505 1.389 0 2.302-.791 2.703-2.542l.411-1.796h.4l.217-.954h-2.188l-.223.976h.4l-.36 1.567c-.29 1.271-.627 1.449-1.077 1.449-.473 0-.682-.251-.41-1.441l.366-1.596h.399l.218-.953h-2.35zM37.27 5.183l.207-.557c.2.326.628.665 1.359.665.86 0 2.008-.404 2.267-1.533.389-1.698-2.514-1.524-2.343-2.27.058-.252.377-.383.586-.383.506 0 .856.304.734.839h1.308L41.803.13H40.56l-.211.607C40.184.195 39.614 0 39.007 0c-.709 0-1.831.484-2.076 1.554-.422 1.843 2.409 1.605 2.28 2.169-.07.303-.444.361-.697.361-.3-.014-.885-.115-.746-.723h-1.345l-.417 1.822z"
                            fill={titleColour} opacity={'0.6'} stroke={'#000000'} strokeWidth={0.2}/>
                        <path
                            d="M6.969 5.684h-.53l2.847 1.702H6.38l-.95-.387h.31L1.48 5.686H.966L0 5.292h2.407l.966.393h-.59l.66.203h1.551l-.342-.204h-.719l-.966-.392h3.036zm-.277 1.21l-1.093-.647h-.992zM9.115 5.292c1.461 0 2.516.186 3.556.608.715.29.652.45.254.51.789.09 1.265.212 1.885.464.803.327.662.512-.594.512h-2.824L10.44 7h.439L7.636 5.682h-.44l-.958-.39zm.693.39h-.605l1.283.52h.583c.416 0 .363-.11-.013-.263a3.811 3.811 0 0 0-1.247-.258zm3.093 1.308c.288 0 .301-.08-.038-.218a2.74 2.74 0 0 0-1.082-.23h-.462l1.106.449zM14.2 5.292c1.764 0 3.713.393 5.295 1.036 1.575.64 1.715 1.058-.197 1.058-1.615 0-3.782-.424-5.294-1.039-1.75-.711-1.435-1.056.196-1.056zm1.099.447c-.5 0-.285.236.632.609.868.352 1.812.603 2.281.6.601 0 .18-.276-.668-.62-.868-.353-1.754-.59-2.245-.59zM21.4 7.006h.414l-1.778-.722c-1.634-.664-1.598-.974-.149-.992 1.39 0 2.891.313 4.597 1.006l1.75.71h.398l.929.378h-2.188L24.423 7h.399l-1.526-.62c-1.238-.503-1.706-.573-2.157-.573-.473 0-.495.099.664.57l1.555.632h.4l.928.377h-2.35zM27.8 7.386l-1.917-.779h1.113l.944.384h.65l-3.198-1.3h-.621l-.98-.399h2.815l.98.399h-.628l3.2 1.3h.635l-.943-.384h1.113l1.917.779zM34.8 7.006h.414l-1.778-.722c-1.634-.664-1.598-.974-.149-.992 1.39 0 2.891.313 4.597 1.006l1.75.71h.398l.929.378h-2.188L37.823 7h.399l-1.526-.62c-1.238-.503-1.706-.573-2.157-.573-.473 0-.495.099.664.57l1.555.632h.4l.928.377h-2.35zM37.35 5.335l.622.22c-.042-.128.133-.263.863-.263.86 0 2.31.16 3.408.607 1.654.672-1.377.603-.652.898.246.1.662.152.871.152.506 0 .63-.12.11-.332h1.307l1.767.718h-1.243l-.663-.24c.238.214-.186.291-.793.291-.709 0-2.192-.192-3.234-.615-1.795-.73 1.213-.635.664-.858-.296-.12-.714-.143-.967-.143-.29.006-.798.046-.207.286h-1.345l-1.773-.721z"
                            opacity="0.4"/>
                    </g>
                </svg>


                <div className={'footer--content'}>


                    {/*<h3>About us</h3>*/}
                    <div className={'footer--intro'}>
                        <p>ArtFly is a massive corporate monster run by the high-powered business types below.</p>
                            <p>Based in the sprawling metropolis of Ulverston, Cumbria, UK.</p>
                    </div>
                    <div className='footer--personTiles'>
                        <div className='footer--personTile'>
                            <img width={150} height={150} src={chrisPic} alt={'Chris'}/>
                            <p className='footer--personTile--name'>
                                Chris
                            </p>
                            <p className='footer--personTile--role'>
                                Head of hair
                            </p>

                        </div>
                        <div className='footer--personTile'>
                            <img src={jenniePic} alt={'Chris'}/>
                            <p className='footer--personTile--name'>
                                Jennie
                            </p>
                            <p className='footer--personTile--role'>
                                Big Cheese (hat)
                            </p>
                        </div>
                        <div className='footer--personTile'>
                            <img src={hollyPic} alt={'Chris'}/>
                            <p className='footer--personTile--name'>
                                Holly
                            </p>
                            <p className='footer--personTile--role'>
                                CEO of Hard Stares
                            </p>
                        </div>
                        <div className='footer--personTile'>
                            <img src={dotPic} alt={'Chris'}/>
                            <p className='footer--personTile--name'>
                                Dot
                            </p>
                            <p className='footer--personTile--role'>
                                Spells and Potions
                            </p>
                        </div>
                        <div className='footer--personTile'>
                            <img src={stitchPic} alt={'Chris'}/>
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
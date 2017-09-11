import React, { Component } from 'react';
import Cloud from "./Cloud";
import Sun from "./Sun";
import Ground from "./Ground";


class SvgBackground extends Component {




    render() {
        const {galleryHeight, pageWidth} = this.props;
        const fullHeight = galleryHeight + 100;
        const groundY = galleryHeight - 250;
        const groundWidth = 2350; /*copied from InkScape property*/
        const groundX = 0 - ((groundWidth - pageWidth) / 2);

        return (
            <div className={'gallery-background'}>
                <svg ref='bg' width={pageWidth} height={fullHeight}>

                    <rect id="sky" ry="0" height={fullHeight} width={pageWidth} fill="#afdde9"/>

                    <Sun x={50} y={50}/>

                    <Cloud x={400} y={400}/>
                    <Cloud x={1500} y={300}/>

                    <Ground y={groundY} x={groundX}/>

                </svg>

            </div>
        );
    }
}

export default SvgBackground;
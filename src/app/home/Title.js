import React from 'react';
import HoverLogo from "./animatedIcons/HoverLogo";

const Title = function () {
    return (
        <div className={'home--title'}>

            <HoverLogo/>

            <svg className={'home--artflyNameSvg'} viewBox="0 0 399 103">
                <text style={{ textAlign: "center" }} strokeWidth="0" fontFamily="'Source Code Pro'" fontSize="109.7"
                      y="82.714" x="203.309" fontWeight="900" color="#000" textAnchor="middle">
                    <tspan fontSize="110" y="82.714" x="203.309">ArtFly</tspan>
                </text>
                <text style={{ textAlign: "center" }} strokeWidth="3.001" fontFamily="'Source Code Pro'"
                      fontSize="109.7" stroke="#000" y="78.624" x="198.392" fontWeight="900" fill="none" color="#000"
                      textAnchor="middle">
                    <tspan fontSize="110" y="78.624" x="198.392" fontWeight="bold">
                        <tspan fill="red">A</tspan>
                        <tspan fill="#f60">r</tspan>
                        <tspan fill="#fc0">t</tspan>
                        <tspan fill="#abc837">F</tspan>
                        <tspan fill="#37abc8">l</tspan>
                        <tspan fill="#aa00d4">y</tspan>
                    </tspan>
                </text>
            </svg>
        </div>
    )
};

export default Title;
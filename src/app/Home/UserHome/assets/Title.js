import React from 'react';

const Title = function () {
    return (
        <div className={'home--title'}>

            <svg className={'home--artflyLogoSvg'} viewBox="0 0 153 200">
                <g className={'home--artflyLogoSvg--fly'}>
                    <path d="M95.84 147c7.464-.427 15.57-9.89 9.66-20.65-5.727-10.44-14.36-19.27-14.36-19.27-14.85 10.37-7.205 40.93 4.702 39.92z" fill="#fff"  stroke="#000" strokeWidth="3"/>
                    <path d="M145.9 112.8c-5.492 12.88-22.3 21.91-35.24 13.49-12.55-8.164-21.31-20.44-21.31-20.44 22.67-20.91 65.34-19.59 56.55 6.944zM1.523 52.73c.441-7.478 9.914-15.58 20.67-9.68 10.43 5.72 19.27 14.36 19.27 14.36-10.37 14.85-40.92 7.205-39.94-4.681z" fill="#fff"  stroke="#000" strokeWidth="3"/>
                    <path d="M35.8 2.652c-12.88 5.492-21.91 22.3-13.49 35.24 8.164 12.55 20.44 21.31 20.44 21.31 20.91-22.66 19.59-65.34-6.944-56.55z" fill="#fff"  stroke="#000" strokeWidth="3"/>
                    <path d="M123.1 73.5L75.62 26.02l51.26-3.781-1.891 25.63z" fill="#e9ddaf" stroke="#000" strokeWidth="3"/>
                    <path d="M106.2 23.82c7.531 4.244 14.17 10.23 19.24 19.24l1.534-20.77z" fill="red"  stroke="#000" strokeWidth="3"/>
                    <path d="M87.93 40.49c14.05 1.437 19.09 9.899 20.89 20.89l-61.79 61.79-20.89-20.89z" fill="#fc0"  stroke="#000" strokeWidth="3"/>
                    <path d="M73.76 26.32c11.61-1.004 14.52 5.324 14.3 14.3l-61.79 61.79-14.3-14.3zM108.7 61.25c11.61-1.004 14.52 5.324 14.3 14.3l-61.79 61.79-14.3-14.3z" fill="#f60"  stroke="#000" strokeWidth="3"/>
                    <ellipse transform="rotate(45)" cx="84.55" cy="-4.478" rx="20.44" ry="20.7" fill="#fff" stroke="#000" strokeWidth="3"/>
                    <ellipse transform="rotate(45)" cx="84.55" cy="-4.478" rx="9.527" ry="9.646" />
                    <ellipse transform="rotate(45)" cx="125.1" cy="-4.478" rx="20.44" ry="20.7" fill="#fff" stroke="#000" strokeWidth="3"/>
                    <ellipse transform="rotate(45)" cx="125.1" cy="-4.478" rx="9.527" ry="9.646" />
                    <path d="M13.54 111l-3.09-21.47 22.85 5.169 21.74 20.33 4.589 23.54-21.24-3.281z" fill="#e9ddaf"  stroke="#000" strokeWidth="3"/>
                    <ellipse transform="rotate(45)" cx="105.6" cy="56.01" rx="10.24" ry="2.497" fill="red" stroke="#000" strokeWidth="3"/>
                    <ellipse transform="scale(.9535 1.0445) rotate(45)" cx="89.77" cy="-13.09" rx="6.116" ry="6.192" fill="#fff" />
                    <ellipse transform="scale(.9535 1.0445) rotate(45)" cx="130.9" cy="-15" rx="6.116" ry="6.192" fill="#fff" />
                </g>
                <rect className={'home--artflyLogoSvg--shadow'} ry="7.971" />
            </svg>

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
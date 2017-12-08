import React from 'react';

const IconLogo = ({ width = 42, height = 42, fill = 'rgba(0,0,0,0.5)', stroke = '#000' }) => {
    return (
        <svg height={width} width={height} viewBox="0 0 21 21">
            <path
                d="M13.59 20.5c1.036-.06 2.16-1.373 1.341-2.866-.795-1.449-1.993-2.675-1.993-2.675-2.062 1.44-1 5.682.653 5.541z"
                stroke="#000" strokeWidth=".8" fill="#fff" color="#000"/>
            <path
                d="M20.55 15.74c-.762 1.788-3.095 3.042-4.891 1.873-1.742-1.133-2.958-2.837-2.958-2.837 3.147-2.903 9.069-2.72 7.849.964zM.502 7.409C.563 6.371 1.878 5.246 3.37 6.065c1.447.794 2.674 1.994 2.674 1.994-1.44 2.061-5.68 1-5.543-.65z"
                stroke="#000" strokeWidth=".8" fill="#fff" color="#000"/>
            <path
                d="M5.259.457c-1.787.762-3.041 3.095-1.873 4.892C4.52 7.091 6.223 8.307 6.223 8.307c2.902-3.146 2.719-9.07-.964-7.85z"
                stroke="#000" strokeWidth=".8" fill="#fff" color="#000"/>
            <path d="M17.38 10.29l-3.3-3.293-3.29-3.296 3.55-.262 3.56-.263-.26 3.558z" stroke="#000" strokeWidth=".8"
                  fill="#e9ddaf" color="#000"/>
            <path d="M15.03 3.395a6.825 6.825 0 0 1 2.67 2.671l.213-2.883z" stroke="#000" strokeWidth=".8" fill="red"
                  color="#000"/>
            <path d="M12.49 5.709c1.95.2 2.65 1.374 2.899 2.899L6.817 17.18l-2.899-2.89z" stroke="#000" strokeWidth=".8"
                  fill="#fc0" color="#000"/>
            <path
                d="M10.53 3.742c1.611-.14 2.015.74 1.984 1.985L3.941 14.3l-1.985-1.98zM15.38 8.591c1.611-.14 2.015.74 1.984 1.985l-8.576 8.576-1.984-1.985z"
                stroke="#000" strokeWidth=".8" fill="#f60" color="#000"/>
            <ellipse rx="2.837" ry="2.873" stroke="#000" transform="rotate(45)" cy="-.764" cx="12" strokeWidth=".8"
                     fill="#fff" color="#000"/>
            <ellipse rx="1.322" ry="1.339" transform="rotate(45)" cy="-.764" cx="12" color="#000"/>
            <ellipse rx="2.837" ry="2.873" stroke="#000" transform="rotate(45)" cy="-.764" cx="17.64" strokeWidth=".8"
                     fill="#fff" color="#000"/>
            <ellipse rx="1.322" ry="1.339" transform="rotate(45)" cy="-.764" cx="17.64" color="#000"/>
            <path d="M2.17 15.5l-.432-2.98 3.176.71 3.019 2.82.632 3.26-2.946-.44z" stroke="#000" strokeWidth=".8"
                  fill="#e9ddaf" color="#000"/>
            <ellipse rx="1.421" ry=".347" stroke="#000" transform="rotate(45)" cy="7.632" cx="14.93" strokeWidth=".8"
                     fill="red" color="#000"/>
            <ellipse rx=".849" ry=".86" transform="scale(.9533 1.0445) rotate(45)" cy="-1.971" cx="12.74" fill="#fff"
                     color="#000"/>
            <ellipse rx=".849" ry=".86" transform="scale(.9533 1.0445) rotate(45)" cy="-2.237" cx="18.44" fill="#fff"
                     color="#000"/>
        </svg>
    )
};

export default IconLogo;
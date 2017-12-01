import React from 'react';

const PageTitle = function ({title}) {

    const headingStyle = {
        padding: '100px 1rem 0 1rem',
        marginBottom: '60px',
        textAlign: 'center'
    };

    return (
        <div style={headingStyle}>
            <svg width="300" height="64" viewBox="0 0 300 64">

                <text opacity=".5" transform="skewX(59.585) scale(1 -.9786)" fontSize="7.71" y="-34.121" x="20.134"
                      fontFamily="sans-serif" wordSpacing="0" letterSpacing="0">
                    <tspan fontFamily="'Source Code Pro'" fontWeight="900" fontSize="41.86" stroke="#000" y="-34.121"
                           x="20.134">{title}
                    </tspan>
                </text>
                <text fontSize="7.819" stroke="#3d3457" strokeWidth="2" fill="#9875fe" transform="scale(1.003 .9972)"
                      fontFamily="sans-serif" y="32.719" x="77.321" wordSpacing="0" letterSpacing="0">
                    <tspan fontFamily="'Source Code Pro'" fontWeight="900" fontSize="42.45" y="32.719" x="77.321">
                        {title}
                    </tspan>
                </text>

                <path opacity=".5"
                      d="M44.72 36.01H6.16c-2.457 0-2.271 1.498.415 3.347l29.19 20.07c2.686 1.848 6.856 3.347 9.313 3.347h38.56c2.457 0 2.271-1.498-.415-3.347l-29.18-20.08c-2.69-1.85-6.86-3.34-9.32-3.34zm.615 22.87c-2.866 0-7.731-1.748-10.86-3.904-3.134-2.156-3.351-3.904-.485-3.904s7.731 1.748 10.86 3.904c3.134 2.156 3.351 3.904.485 3.904zm-31.19-18.41h35.59l11.35 7.809.757 6.101c.042.327-.663.327-1.572 0l-26.29-9.448.48 3.87c.041.327-.663.327-1.573 0l-13.89-4.99-4.86-3.34z"
                      stroke="#000" strokeWidth="2"/>

                <path
                    d="M44 36.14H5.44C2.992 36.14 1 34.17 1 31.75V5.39C1 2.967 2.992 1 5.449 1h38.56c2.457 0 4.449 1.967 4.449 4.393v26.36c0 2.426-1.992 4.393-4.449 4.393zM11.38 6.12c-2.866 0-5.19 2.294-5.19 5.125 0 2.83 2.324 5.125 5.19 5.125s5.19-2.294 5.19-5.125c0-2.83-2.323-5.125-5.19-5.125zM6.931 30.28h35.59V20.03l-8.111-8.009a1.123 1.123 0 0 0-1.573 0l-12.56 12.41-5.15-5.08a1.123 1.123 0 0 0-1.573 0l-6.628 6.545v4.393z"
                    stroke="#3d3457" strokeWidth="2" fill="#9875fe"/>

            </svg>

        </div>
    )
};

export default PageTitle;
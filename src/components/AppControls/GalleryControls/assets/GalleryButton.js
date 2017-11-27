import React from 'react';

const GalleryButton = function (props) {
    return (
        <div className={'sketch-butt'}>
            <svg onClick={props.onClick} height="65" width="67" viewBox="0 0 67 65">
                <rect ry="0" height="65" width="67" fill="#fff" color="#000"/>
                <text fontSize="9.67" y="56.826" x="10.009" fontFamily="sans-serif" wordSpacing="0" letterSpacing="0">
                    <tspan fontWeight="900" fontSize="11.25" y="56.826" x="10.009" fontFamily="'Source Code Pro'">
                        gallery
                    </tspan>
                </text>
                <path
                    d="M17.71 41.21c-.217-.146-.23-.215-.217-1.137.012-.816.013-.826.12-1.04.165-.334.44-.606.779-.772l.29-.141h30.08l.252.118a1.6 1.6 0 0 1 .876.958c.077.218.086.313.088.976.004.823-.018.904-.259 1.051l-.129.079H17.85l-.136-.092zm1.908-4.858c0-.848.032-.997.263-1.225.237-.235.372-.264 1.22-.264h.687V22.021h4.34v12.842h2.17V22.021h4.34v12.842h2.17V22.021h4.34v12.842h2.17V22.021h4.34v12.842h.688c.769 0 .954.031 1.156.195.275.225.303.33.32 1.19l.015.762h-28.22v-.657zm.469-15.52c-.356-.175-.469-.452-.469-1.152v-.371h-.898c-.85 0-.905-.004-1.01-.079-.207-.145-.225-.225-.225-1.018v-.723l.143-.13c.125-.115 1.154-.51 8.062-3.103 6.737-2.528 7.942-2.969 8.071-2.956.143.015 15.7 5.826 15.96 5.961.209.11.254.235.273.769.01.263.005.594-.01.736-.027.236-.042.271-.179.4l-.15.141h-1.824v.406c0 .673-.11.933-.474 1.118l-.188.096h-26.88l-.194-.096z"/>
            </svg>

        </div>
    )
};

export default GalleryButton;
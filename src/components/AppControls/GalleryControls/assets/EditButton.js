import React from 'react';

const EditButton = function (props) {
    return (
        <div className={'sketch-butt'}>
            <svg onClick={props.onClick} width={'100%'} height={'100%'} viewBox="0 0 67 65">
                <rect ry="0" height="65" width="67.49" fill="#fff" color="#000"/>
                <text fontSize="9.67" y="56.826" x="20.24" fontFamily="sans-serif" wordSpacing="0" letterSpacing="0">
                    <tspan fontWeight="900" fontSize="11.25" y="56.826" x="20.24" fontFamily="'Source Code Pro'">edit
                    </tspan>
                </text>
                <path
                    d="M36.42 17.14l6.577 6.505a.698.698 0 0 1 0 .996l-16.08 15.91-6.761.739c-.907.1-1.671-.657-1.57-1.553l.753-6.693 16.08-15.9a.717.717 0 0 1 1.007 0zm11.66-1.5l-3.561-3.522a2.872 2.872 0 0 0-4.023 0l-2.732 2.702a.698.698 0 0 0 0 .996l6.577 6.505a.717.717 0 0 0 1.007 0l2.732-2.702a2.786 2.786 0 0 0 0-3.979z"/>
            </svg>
        </div>
    )
};

export default EditButton;
import React from 'react';

const SettingsButton = function (props) {
    return (
        <div className={'sketch-butt'}>
            <svg height="65" width="67" viewBox="0 0 67 65">
                <rect height="65" width="67" fill="#fff" color="#000"/>
                <path
                    d="M21.89 8.958c-.866.004-1.724.077-2.56.218a1.606 1.606 0 0 0-1.332 1.58v2.266a11.712 11.712 0 0 0-3.732 2.13l-1.978-1.13a1.637 1.637 0 0 0-2.059.357c-1.101 1.304-2.263 2.797-2.868 4.424-.279.733.027 1.56.714 1.95l2.263 1.136a11.52 11.52 0 0 0 0 4.262l-2.263 1.13a1.614 1.614 0 0 0-.714 1.956c.605 1.62 1.767 3.113 2.868 4.417.503.598 1.38.746 2.059.356l1.978-1.122a11.83 11.83 0 0 0 3.732 2.13v2.26c0 .786.578 1.452 1.359 1.587 1.733.295 3.487.282 5.159 0a1.614 1.614 0 0 0 1.339-1.587v-2.26a11.712 11.712 0 0 0 3.732-2.13l1.978 1.13c.686.39 1.557.242 2.06-.357 1.101-1.304 2.291-2.797 2.895-4.424a1.608 1.608 0 0 0-.714-1.956l-2.29-1.13a11.557 11.557 0 0 0 0-4.269l2.29-1.13c.687-.397.952-1.224.68-1.956-.605-1.627-1.76-3.119-2.861-4.424a1.64 1.64 0 0 0-2.06-.356l-1.98 1.13c-1.09-.93-2.36-1.65-3.74-2.14v-2.26c0-.786-.578-1.451-1.359-1.586-.86-.14-1.74-.208-2.6-.205zm.111 10.2c3.821.055 6.601 4.448 3.521 8.412-5.234 3.98-11.21-1.929-7.184-7.106 1.227-.933 2.494-1.322 3.664-1.305zM46.16 13.8c0-2.088 1.711-3.781 3.823-3.781 2.111 0 3.823 1.693 3.823 3.781s-1.711 3.781-3.823 3.781c-2.111 0-3.823-1.693-3.823-3.781zm13.52.072a1.713 1.713 0 0 0-2.403 0l-4.599 4.55h-5.389l-4.599-4.55a1.713 1.713 0 0 0-2.403 0 1.668 1.668 0 0 0 0 2.377l5.024 4.97v14.01c0 .927.76 1.68 1.699 1.68h.85a1.69 1.69 0 0 0 1.698-1.68v-5.883h.85v5.882c0 .928.76 1.681 1.699 1.681h.85a1.69 1.69 0 0 0 1.698-1.68v-14.01l5.024-4.97a1.668 1.668 0 0 0 0-2.377z"/>
                <text>
                    <tspan fontWeight="900" fontSize="11.86" y="57" x="5.146" fontFamily="'Source Code Pro'">settings
                    </tspan>
                </text>
            </svg>
        </div>
    )
};

export default SettingsButton;
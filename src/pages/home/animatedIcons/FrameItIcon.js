import React from 'react';
import './frameIt_styles.css';

const FrameItIcon = function () {
    return (
        <svg className={'frameItIcon'} width="155" height="184" viewBox="0 0 155 184">

            <rect x="35" y="38" width="92.71" height="115.2" ry="0"
                  fill="rgba(0,0,0,0.2)"/>


            <g className={'frameItIcon--frame'}>
                <path id="frameBottomRight" d="M152.5.359L3 184.159h149.5z" 
                      fill="#1a1a1a"/>
                <path id="frameTopLeft" d="M152.5.359L3 184.159V.359z" 
                      fill="#393939"/>
            </g>

            <g className={'frameItIcon--mount'}>
                <rect id="mount" x="11.52" y="10.38" width="132.4" height="163.8" ry="0"
                      fill="#fc0"/>
                <path id="mountEdgeBottomRight" d="M125.9 32.61l-96.45 119.3h96.45z"
                      fill="#ffe374"/>
                <path id="mountEdgeTopLeft" d="M125.9 32.61l-96.45 119.3V32.61z"
                      fill="#bd9700"/>
            </g>

            <rect x="31.36" y="34.65" width="92.71" height="115.2" ry="0"
                  stroke={'rgba(0,0,0,0.1)'}
                  fill="#fff6d5"/>

            <g>
                <path
                    d="M84.44 133.8c3.788-.22 7.862-5.078 4.814-10.6-2.954-5.36-7.376-9.894-7.376-9.894-7.494 5.324-3.479 21.02 2.562 20.5z"
                    fill="#fff"  stroke="#000" strokeWidth="1.89"/>
                <path
                    d="M109.7 116.2c-2.732 6.613-11.23 11.25-17.83 6.926-6.408-4.192-10.91-10.49-10.91-10.49 11.42-10.74 33.09-10.06 28.74 3.565zM36.14 85.4c.191-3.839 4.965-7.999 10.45-4.97 5.321 2.937 9.847 7.373 9.847 7.373-5.2 7.625-20.74 3.699-20.3-2.403z"
                    fill="#fff"  stroke="#000" strokeWidth="1.89"/>
                <path
                    d="M53.32 59.69c-6.516 2.82-11.03 11.45-6.695 18.09 4.2 6.444 10.47 10.94 10.47 10.94 10.52-11.63 9.66-33.55-3.774-29.04z"
                    fill="#fff"  stroke="#000" strokeWidth="1.89"/>
                <path d="M97.96 96.06L73.64 71.68l26.01-1.941-.848 13.16z" fill="#e9ddaf" 
                      stroke="#000" strokeWidth="1.89"/>
                <path d="M89.16 70.56c3.842 2.179 7.239 5.253 9.853 9.879l.688-10.66z" fill="red" 
                      stroke="#000" strokeWidth="1.89"/>
                <path d="M79.95 79.12c7.14.738 9.736 5.083 10.7 10.73l-31.1 31.73-10.7-10.73z" fill="#fc0"
                       stroke="#000" strokeWidth="1.89"/>
                <path
                    d="M72.7 71.84c5.89-.515 7.396 2.734 7.323 7.342l-31.1 31.73-7.323-7.342zM90.59 89.77c5.89-.515 7.396 2.734 7.323 7.342l-31.1 31.73-7.323-7.342z"
                    fill="#f60"  stroke="#000" strokeWidth="1.89"/>
                <ellipse transform="rotate(45.073) skewX(.64)" cx="109.3" cy="14.04" rx="10.48" ry="10.52" fill="#fff"
                          stroke="#000" strokeWidth="1.89"/>
                <ellipse transform="rotate(45.073) skewX(.64)" cx="109.3" cy="14.04" rx="4.885" ry="4.904"
                         />
                <ellipse transform="rotate(45.073) skewX(.64)" cx="130.1" cy="14.04" rx="10.48" ry="10.52" fill="#fff"
                          stroke="#000" strokeWidth="1.89"/>
                <ellipse transform="rotate(45.073) skewX(.64)" cx="130.1" cy="14.04" rx="4.885" ry="4.904"
                         />
                <path d="M42.49 115.3l-1.663-11.02 11.62 2.654 11.13 10.44 2.433 12.09-10.8-1.685z" fill="#e9ddaf"
                       stroke="#000" strokeWidth="1.89"/>
                <ellipse transform="rotate(45.073) skewX(.64)" cx="120.1" cy="44.79" rx="5.251" ry="1.27" fill="red"
                          stroke="#000" strokeWidth="1.89"/>
                <ellipse transform="matrix(.6735 .7392 -.6665 .7455 0 0)" cx="111.5" cy="6.727" rx="3.138" ry="3.15"
                         fill="#fff" />
                <ellipse transform="matrix(.6735 .7392 -.6665 .7455 0 0)" cx="132.6" cy="5.755" rx="3.138" ry="3.15"
                         fill="#fff" />
                <path
                    d="M108.338 60.87c-1.224 1.533 2.065 2.343.045 3.077-2.02.733-3.393-1.04-5.758-2.298-2.365-1.257-1.978 1.633-3.524-.68-1.546-2.312-.84-1.994-1.24-4.316s-4.223-3.133-2.446-4.435 2.06-.126 4.56-.22c2.5-.093 2.785-3.077 5.475-1.992 2.69 1.085-.43 2.825 1.368 4.582 1.798 1.757 3.644 2.313 4.621 4.69.978 2.38-1.876.061-3.1 1.593z"
                    fill="red" />
                <path
                    d="M117.137 73.243c-1.065.89 1.765 2.754.164 3.325-1.602.57-1.083-2.532-3.23-2.89-2.147-.358-2.475 3.277-4.62 2.631s-.248-2.953-1.91-4.033c-1.66-1.08-.641 1.725-1.43.317-.789-1.407-.014-1.443-.162-2.658s-3.228-1.906-1.697-2.662 4.103 1.966 6.25 1.86c2.147-.107-2.097-3.162.115-2.748 2.21.412.63 1.483 2.787 2.26 2.157.775 2.625-.477 4.4.41 1.774.885-1.818-.325-1.334.833.483 1.158 3.482.82 3.731 2.109.25 1.29-1.998.356-3.063 1.245z"
                    fill="purple" />
                <path
                    d="M91.537 62.607c-1.009.854 4.236 1.939 2.468 2.396-1.77.457-2.127-1.064-4.243-1.109-2.117-.045-3.474.845-5.466.341-1.992-.503 2.64-.782.704-1.758-1.936-.976-1.325 1.927-2.687.785-1.362-1.142.162-1.551-.687-2.792-.848-1.242-2.261-1.45-1.88-2.515.38-1.065 1.708.488 2.87-.409 1.16-.896-3.908-.918-2.102-1.236 1.807-.317 3.622.19 5.69.174 2.07-.017.78-2.097 3.032-1.469 2.252.63-1.927 1.834-.084 2.661 1.844.828 2.687-1.307 4.047-.047 1.36 1.26-1.515 1.972-1.085 3.168.43 1.196 3.804 1.07 3.652 2.138-.15 1.069-3.22-1.184-4.23-.329z"
                    fill="#2ca02c" />
            </g>
        </svg>
    )
};

export default FrameItIcon;
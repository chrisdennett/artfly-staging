import React, { Component } from "react";

/*
WIP
I imagine this being used as a timer.
Helper functions would proved the current value based on:
 - current time
 - a set of keyframe times
 - tween settings.
*/


class Animator extends Component {

    constructor(props) {
        super(props);

        this.state = { seconds:0 };

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.request = requestAnimationFrame(this.tick);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.state.request);
    }

    tick(timestamp) {
        if(!this.start) this.start = timestamp;
        const seconds = Math.floor((timestamp - this.start) / 1000);
        this.setState({ seconds  }, () => this.request = requestAnimationFrame(this.tick));
    }

    render() {
        const { seconds } = this.state;

        return (
            <div>
                <h1>Animator</h1>
                <p>{seconds}</p>


                <svg width="155.4" height="184.4" viewBox="0 0 155.4 184.4">
                    <g id="cuttingBoard">
                        <rect x="4.049" y="5.242" width="149" height="174.3" ry="6.115" fill="#0b4843"/>
                        <rect x="2.049" y="3.242" width="149" height="174.3" ry="6.115" fill="#0f6059"/>
                        <g fill="#fff" stroke="#fff">
                            <path
                                d="M12.42 11.36v158.1M24.08 11.36v158.1M35.75 11.36v158.1M47.41 11.36v158.1M59.07 11.36v158.1M70.73 11.36v158.1M82.4 11.36v158.1M94.06 11.36v158.1M105.7 11.36v158.1M117.4 11.36v158.1M129 11.36v158.1M140.7 11.36v158.1"
                                opacity=".38"/>
                        </g>
                        <g fill="#fff" stroke="#fff">
                            <path
                                d="M144.4 49.6H8.7M144.4 61.26H8.7M144.4 72.92H8.7M144.4 84.58H8.7M144.4 96.24H8.7M144.4 107.9H8.7M144.4 119.6H8.7M144.4 131.2H8.7M144.4 142.9H8.7M144.4 154.6H8.7M144.4 166.2H8.7M144.4 14.61H8.7M144.4 26.27H8.7M144.4 37.93H8.7"
                                opacity=".38"/>
                        </g>
                    </g>
                    <rect x="29.19" y="30.51" width="96.54" height="119.4" ry="0" fill="#fff6d5"/>
                    <g id="drawing">
                        <path
                            d="M83.71 130.4c3.944-.228 8.187-5.288 5.013-11.04-3.076-5.582-7.68-10.3-7.68-10.3-7.804 5.544-3.622 21.88 2.668 21.34z"
                            fill="#fff" stroke="#000" strokeWidth="1.89"/>
                        <path
                            d="M110 112.1c-2.845 6.886-11.69 11.71-18.57 7.212-6.672-4.365-11.36-10.93-11.36-10.93 11.89-11.18 34.46-10.47 29.93 3.713zM33.42 79.98c.2-3.998 5.17-8.33 10.88-5.175 5.54 3.058 10.25 7.678 10.25 7.678-5.415 7.939-21.6 3.852-21.14-2.503z"
                            fill="#fff" stroke="#000" strokeWidth="1.89"/>
                        <path
                            d="M51.31 53.2c-6.785 2.936-11.48 11.92-6.971 18.84 4.374 6.71 10.9 11.39 10.9 11.39 10.95-12.12 10.06-34.93-3.93-30.23z"
                            fill="#fff" stroke="#000" strokeWidth="1.89"/>
                        <path d="M97.79 91.08L72.47 65.7l27.08-2.022-.883 13.7z" fill="#e9ddaf" stroke="#000"
                              strokeWidth="1.89"/>
                        <path d="M88.63 64.52c4.001 2.269 7.538 5.469 10.26 10.29l.716-11.1z" fill="red" stroke="#000"
                              strokeWidth="1.89"/>
                        <path d="M79.04 73.43c7.435.768 10.14 5.292 11.14 11.17l-32.39 33.04-11.14-11.17z" fill="#fc0"
                              stroke="#000" strokeWidth="1.89"/>
                        <path
                            d="M71.49 65.86c6.134-.537 7.701 2.846 7.626 7.645l-32.39 33.04L39.1 98.9zM90.12 84.53c6.134-.537 7.701 2.846 7.626 7.645l-32.39 33.04-7.626-7.645z"
                            fill="#f60" stroke="#000" strokeWidth="1.89"/>
                        <ellipse transform="rotate(45.073) skewX(.64)" cx="104.5" cy="11.28" rx="10.91" ry="10.96"
                                 fill="#fff"
                                 stroke="#000" strokeWidth="1.89"/>
                        <ellipse transform="rotate(45.073) skewX(.64)" cx="104.5" cy="11.28" rx="5.087" ry="5.107"
                                 strokeWidth="1.89"/>
                        <ellipse transform="rotate(45.073) skewX(.64)" cx="126.2" cy="11.28" rx="10.91" ry="10.96"
                                 fill="#fff"
                                 stroke="#000" strokeWidth="1.89"/>
                        <ellipse transform="rotate(45.073) skewX(.64)" cx="126.2" cy="11.28" rx="5.087" ry="5.107"
                                 strokeWidth="1.89"/>
                        <path d="M40.04 111.1l-1.732-11.48 12.1 2.764 11.59 10.87 2.534 12.59-11.24-1.754z"
                              fill="#e9ddaf"
                              stroke="#000" strokeWidth="1.89"/>
                        <ellipse transform="rotate(45.073) skewX(.64)" cx="115.8" cy="43.31" rx="5.468" ry="1.322"
                                 fill="red"
                                 stroke="#000" strokeWidth="1.89"/>
                        <ellipse transform="matrix(.6735 .7392 -.6665 .7455 0 0)" cx="106.9" cy="4.076" rx="3.267"
                                 ry="3.28"
                                 fill="#fff" strokeWidth="1.895"/>
                        <ellipse transform="matrix(.6735 .7392 -.6665 .7455 0 0)" cx="128.9" cy="3.064" rx="3.267"
                                 ry="3.28"
                                 fill="#fff" strokeWidth="1.895"/>
                        <path transform="matrix(.8558 0 .2594 .7408 159.1 63.81)"
                              d="M-55.13-12.65c-2.142 2.154 1.515 3.293-1.255 4.324-2.77 1.03-3.685-1.463-6.027-3.23s-3.103 2.296-3.998-.956c-.896-3.25-.172-2.803.33-6.067.501-3.264-3.803-4.405-1.086-6.235s2.559-.176 5.64-.308c3.082-.132 4.7-4.326 7.512-2.8 2.81 1.524-1.727 3.97-.288 6.44 1.44 2.47 3.448 3.251 3.624 6.594.176 3.344-2.309.085-4.45 2.238z"
                              fill="red"/>
                        <path transform="matrix(.8642 0 .2478 .511 168.6 73.78)"
                              d="M-55.13-12.65c-1.803 1.813.517 5.613-1.746 6.776-2.263 1.163.175-5.16-2.203-5.889-2.378-.729-4.897 6.679-7.104 5.362s1.427-6.018.056-8.218-1.781 3.514-1.91.646c-.128-2.868.827-2.942 1.36-5.418s-2.776-3.883-.49-5.424 3.795 4.006 6.444 3.789c2.65-.217-.679-6.442 1.744-5.6 2.423.841-.108 3.024 2.038 4.605 2.146 1.58 3.442-.971 5.062.835s-2-.66-2.095 1.7c-.094 2.36 3.717 1.67 3.264 4.297-.453 2.628-2.616.725-4.419 2.538z"
                              fill="purple"/>
                        <path transform="matrix(.8642 0 .2478 .5181 141.9 62.79)"
                              d="M-55.13-12.65c-1.708 1.718 3.987 3.898 1.592 4.817-2.395.918-1.949-2.138-4.473-2.229-2.525-.09-4.673 1.698-6.783.686-2.11-1.012 3.632-1.573 1.862-3.535-1.77-1.962-2.707 3.874-3.69 1.579-.983-2.296 1.089-3.118.782-5.613-.307-2.495-1.89-2.913-.817-5.054 1.073-2.141 1.778.98 3.694-.823 1.916-1.802-4.179-1.846-1.82-2.484 2.36-.637 4.255.382 6.757.348 2.503-.033 2.148-4.215 4.5-2.95 2.35 1.263-3.38 3.684-1.636 5.347 1.745 1.664 3.991-2.627 4.904-.095.913 2.532-2.962 3.964-3.134 6.368-.172 2.404 3.967 2.151 3.17 4.298-.799 2.148-3.2-2.379-4.908-.66z"
                              fill="#2ca02c"/>
                    </g>
                    <g id="rSlice">
                        <rect transform="skewX(-.021)" x="124.3" y="30.5" width="7.504" height="117.9" ry="0"
                              fill="#fff6d5"/>
                        <path d="M131.7 31.51v115.9" fill="#0b4843" stroke="#000" strokeLinecap="square"
                              strokeWidth="2"/>
                    </g>
                    <g id="lSlice">
                        <rect transform="" x="22" y="30.5" width="7.504" height="117.9" ry="0" fill="#fff6d5"/>
                        <path d="M21.57 31.51v115.9" fill="#0b4843" stroke="#000" strokeLinecap="square"
                              strokeWidth="2"/>
                    </g>
                    <g id="tSlice">
                        <rect transform="matrix(0 -1 -1 .0004 0 0)" x="-31.49" y="-131.7" width="7.504" height="110"
                              ry="0"
                              fill="#fff6d5"/>
                        <path d="M131.7 30.48v-7.117M131.6 23.36h-110M21.57 30.48v-7.117" fill="#0b4843" stroke="#000"
                              strokeLinecap="square" strokeWidth="2"/>
                    </g>
                    <g id="bSlice">
                        <rect transform="rotate(90) skewX(-.023)" x="148.3" y="-131.7" width="7.504" height="110" ry="0"
                              fill="#fff6d5"/>
                        <path d="M131.7 149.3v7.117M131.6 156.4h-110M21.57 149.3v7.117" fill="#0b4843" stroke="#000"
                              strokeLinecap="square" strokeWidth="2"/>
                    </g>
                    <g className={'tGuide'} transform={`translate(0,${0})`}>
                        <path d="M155.1 32.45H1.3" stroke="#f0f" strokeLinecap="square" strokeWidth="2"/>
                    </g>
                    <g className={'lGuide'}>
                        <path id="leftGuide" d="M29.52 1v182.9" stroke="#f0f" strokeLinecap="square" strokeWidth="2"/>
                    </g>
                    <g className={'rGuide'}>
                        <path id="rightGuide" d="M123.5 1v182.9" stroke="#f0f" strokeLinecap="square" strokeWidth="2"/>
                    </g>
                    <g className={'bGuide'}>
                        <path id="bottomGuide" d="M155.1 146.5H1.3" stroke="#f0f" strokeLinecap="square"
                              strokeWidth="2"/>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Animator;
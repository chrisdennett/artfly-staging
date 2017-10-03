import React, { Component } from "react";
import _ from 'lodash';

import Cloud from "./Cloud";

class AnimatedClouds extends Component {

    constructor(props) {
        super(props);

        this.tick = this.tick.bind(this);

        this.state = { request: 0, totalClouds: 6, maxCloudSpeedPercent: 0.0008, minCloudSpeedPercent: 0.0004 };
    }

    componentDidMount() {
        this.setCloudStartPositions();
    }

    setCloudStartPositions() {
        this.setState((state, props) => {

            let newCloudXPositions = {};
            for (let i = 0; i < state.totalClouds; i++) {
                newCloudXPositions[`c${i}`] = {
                    key: `c${i}`,
                    speedPercent: state.minCloudSpeedPercent + (Math.random() * state.maxCloudSpeedPercent),
                    x: Math.random() * props.width,
                    y: Math.random() * (props.height * 0.3)
                }
            }

            return {
                cloudXPositions: newCloudXPositions,
                request: requestAnimationFrame(this.tick)
            }
        });
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.state.request);
    }

    tick() {
        this.setState((state, props) => {

            let newCloudXPositions = { ...state.cloudXPositions };
            for (let i = 0; i < state.totalClouds; i++) {
                let cl = newCloudXPositions[`c${i}`];
                let newX = cl.x + (props.width * cl.speedPercent);

                if (newX > props.width + 100) {
                    newX = 0 - (300 * props.cloudScale);
                    cl.y = Math.random() * (props.height * 0.3);
                }
                cl.x = newX;
            }

            return {
                cloudXPositions: newCloudXPositions,
                request: requestAnimationFrame(this.tick)
            }
        });
    }


    render() {
        const {cloudScale} = this.props;

        return (
            <g>
                {
                    _.map(this.state.cloudXPositions, (pos) => {
                        return <Cloud key={pos.key} x={pos.x} y={pos.y} scale={cloudScale}/>
                    })
                }
            </g>
        );
    }
}

export default AnimatedClouds;
import React, { Component } from "react";

class ScrollbarRemover extends Component {

    componentDidMount() {
        document.body.classList.toggle('no-scroll-bars', true);
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default ScrollbarRemover;
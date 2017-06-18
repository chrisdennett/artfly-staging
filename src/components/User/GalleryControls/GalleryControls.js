import React, { Component } from "react";

class GalleryControls extends Component {

    onPrevClick(){
        console.log("hello dave prev");
    }

    onNextClick(){
        console.log("hello dave next");
    }

    render() {
        return (
            <span>
                <button onClick={this.onPrevClick.bind(this)}>Prev</button>
                <button onClick={this.onNextClick.bind(this)}>Next</button>
            </span>
        );
    }
}

export default GalleryControls;
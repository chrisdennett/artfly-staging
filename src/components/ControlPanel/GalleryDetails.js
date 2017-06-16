import React, { Component } from "react";

class GalleryDetails extends Component {

    render() {
        return (
            <div>
                <span>Gallery: </span><span>{this.props.name}</span>
                <button>edit</button>
            </div>
        );
    }
}

export default GalleryDetails;
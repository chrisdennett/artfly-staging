import React, { Component } from "react";
import EmptyArtwork from "../../../Artwork/EmptyArtwork";

class NewArtwork extends Component {

    render() {


        const {width, height} = this.props;

        return (
            <EmptyArtwork width={width} height={height} />
        );
    }
}

export default NewArtwork;
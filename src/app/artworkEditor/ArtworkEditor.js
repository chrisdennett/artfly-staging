import React, { Component } from "react";
import AppBar from "../appBar/AppBar";

class ArtworkEditor extends Component {

    render() {

        return (
            <div>
                <AppBar title={'Artwork Editor'}
                        fixed={false}/>
            </div>
        );
    }
}

export default ArtworkEditor;
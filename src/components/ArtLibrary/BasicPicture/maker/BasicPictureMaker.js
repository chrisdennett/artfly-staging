// externals
import React, { Component } from "react";
// components
import ArtistSelector from "../../../ArtistSelector/ArtistSelector";
import PhotoUploader from "../../../PhotoUploader/PhotoUploader";
import Butt from "../../../global/Butt";

class BasicPictureMaker extends Component {

    // Saving the artwork will create all the images and save the crop data.

    render() {
        return (
            <div>
                <h2>Basic Picture Maker</h2>
                <ArtistSelector/>
                <PhotoUploader/>

                <hr/>

                <Butt>SAVE Artwork</Butt>
            </div>
        );
    }
}

export default BasicPictureMaker;
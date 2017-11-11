// externals
import React, { Component } from "react";
// components
import Page from "../global/Page";
import BasicPictureMaker from "../ArtLibrary/BasicPicture/maker/BasicPictureMaker";
import BasicPictureEditor from "../ArtLibrary/BasicPicture/editor/BasicPictureEditor";

class ArtStudio extends Component {

    render() {

        // In the future this screen will have options for the types of artwork
        // to make. Buttons would determine the maker to load
        // as far as editing goes a property in the artwork would decide the editor to load
        const artworkId = this.props.artworkId;

        let content;
        if(artworkId === 'new'){
            content = <BasicPictureMaker/>
        }
        else{
            content = <BasicPictureEditor artworkId={artworkId}/>
        }

        return (
            <Page hue={131} saturation={51} brightness={40} title={'Art Studio'}>
                {content}
            </Page>
        );
    }
}

export default ArtStudio;
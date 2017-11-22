import React, { Component } from "react";
import Butt from "../../global/Butt";
import Artwork from "../../Artwork/Artwork";

class EditPictureControls extends Component {

    render() {
        const { artist, artwork, onEditArtist, onEditPhoto, onOpenInGallery, onDeleteArtwork, artworkJustAdded } = this.props;

        return (
            <div>
                {artworkJustAdded &&
                <div>
                    Your artwork has been saved to the gallery.
                </div>
                }

                <Butt onClick={onOpenInGallery}>Open artwork in gallery</Butt>

                <p>Artwork by {artist.firstName} {artist.lastName}</p>
                <div style={{ position: 'relative', width: 800, height: 600 }}>
                    <Artwork artwork={artwork}
                             windowSize={{ windowWidth: 800, windowHeight: 600 }}
                             allowScrollbars={true}/>
                </div>

                <img src={artwork.thumb_url} alt={'user artwork thumb'}/>
                <Butt onClick={onEditPhoto}>Edit Photo</Butt>

                <div>
                    <Butt onClick={onEditArtist}>Edit artist</Butt>
                </div>

                <Butt label={'Delete Artwork'}
                      backgroundColour={'#920000'}
                      shadowColour={'#540000'}
                      onClick={onDeleteArtwork}/>
            </div>
        );
    }
}

export default EditPictureControls;
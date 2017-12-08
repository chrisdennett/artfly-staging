import React, { Component } from "react";
// styles
import './editPictureHomeStyles.css';
import Butt from "../../../global/Butt/Butt";
// import Artwork from "../../Artwork/Artwork";
import ArtworkContainer from "../../../Artwork/ArtworkContainer";

class EditPictureHome extends Component {

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
                <div className='editPictureHome--artworkHolder'>
                    <ArtworkContainer artworkId={artwork.artworkId}
                                      width={680}
                                      height={480}
                                      allowScrollbars={true}/>
                </div>

                {/*<img src={artwork.thumb_url} alt={'user artwork thumb'}/>*/}
                <Butt onClick={onEditPhoto}>Edit Photo</Butt>


                <Butt onClick={onEditArtist}>Edit artist</Butt>
                <Butt>Edit Frame</Butt>
                <Butt>Edit Room</Butt>


                <Butt label={'Delete Artwork'}
                      backgroundColour={'#920000'}
                      shadowColour={'#540000'}
                      onClick={onDeleteArtwork}/>
            </div>
        );
    }
}

export default EditPictureHome;
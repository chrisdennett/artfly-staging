import React, { Component } from "react";
// components
import ArtworkContainer from "../../../Artwork/ArtworkContainer";

class EditPictureHome extends Component {

    render() {
        const { width, artist, artwork, artworkJustAdded } = this.props;

        const artworkWidth = width * 0.9;
        const artworkHeight = width / 2;

        return (
            <div>
                <div className='editPicture-main'>
                    {artworkJustAdded &&
                    <div>
                        Your artwork has been saved to the gallery.
                    </div>
                    }

                    <p>Artwork by {artist.firstName} {artist.lastName}</p>
                    <div className='editPictureHome--artworkHolder'>
                        <ArtworkContainer artworkId={artwork.artworkId}
                                          width={artworkWidth}
                                          height={artworkHeight}
                                          allowScrollbars={true}/>
                    </div>
                </div>

                {/*<img src={artwork.thumb_url} alt={'user artwork thumb'}/>*/}
            </div>
        );
    }
}

export default EditPictureHome;
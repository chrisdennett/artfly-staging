// externals
import React, { Component } from "react";
// components
import EditPicture from "./EditPicture";
import AddPicture from "./AddPicture";

class ArtMaker extends Component {

    render() {
        const { userId, artwork, artworkId, selectedArtistId, currentEditScreen, artist } = this.props;

        return (
            <div>

                {artworkId === 'new' &&
                <AddPicture userId={userId}
                            selectedArtistId={selectedArtistId}/>
                }

                {artworkId !== 'new' && artwork &&
                <EditPicture currentEditScreen={currentEditScreen}
                             userId={userId}
                             artist={artist}
                             artworkId={artworkId}
                             artwork={artwork}/>
                }

            </div>
        )
    }
}

export default ArtMaker;
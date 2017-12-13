// externals
import React, { Component } from "react";
// styles
import './pictureMakerStyles.css';
// components
import PictureMakerControls from "./PictureMakerControls";
import ArtworkContainer from "../../../Artwork/ArtworkContainer";
import ArtistUpdater from '../ArtistUpdater';
import PhotoEditor from "../../PhotoEditor/PhotoEditor";
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
import NewArtwork from "./NewArtwork";

class ArtMaker extends Component {

    constructor() {
        super();

        this.showArtworkInEditing = this.showArtworkInEditing.bind(this);
        this.showArtworkInGallery = this.showArtworkInGallery.bind(this);
    }

    showArtworkInEditing() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    showArtworkInGallery() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    render() {
        const { userId, windowSize, artwork, artworkId, selectedArtistId, currentEditScreen, artist } = this.props;
        const artworkJustAdded = (currentEditScreen === 'justAdded');
        const showArtwork = artworkJustAdded || !currentEditScreen;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        return (
            <div className='pictureMaker'>

                <div className='pictureMaker--sidebar'>
                    <PictureMakerControls artistId={selectedArtistId}
                                          artworkId={artworkId}/>
                </div>

                <div className='editPicture'>
                    <div className='editPicture-main'>

                        {currentEditScreen === 'new' &&
                        <NewArtwork width={maxWidth} height={maxHeight}/>
                        }

                        {currentEditScreen === 'deleteArtwork' &&
                        <ArtworkDeleter artworkId={artworkId}
                                        artist={artist}
                                        onDeleteArtworkComplete={this.showArtworkInGallery}
                                        onDeleteArtworkCancel={this.showArtworkInEditing}/>
                        }

                        {currentEditScreen === 'editArtist' &&
                        <ArtistUpdater artworkId={artworkId}
                                       initialArtistId={artwork.artistId}
                                       manageUpload={true}
                                       onCancel={this.showArtworkInEditing}
                                       onUpdateComplete={this.showArtworkInEditing}/>
                        }

                        {currentEditScreen === 'editPhoto' &&
                        <PhotoEditor isNewImage={false}
                                     openCuttingBoard={true}
                                     artworkId={artworkId}
                                     userId={userId}
                                     artistId={artwork.artistId}
                                     url={artwork.url}
                                     onCancel={this.showArtworkInEditing}
                                     onUploadComplete={this.showArtworkInEditing}/>
                        }

                        {showArtwork &&
                        <ArtworkContainer artworkId={artwork.artworkId}
                                          leftMargin={150}
                                          allowScrollbars={false}/>
                        }
                    </div>

                </div>

            </div>
        )
    }
}

export default ArtMaker;

/*
return (
    <div>

        {artworkId === 'new' &&
        <AddPicture userId={userId}
                    selectedArtistId={selectedArtistId}/>
        }

        {artworkId !== 'new' && artwork &&
        <EditPicture currentEditScreen={currentEditScreen}
                     windowSize={windowSize}
                     userId={userId}
                     artist={artist}
                     artworkId={artworkId}
                     artwork={artwork}/>
        }

    </div>
)
 */
import React, { Component } from "react";
// helper
import history from "../global/history";
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";
import BottomBar from "../bottomBar/BottomBar";
import PhotoSelector from "../photoSelector/PhotoSelector";
import GalleryHomeEditor from './GalleryHomeEditor';

class GalleryHome extends Component {

    render() {
        const { galleryArtworks, onPhotoSelected } = this.props;
        const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
        const urlPrefix = urlEndsInSlash ? '' : '/gallery/';
        const firstArtworkId = galleryArtworks.length > 0 ? galleryArtworks[0].artworkId : null;

        return (
            <div className={'galleryHome'}>
                <AppBar title={'Gallery'}
                        fixed={false}/>

                {/*<GalleryHomeEditor/>*/}

                <div>
                    <h1 className={'gallery--title'}>
                        Chris Dennett's
                    </h1>

                    <h2 className={'gallery--subtitle'}>
                        Awesome Gallery of Awesomeness
                    </h2>
                </div>

                <div className={'artworkThumbs'}>
                    <PhotoSelector onPhotoSelected={onPhotoSelected}/>

                    {
                        galleryArtworks.map(artworkData => {
                            return (
                                <ArtworkThumb key={artworkData.artworkId}
                                              onClick={() => history.push(`${urlPrefix}artworkId_${artworkData.artworkId}_artworkId`)}
                                              artworkData={artworkData}
                                />
                            )
                        })
                    }
                </div>

                <BottomBar disabled={!firstArtworkId}
                           onEnterGallery={() => history.push(`${urlPrefix}artworkId_${firstArtworkId}_artworkId`)}/>
            </div>
        );
    }
}

export default GalleryHome;
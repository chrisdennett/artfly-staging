import React, { Component } from "react";
// ui
import { Fab } from 'rmwc/Fab';
// helper
import history from "../global/history";
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";
import BottomBar from "../bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";

class GalleryHome extends Component {

    render() {
        const { galleryArtworks, gallery } = this.props;
        const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
        const urlPrefix = urlEndsInSlash ? '' : '/gallery/';
        const firstArtworkId = galleryArtworks.length > 0 ? galleryArtworks[0].artworkId : null;
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 40, right: 10 };

        return (
            <div className={'galleryHome'}>
                <AppBar title={'Gallery'}
                        fixed={false}/>


                <Fab mini theme={'primary-bg'} style={editFabStyle} onClick={() => history.push('/artworkAdder')}>
                    add
                </Fab>

                {!gallery &&
                <LoadingThing/>
                }

                {gallery &&
                <div>
                    <h1 className={'gallery--title'}>
                        {gallery.title}
                    </h1>

                    <h2 className={'gallery--subtitle'}>
                        {gallery.subtitle}
                    </h2>
                    <div className={'artworkThumbs'}>
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
                </div>
                }

                <BottomBar disabled={!firstArtworkId}
                           onEnterGallery={() => history.push(`${urlPrefix}artworkId_${firstArtworkId}_artworkId`)}/>
            </div>
        );
    }
}

export default GalleryHome;
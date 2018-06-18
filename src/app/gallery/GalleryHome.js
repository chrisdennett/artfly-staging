import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Fab } from 'rmwc/Fab';
// styles
import './gallery_styles.css';
// helper
import { goToArtwork, goToArtworkAdder, goToGalleryEditor } from "../../AppNavigation";
// selectors
import { getCurrentGalleryData } from '../../selectors/Selectors';
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";
import BottomBar from "../bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";
import GalleryTitles from "./GalleryTitles";

class GalleryHome extends Component {

    render() {
        const { currentGalleryData } = this.props;
        const addFabStyle = { position: 'fixed', zIndex: 10000, bottom: 35, right: 10 };
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 100, right: 10 };

        return (
            <div className={'galleryHome'}>
                <AppBar title={'Gallery'}
                        fixed={false}/>

                {!currentGalleryData &&
                <LoadingThing/>
                }

                {currentGalleryData &&
                <div>

                    {currentGalleryData.isEditable &&
                    <Fab theme={'primary-bg'} style={addFabStyle} onClick={() => goToArtworkAdder(currentGalleryData.galleryId)}>
                        add
                    </Fab>
                    }

                    {currentGalleryData.isEditable &&
                    <Fab theme={'secondary-bg'} style={editFabStyle} onClick={() => goToGalleryEditor(currentGalleryData.galleryId)}>
                        edit
                    </Fab>
                    }

                    <GalleryTitles title={currentGalleryData.title}
                                   subtitle={currentGalleryData.subtitle}/>

                    <div className={'gallery--artworkThumbs'}>
                        {
                            currentGalleryData.galleryArtworks.map(artworkData => {
                                return (
                                    <ArtworkThumb key={artworkData.artworkId}
                                                  onClick={() => goToArtwork(currentGalleryData.galleryId, artworkData.artworkId)}
                                                  artworkData={artworkData}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                }

                <BottomBar disabled={!currentGalleryData || !currentGalleryData.firstArtworkId}
                           onEnterGallery={() => goToArtwork(currentGalleryData.galleryId, currentGalleryData.firstArtworkId)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId)
});
export default connect(mapStateToProps)(GalleryHome);
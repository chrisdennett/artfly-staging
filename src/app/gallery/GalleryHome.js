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
import { GalleryHomeAppBar } from "../appBar/AppBar";
import BottomBar from "../bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";
import GalleryTitles from "./GalleryTitles";

class GalleryHome extends Component {

    render() {
        const { currentGalleryData } = this.props;
        const { isEditable, title, subtitle, galleryId, galleryArtworks, firstArtworkId } = currentGalleryData;
        const addFabStyle = { position: 'absolute', bottom: -25, left: '50%', marginLeft: -20 };
        const titlesHolderStyle = { position: 'relative' };

        return (
            <div className={'galleryHome'}>
                <GalleryHomeAppBar title={'Gallery'}
                                   isEditable={isEditable}
                                   onAddClick={() => goToArtworkAdder(galleryId)}
                                   onEditClick={() => goToGalleryEditor(galleryId)}/>

                {!title &&
                <div className={'gallery--loader'}>
                    <LoadingThing/>
                </div>
                }

                {currentGalleryData &&
                <div>
                    <div style={titlesHolderStyle}>
                        <GalleryTitles title={title}
                                       subtitle={subtitle}/>

                        {isEditable &&
                        <Fab theme={'primary-bg'} style={addFabStyle}
                             onClick={() => goToArtworkAdder(galleryId)}>
                            add
                        </Fab>
                        }
                    </div>

                    {galleryArtworks &&
                    <div className={'gallery--artworkThumbs'}>
                        {
                            galleryArtworks.map(artworkData => {
                                return (
                                    <ArtworkThumb key={artworkData.artworkId}
                                                  onClick={() => goToArtwork(galleryId, artworkData.artworkId)}
                                                  artworkData={artworkData}
                                    />
                                )
                            })
                        }
                    </div>
                    }
                </div>
                }

                <BottomBar disabled={!currentGalleryData || !currentGalleryData.firstArtworkId}
                           onEnterGallery={() => goToArtwork(galleryId, firstArtworkId)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId)
});
export default connect(mapStateToProps)(GalleryHome);
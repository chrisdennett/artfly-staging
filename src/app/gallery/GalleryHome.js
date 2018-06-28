import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Fab } from 'rmwc/Fab';
// styles
import './gallery_styles.css';
// actions
import {UpdateUrl} from "../../actions/UrlActions";
// selectors
import { getCurrentGalleryData } from '../../selectors/Selectors';
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import { GalleryHomeAppBar } from "../appBar/AppBar";
import BottomBar from "./bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";
import GalleryTitles from "./GalleryTitles";

class GalleryHome extends Component {

    render() {
        const { currentGalleryData, UpdateUrl } = this.props;
        const { isEditable, title, subtitle, galleryId, galleryArtworks, firstArtworkId } = currentGalleryData;
        const addFabStyle = { position: 'absolute', bottom: -25, left: '50%', marginLeft: -20 };
        const titlesHolderStyle = { position: 'relative' };

        return (
            <div className={'galleryHome'}>
                <GalleryHomeAppBar title={'Gallery'}
                                   isEditable={isEditable}
                                   onAddClick={() => UpdateUrl(`/artworkAdder/galleryId_${galleryId}_galleryId`)}
                                   onEditClick={() => UpdateUrl(`/galleryEditor/galleryId_${galleryId}_galleryId`)}/>

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
                             onClick={() => UpdateUrl(`/artworkAdder/galleryId_${galleryId}_galleryId`)}>
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
                                                  onClick={() => UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${artworkData.artworkId}_artworkId`)}
                                                  artworkData={artworkData}
                                    />
                                )
                            })
                        }
                    </div>
                    }
                </div>
                }

                <BottomBar disabled={!currentGalleryData || !firstArtworkId}
                           onEnterGallery={() => UpdateUrl(`/gallery/galleryId_${galleryId}_galleryId/artworkId_${firstArtworkId}_artworkId`)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId)
});
export default connect(mapStateToProps, {UpdateUrl})(GalleryHome);
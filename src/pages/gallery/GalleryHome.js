import React from "react";
import { connect } from 'react-redux';
// ui
import { Fab } from '@rmwc/fab';
// styles
import './gallery_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// selectors
import { getCurrentGalleryData } from '../../selectors/Selectors';
// comps
import ArtworkThumb from "../../components/artworkThumb/ArtworkThumb";
import { GalleryHomeAppBar } from "../../components/appBar/AppBar";
import BottomBar from "./bottomBar/BottomBar";
import LoadingThing from "../../components/loadingThing/LoadingThing";
import GalleryTitles from "./GalleryTitles";
import { EDITOR_PATH, ARTWORK_PATH } from "../../components/global/UTILS";

const GalleryHome = ({ UpdateUrl, currentGalleryData }) => {

    const { isEditable, title, subtitle, galleryId, galleryArtworks, firstArtworkId, artist } = currentGalleryData;
    const addFabStyle = { position: 'absolute', bottom: -25, left: '50%', marginLeft: -67 };
    const titlesHolderStyle = { position: 'relative' };

    return (
        <div className={'galleryHome'}>

            <GalleryHomeAppBar title={'Gallery'}
                isEditable={isEditable}
                onAddClick={() => UpdateUrl(EDITOR_PATH(galleryId, null, artist))} />

            {!title &&
                <div className={'gallery--loader'}>
                    <LoadingThing />
                </div>
            }

            {currentGalleryData &&
                <div>
                    <div style={titlesHolderStyle}>
                        <GalleryTitles title={title}
                            subtitle={subtitle} />

                        {isEditable &&
                            <Fab style={addFabStyle}
                                theme={'primary-bg'}
                                label={'Add art'}
                                icon={'add'}
                                onClick={() => UpdateUrl(EDITOR_PATH(galleryId, null, artist))} />
                        }
                    </div>

                    {galleryArtworks &&
                        <div className={'gallery--artworkThumbs'}>
                            {
                                galleryArtworks.map(artworkData => {

                                    if (artworkData.artworkId) {
                                        return (
                                            <ArtworkThumb key={artworkData.artworkId}
                                                UpdateUrl={UpdateUrl}
                                                viewerIsAdmin={isEditable}
                                                onClick={() => UpdateUrl(ARTWORK_PATH(artworkData.artworkId, galleryId, artist))}
                                                artworkData={artworkData}
                                            />
                                        )
                                    }
                                    else {
                                        console.log("NO ID: artworkData: ", artworkData);
                                        return null;
                                    }
                                })
                            }
                        </div>
                    }
                </div>
            }

            <BottomBar disabled={!currentGalleryData || !firstArtworkId}
                onEnterGallery={() => UpdateUrl(ARTWORK_PATH(firstArtworkId, galleryId, artist))} />
        </div>
    );

}

// currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId)
const mapStateToProps = (state) => ({
    currentGalleryData: getCurrentGalleryData(state)
});
export default connect(mapStateToProps, { UpdateUrl })(GalleryHome);
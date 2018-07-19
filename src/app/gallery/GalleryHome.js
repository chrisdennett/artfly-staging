import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Fab } from 'rmwc/Fab';
// styles
import './gallery_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
import { updateGallery } from '../../actions/GalleryDataActions';
// selectors
import { getCurrentGalleryData } from '../../selectors/Selectors';
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import { GalleryHomeAppBar } from "../appBar/AppBar";
import BottomBar from "./bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";
import GalleryTitles from "./GalleryTitles";
import GalleryEditor from './GalleryEditor';

class GalleryHome extends Component {

    constructor(props) {
        super(props);

        this.state = { unsavedGalleryData: {}, inEditMode: false };
    }

    render() {
        const { currentGalleryData, UpdateUrl } = this.props;
        const { inEditMode } = this.state;
        const { isEditable, title, subtitle, galleryId, galleryArtworks, firstArtworkId } = currentGalleryData;
        const addFabStyle = { position: 'absolute', bottom: -25, left: '50%', marginLeft: -67 };
        const titlesHolderStyle = { position: 'relative' };

        return (
            <div className={'galleryHome'}>

                {!inEditMode &&
                <GalleryHomeAppBar title={'Gallery'}
                                   isEditable={isEditable}
                                   onAddClick={() => UpdateUrl(`/artworkAdder/galleryId_${galleryId}_galleryId`)}
                                   onEditClick={() => this.setState({ inEditMode: true })}/>
                }


                {inEditMode &&
                <GalleryEditor currentGallery={currentGalleryData}
                               onClose={() => this.setState({ inEditMode: false })}/>
                }


                {!title &&
                <div className={'gallery--loader'}>
                    <LoadingThing/>
                </div>
                }

                {currentGalleryData &&
                <div>
                    {!inEditMode &&
                    <div style={titlesHolderStyle}>
                        <GalleryTitles title={title}
                                       subtitle={subtitle}/>

                        {isEditable &&
                        <Fab style={addFabStyle}
                             theme={'primary-bg'}
                             label={'Add art'}
                             icon={'add'}
                             onClick={() => UpdateUrl(`/artworkAdder/galleryId_${galleryId}_galleryId`)}/>
                        }
                    </div>
                    }

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
export default connect(mapStateToProps, { UpdateUrl, updateGallery })(GalleryHome);
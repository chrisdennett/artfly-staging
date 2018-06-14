import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Fab } from 'rmwc/Fab';
// styles
import './gallery_styles.css';
// helper
import history from "../global/history";
import { goToArtwork } from "../../AppNavigation";
// selectors
import { getCurrentGalleryData } from '../../selectors/Selectors';
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";
import BottomBar from "../bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";

class GalleryHome extends Component {

    render() {
        const { currentGalleryData } = this.props;;
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 40, right: 10 };

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
                    <Fab mini theme={'primary-bg'} style={editFabStyle} onClick={() => history.push('/artworkAdder')}>
                        add
                    </Fab>
                    }
                    <div className={'gallery--header'}>
                        <h1 className={'gallery--title'}>
                            {currentGalleryData.title}
                        </h1>

                        <h2 className={'gallery--subtitle'}>
                            {currentGalleryData.subtitle}
                        </h2>
                    </div>
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

const mapStateToProps = (state, props) => (
    {
        currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId)
    }
);

export default connect(mapStateToProps)(GalleryHome);
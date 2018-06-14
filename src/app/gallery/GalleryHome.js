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
import { getArtworksByDate, getCurrentGalleryData } from '../../selectors/Selectors';
// comps
import ArtworkThumb from "../artworkThumb/ArtworkThumb";
import AppBar from "../appBar/AppBar";
import BottomBar from "../bottomBar/BottomBar";
import LoadingThing from "../loadingThing/LoadingThing";

class GalleryHome extends Component {

    render() {
        const { galleryArtworks, gallery } = this.props;
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

                    <div className={'gallery--header'}>
                        <h1 className={'gallery--title'}>
                            {gallery.title}
                        </h1>

                        <h2 className={'gallery--subtitle'}>
                            {gallery.subtitle}
                        </h2>
                    </div>
                    <div className={'gallery--artworkThumbs'}>
                        {
                            galleryArtworks.map(artworkData => {
                                return (
                                    <ArtworkThumb key={artworkData.artworkId}
                                                  onClick={() => goToArtwork(gallery.galleryId, artworkData.artworkId)}
                                                  artworkData={artworkData}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                }

                <BottomBar disabled={!firstArtworkId}
                           onEnterGallery={() => goToArtwork(gallery.galleryId, firstArtworkId)}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => (
    {
        gallery: state.galleries[props.galleryId],
        galleryArtworks: getArtworksByDate(state.artworks),
        currentGalleryData: getCurrentGalleryData(state.user, state.galleries, state.artworks, props.galleryId)
    }
);

export default connect(mapStateToProps)(GalleryHome);
import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab'
// helper
import { goToGallery, goToArtwork } from "../../AppNavigation";
// selectors
import {getGalleryNavigation} from '../../selectors/Selectors';
// comps
import { ArtworkAppBar } from "../appBar/AppBar";
import GalleryArtwork from "./GalleryArtwork";
import ArtworkEditMenu from "./ArtworkEditMenu";

class GalleryArtworkViewer extends Component {

    constructor(props) {
        super(props);

        this.state = { editMenuIsOpen: false };
    }

    render() {
        const { editMenuIsOpen } = this.state;
        const { galleryNavData, galleryId } = this.props;
        const { currentArtwork, previousArtwork, nextArtwork, isEditable } = galleryNavData;
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 30, right: 10 };

        return (
            <div className={'gallery'}>

                {isEditable &&
                <Fab theme={'primary-bg'} style={editFabStyle}
                     onClick={() => this.setState({ editMenuIsOpen: true })}>
                    edit
                </Fab>
                }

                {isEditable &&
                <ArtworkEditMenu isOpen={editMenuIsOpen}
                                 galleryId={galleryId}
                                 artworkId={currentArtwork.artworkId}
                                 onClose={() => this.setState({ editMenuIsOpen: false })}/>
                }

                <ArtworkAppBar title={'Artworks'}
                               onMenuClick={() => goToGallery(galleryId)}/>

                <GalleryArtwork currentArtwork={currentArtwork}/>

                <div className={'gallery--controls'}>
                    <Button disabled={!previousArtwork}
                            onClick={() => goToArtwork(galleryId, previousArtwork.artworkId)}>
                        <Icon use={'arrow_back'}/>
                    </Button>

                    <Button className={'gallery--controls--backToGalleryButt'}
                            onClick={() => goToGallery(galleryId)}>
                        <Icon use={'dashboard'}/>
                    </Button>

                    <Button disabled={!nextArtwork}
                            onClick={() => goToArtwork(galleryId, nextArtwork.artworkId)}>
                        <Icon use={'arrow_forward'}/>
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => (
    {
        galleryNavData: getGalleryNavigation(state.artworks, props.artworkId, state.user.uid)
    }
);
export default connect(mapStateToProps)(GalleryArtworkViewer);

import React, { Component } from "react";
// ui
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab'
// helper
import history from "../global/history";
// comps
import {ArtworkAppBar} from "../appBar/AppBar";
import GalleryArtwork from "./GalleryArtwork";
import ArtworkEditMenu from "./ArtworkEditMenu";

class GalleryArtworkViewer extends Component {

    constructor(props) {
        super(props);

        this.state = { editMenuIsOpen: false };
    }


    render() {
        const { editMenuIsOpen } = this.state;
        const { currentArtwork, previousArtwork, nextArtwork, isEditable } = this.props;
        const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
        const urlPrefix = urlEndsInSlash ? '' : '/gallery/';
        const goBackToGallery = () => history.push(`/gallery`);
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 40, right: 10 };

        return (
            <div className={'gallery'}>

                {isEditable &&
                <Fab mini theme={'primary-bg'} style={editFabStyle} onClick={() => this.setState({ editMenuIsOpen: true })}>
                    edit
                </Fab>
                }

                {isEditable &&
                <ArtworkEditMenu isOpen={editMenuIsOpen}
                                 artworkId={currentArtwork.artworkId}
                                 onClose={() => this.setState({ editMenuIsOpen: false })}/>
                }

                <ArtworkAppBar title={'Artworks'}
                               onCloseClick={goBackToGallery}
                               onMenuClick={goBackToGallery}/>

                <GalleryArtwork currentArtwork={currentArtwork}/>

                <div className={'gallery--controls'}>
                    <Button disabled={!previousArtwork}
                            onClick={() => history.push(`${urlPrefix}artworkId_${previousArtwork.artworkId}_artworkId`)}>
                        <Icon use={'arrow_back'}/>
                    </Button>

                    <Button className={'gallery--controls--backToGalleryButt'}
                            onClick={goBackToGallery}>
                        <Icon use={'dashboard'}/>
                    </Button>

                    <Button disabled={!nextArtwork}
                            onClick={() => history.replace(`${urlPrefix}artworkId_${nextArtwork.artworkId}_artworkId`)}>
                        <Icon use={'arrow_forward'}/>
                    </Button>
                </div>
            </div>
        );
    }
}

export default GalleryArtworkViewer;
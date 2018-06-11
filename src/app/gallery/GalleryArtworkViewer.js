import React, { Component } from "react";
// ui
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
// helper
import history from "../global/history";
// comps
import {ArtworkAppBar} from "../appBar/AppBar";
import GalleryArtwork from "./GalleryArtwork";

class GalleryArtworkViewer extends Component {

    render() {
        const { currentArtwork, previousArtwork, nextArtwork } = this.props;
        const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
        const urlPrefix = urlEndsInSlash ? '' : '/gallery/';
        const goBackToGallery = () => history.push(`/gallery`);

        return (
            <div className={'gallery'}>
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
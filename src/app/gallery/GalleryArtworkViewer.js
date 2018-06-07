import React, { Component } from "react";
// ui
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { ToolbarIcon } from 'rmwc/Toolbar';
// helper
import history from "../global/history";
// comps
import AppBar from "../appBar/AppBar";
import GalleryArtwork from "./GalleryArtwork";

class GalleryArtworkViewer extends Component {

    render() {
        const { currentArtwork, previousArtwork, nextArtwork } = this.props;
        const urlEndsInSlash = history.location.pathname.slice(-1) === '/';
        const urlPrefix = urlEndsInSlash ? '' : '/gallery/';

        const editButt = (<ToolbarIcon use="edit"
                                       theme={'text-primary-on-background'}
                                       onClick={() => history.push(`/artworkEditor/artworkId_${currentArtwork.artworkId}_artworkId`)}/>);

        return (
            <div className={'gallery'}>
                <AppBar title={'Artworks'}
                        butts={editButt}/>

                <GalleryArtwork currentArtwork={currentArtwork}/>

                <div className={'gallery--controls'}>
                    <Button disabled={!previousArtwork}
                            onClick={() => history.push(`${urlPrefix}artworkId_${previousArtwork.artworkId}_artworkId`)}>
                        <Icon use={'arrow_back'}/>
                    </Button>

                    <Button className={'gallery--controls--backToGalleryButt'}
                            onClick={() => history.push(`/gallery`)}>
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
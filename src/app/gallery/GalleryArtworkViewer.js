import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab'
import { SimpleDialog } from 'rmwc/Dialog';
// actions
import { deleteArtwork } from "../../actions/DeleteArtworkActions";
import { UpdateUrl } from '../../actions/UrlActions';
// selectors
import { getGalleryNavigation } from '../../selectors/Selectors';
// comps
import { ArtworkAppBar } from "../appBar/AppBar";
import GalleryArtwork from "./GalleryArtwork";
import ArtworkEditMenu from "../artworkEditor/ArtworkEditMenu";

class GalleryArtworkViewer extends Component {

    constructor(props) {
        super(props);

        this.state = { editMenuIsOpen: false, deleteConfirmOpen: false };

        this.goToNextArtwork = this.goToNextArtwork.bind(this);
        this.goToPreviousArtwork = this.goToPreviousArtwork.bind(this);
        this.goToGallery = this.goToGallery.bind(this);
    }

    goToGallery(){
        const {galleryId} = this.props;
        const url = `/gallery/galleryId_${galleryId}_galleryId`;
        this.props.UpdateUrl(url, 'GalleryArtworkViewer > goToGallery');
    }

    goToNextArtwork() {
        const {galleryId, galleryNavData} = this.props;
        const {nextArtwork} = galleryNavData;

        if (nextArtwork) {
            const url = `/gallery/galleryId_${galleryId}_galleryId/artworkId_${nextArtwork.artworkId}_artworkId`;
            this.props.UpdateUrl(url, 'GalleryArtworkViewer > goToNextArtwork');
        }
    }

    goToPreviousArtwork() {
        const {galleryId, galleryNavData} = this.props;
        const {previousArtwork} = galleryNavData;

        if (previousArtwork) {
            const url = `/gallery/galleryId_${galleryId}_galleryId/artworkId_${previousArtwork.artworkId}_artworkId`;
            this.props.UpdateUrl(url);
        }
    }

    render() {
        const { editMenuIsOpen, deleteConfirmOpen } = this.state;
        const { galleryNavData, galleryId, deleteArtwork, UpdateUrl } = this.props;
        const { currentArtwork, previousArtwork, nextArtwork, isEditable } = galleryNavData;
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 35, right: 10 };

        return (
            <div className={'gallery'}>

                <SimpleDialog
                    title="Confirm delete"
                    body="Are you sure you want to delete this?"
                    open={deleteConfirmOpen}
                    onClose={() => this.setState({ deleteConfirmOpen: false })}
                    acceptLabel={'Yes Delete'}
                    cancelLabel={'Cancel'}
                    onAccept={() => deleteArtwork(currentArtwork)}
                    onCancel={() => console.log('Cancel')}
                />

                {isEditable &&
                <Fab theme={'primary-bg'}
                     style={editFabStyle}
                     exited={editMenuIsOpen}
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
                               isEditable={isEditable}
                               onAddClick={() => UpdateUrl(`/artworkAdder/galleryId_${galleryId}_galleryId`)}
                               onDeleteClick={() => this.setState({ deleteConfirmOpen: true })}
                               onMenuClick={this.goToGallery}
                />

                <GalleryArtwork artworkData={currentArtwork}
                                onSwipeLeft={this.goToNextArtwork}
                                onSwipeRight={this.goToPreviousArtwork}
                />

                <div className={'gallery--framedArtwork--spacer'}/>

                <div className={'gallery--controls'}>
                    <Button disabled={!previousArtwork}
                            onClick={this.goToPreviousArtwork}>
                        <Icon use={'arrow_back'}/>
                    </Button>

                    <Button className={'gallery--controls--backToGalleryButt'}
                            onClick={this.goToGallery}>
                        <Icon use={'dashboard'}/>
                    </Button>

                    <Button disabled={!nextArtwork}
                            onClick={this.goToNextArtwork}>
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
export default connect(mapStateToProps, { deleteArtwork, UpdateUrl })(GalleryArtworkViewer);

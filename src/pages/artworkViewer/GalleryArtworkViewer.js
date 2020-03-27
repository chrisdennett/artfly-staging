import React, { Component } from "react";
import { connect } from 'react-redux';
import Measure from 'react-measure';
// ui
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab'
import { SimpleDialog } from 'rmwc/Dialog';
// actions
import { deleteArtwork } from "../../actions/DeleteArtworkActions";
import { UpdateUrl } from '../../actions/UrlActions';
// selectors
import { getGalleryNavigation, getCurrentGalleryIdParam, getCurrentArtistParam, getCurrentArtworkIdParam } from '../../selectors/Selectors';
// helpers
import { ARTWORK_PATH, EDITOR_PATH, GALLERY_PATH } from "../../components/global/UTILS";
// comps
import { ArtworkAppBar } from "../../components/appBar/AppBar";
import ShowIfLongDelay from "../../components/global/showIfLongDelay/ShowIfLongDelay";
import Artwork from "./Artwork";

class GalleryArtworkViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteConfirmOpen: false, dimensions: {
                width: -1,
                height: -1,
            },
        };

        this.goToNextArtwork = this.goToNextArtwork.bind(this);
        this.goToPreviousArtwork = this.goToPreviousArtwork.bind(this);
        this.goToGallery = this.goToGallery.bind(this);
        this.goToArtworkEditor = this.goToArtworkEditor.bind(this);
    }

    goToGallery() {
        const { galleryId, artistId } = this.props;
        // const url = `/gallery/galleryId_${galleryId}_galleryId`;
        const url = GALLERY_PATH(galleryId, artistId);
        this.props.UpdateUrl(url, 'GalleryArtworkViewer > goToGallery');
    }

    goToNextArtwork() {
        const { galleryId, galleryNavData, artistId } = this.props;
        const { nextArtwork } = galleryNavData;

        if (nextArtwork) {
            const url = ARTWORK_PATH(nextArtwork.artworkId, galleryId, artistId);
            this.props.UpdateUrl(url, 'GalleryArtworkViewer > goToNextArtwork');
        }
    }

    goToPreviousArtwork() {
        const { galleryId, galleryNavData, artistId } = this.props;
        const { previousArtwork } = galleryNavData;

        if (previousArtwork) {
            const url = ARTWORK_PATH(previousArtwork.artworkId, galleryId, artistId);
            this.props.UpdateUrl(url);
        }
    }

    goToArtworkEditor() {
        const { galleryId, artworkId, artistId } = this.props;
        const url = EDITOR_PATH(galleryId, artworkId, artistId);
        this.props.UpdateUrl(url);
    }

    render() {
        const { editMenuIsOpen, deleteConfirmOpen } = this.state;
        const { galleryNavData, galleryId, deleteArtwork, UpdateUrl, artistId } = this.props;
        const { currentArtwork, previousArtwork, nextArtwork, isEditable } = galleryNavData;
        const editFabStyle = { position: 'fixed', zIndex: 999, bottom: 35, right: 10 };

        return (
            <div className={'gallery'}>

                <SimpleDialog
                    title="Confirm delete"
                    body="Are you sure you want to delete this?"
                    open={deleteConfirmOpen}
                    onClose={(e) => {
                        if (e.detail.action === 'accept') {
                            deleteArtwork(currentArtwork);
                        }
                        this.setState({ deleteConfirmOpen: false })
                    }}
                    acceptLabel={'Yes Delete'}
                    cancelLabel={'Cancel'}
                />

                {isEditable &&
                    <div style={editFabStyle}>
                        <Fab theme={'primary-bg'}
                            exited={editMenuIsOpen}
                            onClick={() => this.goToArtworkEditor()}
                            icon={'edit'} />
                    </div>
                }

                <ArtworkAppBar isEditable={isEditable}
                    onAddClick={() => UpdateUrl(EDITOR_PATH(galleryId, null, artistId))}
                    onDeleteClick={() => this.setState({ deleteConfirmOpen: true })}
                    onMenuClick={this.goToGallery}
                />

                {!currentArtwork &&
                    <ShowIfLongDelay>
                        <Typography use={'body1'} tag={'p'}>
                            This is taking a long time to load. It may no longer exist.  Or it might belong to a different artist.
                        </Typography>

                        <Button raised onClick={() => UpdateUrl(GALLERY_PATH(galleryId))}>
                            GO TO MAIN GALLERY?
                        </Button>
                    </ShowIfLongDelay>
                }

                <Measure
                    bounds
                    onResize={contentRect => {
                        this.setState({ dimensions: contentRect.bounds })
                    }}
                >
                    {({ measureRef }) => (
                        <div ref={measureRef} style={{ flex: 1 }} />
                    )}
                </Measure>

                <Artwork dimensions={this.state.dimensions}
                    artwork={currentArtwork}
                />

                <div className={'gallery--controls'}>
                    <Button disabled={!previousArtwork}
                        onClick={this.goToPreviousArtwork}>
                        <Icon icon={'arrow_back'} />
                    </Button>

                    <Button className={'gallery--controls--backToGalleryButt'}
                        onClick={this.goToGallery}>
                        <Icon icon={'dashboard'} />
                    </Button>

                    <Button disabled={!nextArtwork}
                        onClick={this.goToNextArtwork}>
                        <Icon icon={'arrow_forward'} />
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        galleryNavData: getGalleryNavigation(state),
        galleryId: getCurrentGalleryIdParam(state),
        artistId: getCurrentArtistParam(state),
        artworkId: getCurrentArtworkIdParam(state)
    }
};
export default connect(mapStateToProps, { deleteArtwork, UpdateUrl })(GalleryArtworkViewer);

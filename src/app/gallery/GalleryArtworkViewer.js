import React, { Component } from "react";
import { connect } from 'react-redux';
// ui
import { Button } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { Fab } from 'rmwc/Fab'
import { SimpleDialog } from 'rmwc/Dialog';
// helper
import { goToGallery, goToArtwork } from "../../AppNavigation";
// actions
import { deleteArtwork } from "../../actions/DeleteArtworkActions";
// selectors
import {getGalleryNavigation} from '../../selectors/Selectors';
// comps
import { ArtworkAppBar } from "../appBar/AppBar";
import GalleryArtwork from "./GalleryArtwork";
import ArtworkEditMenu from "../artworkEditor/ArtworkEditMenu";
import Redirect from "../global/Redirect";

class GalleryArtworkViewer extends Component {

    constructor(props) {
        super(props);

        this.state = { editMenuIsOpen: false, deleteConfirmOpen:false };
    }

    render() {
        const { editMenuIsOpen, deleteConfirmOpen } = this.state;
        const { galleryNavData, galleryId, deleteArtwork } = this.props;
        const { currentArtwork, previousArtwork, nextArtwork, isEditable } = galleryNavData;
        const editFabStyle = { position: 'fixed', zIndex: 10000, bottom: 35, right: 10 };

        if(currentArtwork && currentArtwork.isDeleted){
            return <Redirect to={`/gallery/galleryId_${galleryId}_galleryId`}/>
        }

        return (
            <div className={'gallery'}>

                <SimpleDialog
                    title="Confirm delete"
                    body="Are you sure you want to delete this?"
                    open={deleteConfirmOpen}
                    onClose={() => this.setState({deleteConfirmOpen: false})}
                    acceptLabel={'Yes Delete'}
                    cancelLabel={'Cancel'}
                    onAccept={() => deleteArtwork(currentArtwork)}
                    onCancel={() => console.log('Cancel')}
                />

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
                               isEditable={isEditable}
                               onDeleteClick={() => this.setState({deleteConfirmOpen: true})}
                               onMenuClick={() => goToGallery(galleryId)}
                />

                <GalleryArtwork artworkData={currentArtwork}/>
                <div className={'gallery--framedArtwork--spacer'} />

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
export default connect(mapStateToProps, {deleteArtwork})(GalleryArtworkViewer);

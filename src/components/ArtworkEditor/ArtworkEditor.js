import React, { Component } from "react";

import './artworkEditor.css';
import ImageCropAndRotate from '../ImageCropAndRotate/ImageCropAndRotate';
import ArtistSelector from "../ArtistSelector/ArtistSelector";
import Butt from "../global/Butt";
import Modal from "../global/Modal";
import Page from "../global/Page";

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);
        this.state = { deleteConfirmIsShowing: false, artworkDeleting: false };
    }

    onDeleteArtwork() {
        this.setState({ deleteConfirmIsShowing: true });
    }

    onDeleteCancel() {
        this.setState({ deleteConfirmIsShowing: false });
    }

    onDeleteConfirm() {
        this.setState({ deleteConfirmIsShowing: false, artworkDeleting: true });
        this.props.onConfirmDeleteArtwork()
    }

    /*showPictureInGallery() {
        this.setState({ imgIsSelected: false });
        this.props.history.push(`/gallery/${this.props.imageUploadInfo.artistId}/artwork/${this.props.imageUploadInfo.id}`);
        this.props.clearImageUpload();
    }*/

    render() {
        const { url, artistId, artists, onArtistSelected, onCropDataConfirm, onCropImageSave, onSaveChanges, onCancelChanges } = this.props;

        return (
            <Page hue={131} saturation={51} brightness={40} title={'Artwork Editor'}>
                <Modal title={'Delete Artwork?'} isOpen={this.state.deleteConfirmIsShowing}>
                    <p>Are you sure you want to delete the artwork?</p>
                    <Butt label={'Yes, delete it'} onClick={this.onDeleteConfirm.bind(this)}/>
                    <Butt label={'No, do not delete'} onClick={this.onDeleteCancel.bind(this)}/>
                </Modal>

                <Modal title={'Artwork deleting...'} isOpen={this.state.artworkDeleting}/>

                <section className={'page-main-section'}>
                    <h2>Artist</h2>
                    <ArtistSelector artists={artists}
                                    selectedArtistId={artistId}
                                    onArtistSelected={onArtistSelected}/>
                </section>

                <section className={'page-main-section'}>
                    <h2>Image</h2>
                    <div style={{ border: '1px solid #fff', padding: 10 }}>
                        <ImageCropAndRotate url={url}
                                            ref={instance => { this.cropper = instance; }}
                                            onCropDataConfirm={onCropDataConfirm}
                                            onCropImageSave={onCropImageSave}/>
                        <Butt label={`Crop / Rotate`} onClick={() => { this.cropper.openEditScreen(); }}/>
                    </div>
                </section>

                <section className={'page-main-section'}>
                    <Butt label={'Save'} onClick={onSaveChanges}/>
                    <Butt label={'Done'} onClick={onCancelChanges}/>
                    <Butt label={'Delete Artwork'}
                          backgroundColour={'#920000'}
                          shadowColour={'#540000'}
                          onClick={this.onDeleteArtwork.bind(this)}/>
                </section>
            </Page>
        );
    }
}

export default ArtworkEditor;
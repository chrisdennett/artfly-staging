import React, { Component } from "react";
// styles
import '../MakerStyles.css';
// components
import history from '../../global/history';
import Butt from "../../global/Butt";
import Page from "../../global/Page";
import Modal from "../../global/Modal";
import Artwork from "../../Artwork/Artwork";

class EditPicture extends Component {

    constructor() {
        super();

        this.onDeleteArtwork = this.onDeleteArtwork.bind(this);

        this.state = { deleteConfirmIsShowing: false, artworkDeleting: false }
    }

    onDeleteArtwork() {
        this.setState({ deleteConfirmIsShowing: true });
    }

    onDeleteCancel() {
        this.setState({ deleteConfirmIsShowing: false });
    }

    onDeleteConfirm() {
        this.setState({ deleteConfirmIsShowing: false, artworkDeleting: true });

        /* const { artist, artworkId } = this.props;
         const { artistId } = artist;*/

        /* this.props.deleteArtwork(artworkId, artistId, () => {
             history.push(`/gallery/${artistId}`);
         });*/
    }

    render() {
        const { isJustAdded, artist, artwork, artworkId } = this.props;

        return (

            <Page title={'Edit Artwork'}>
                <Modal title={'Delete Artwork?'} isOpen={this.state.deleteConfirmIsShowing}>
                    <p>Are you sure you want to delete the artwork?</p>
                    <Butt label={'Yes, delete it'} onClick={this.onDeleteConfirm.bind(this)}/>
                    <Butt label={'No, do not delete'} onClick={this.onDeleteCancel.bind(this)}/>
                </Modal>

                {isJustAdded &&
                    <div>Artwork Saved!</div>
                }

                <Butt onClick={() => {history.push(`/gallery/${artist.artistId}/artwork/${artworkId}`)}}>Open
                    artwork
                    in gallery
                </Butt>

                <div style={{ position: 'relative', width: 800, height: 600 }}>
                    <Artwork artwork={artwork}
                             windowSize={{ windowWidth: 800, windowHeight: 600 }}
                             allowScrollbars={true}/>
                </div>

                <img src={artwork.thumb_url} alt={'user artwork thumb'}/>
                <Butt onClick={() => history.push(`/artStudio/${artworkId}/editPhoto`)}>Edit Photo</Butt>

                <div>
                    <p>Artwork by {artist.firstName} {artist.lastName}</p>
                    <Butt onClick={() => history.push(`/artStudio/${artworkId}/editArtist`)}>Edit artist</Butt>
                </div>

                <Butt label={'Delete Artwork'}
                      backgroundColour={'#920000'}
                      shadowColour={'#540000'}
                      onClick={this.onDeleteArtwork}/>
            </Page>
        );
    }
}

export default EditPicture;
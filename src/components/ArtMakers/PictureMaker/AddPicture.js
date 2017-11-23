import React, { Component } from "react";
// components
import * as PhotoHelper from "../PhotoEditor/assets/PhotoHelper";
import history from '../../global/history';
import ArtistSelector from '../../ArtistSelector/ArtistSelector';
import PhotoEditor from "../PhotoEditor/PhotoEditor";
import Page from "../../global/Page";
import SelectPhotoButton from "../PhotoEditor/assets/SelectPhotoButton";

class AddPicture extends Component {

    constructor() {
        super();

        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onPhotoEditorCancel = this.onPhotoEditorCancel.bind(this);
        this.onUploadComplete = this.onUploadComplete.bind(this);
        this.onUploadStart = this.onUploadStart.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);

        this.state = { photoEditorOpen: false, isSaving: false, isLoading: false, selectedImg: null, selectedImgOrientation: null };
    }

    // User has selected a photo
    onPhotoSelected(e) {
        e.preventDefault();

        if (e.target.files[0]) {
            const imgFile = e.target.files[0];
            PhotoHelper.GetImage(imgFile, (img, imgOrientation) => {
                this.setState({ photoEditorOpen: true, selectedImg: img, selectedImgOrientation: imgOrientation });
            });
        }
    }

    onArtistSelected(artistId) {
        history.push(`/artStudio/new/${artistId}`);
    }

    onPhotoEditorCancel() {
        this.setState({ selectedImg: null, selectedImgOrientation: null, photoEditorOpen: false });
    }

    onUploadStart() {
        this.setState({ uploadInProgress: true });
    }

    onUploadComplete(artworkId) {
        history.push(`/artStudio/${artworkId}/justAdded`);
    }

    render() {
        const { selectedArtistId, userId } = this.props;
        const { selectedImg, selectedImgOrientation, photoEditorOpen, uploadInProgress } = this.state;
        const contentStyle = uploadInProgress ? { display: 'none' } : { display: 'inherit' };

        return (
            <Page title={'Add New Picture'}>

                {uploadInProgress &&
                <div>
                    Uploading photo...
                </div>
                }

                <div style={contentStyle}>
                    Who is the artist for this piece?
                    <ArtistSelector initialArtistId={selectedArtistId}
                                    labelText={''}
                                    onArtistSelected={this.onArtistSelected}
                                    onInitialArtistSelected={this.onArtistSelected}/>

                    {!photoEditorOpen &&
                    <SelectPhotoButton
                        uid={'cutting-board-selector'}
                        onPhotoSelect={this.onPhotoSelected}/>
                    }

                    {photoEditorOpen &&
                    <PhotoEditor img={selectedImg}
                                 isNewImage={true}
                                 initialOrientation={selectedImgOrientation}
                                 userId={userId}
                                 artistId={selectedArtistId}
                                 onCancel={this.onPhotoEditorCancel}
                                 onUploadStart={this.onUploadStart}
                                 onUploadComplete={this.onUploadComplete}/>
                    }
                </div>
            </Page>
        )
    }
}

export default AddPicture;
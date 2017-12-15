// externals
import React, { Component } from "react";
// styles
import './newArtwork.css';
// helpers
import * as PhotoHelper from "../../PhotoEditor/assets/PhotoHelper";
// components
import history from "../../../global/history";
import EmptyArtwork from "../../../Artwork/EmptyArtwork";
import ArtistSelector from '../../../ArtistSelector/ArtistSelector';
import SelectPhotoButton from "../../PhotoSelector/PhotoSelector";
import PhotoUploader from "../../PhotoUploader/PhotoUploader";

class UploadPhoto extends Component {

    constructor() {
        super();

        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onPhotoEditorCancel = this.onPhotoEditorCancel.bind(this);
        this.onUploadComplete = this.onUploadComplete.bind(this);
        this.onUploadStart = this.onUploadStart.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onPhotoUploaderEdit = this.onPhotoUploaderEdit.bind(this);

        this.state = { photoPreviewOpen: false, isSaving: false, isLoading: false, selectedImg: null, selectedImgOrientation: null };
    }

    // User has selected a photo
    onPhotoSelected(imgFile) {
        PhotoHelper.GetImage(imgFile, (img, imgOrientation) => {
            this.setState({ photoPreviewOpen: true, selectedImg: img, selectedImgOrientation: imgOrientation });
        });
    }

    onPhotoUploaderEdit(img) {
        // could use this.state.selectedImg
        this.props.onEdit(img, this.props.selectedArtistId);
    }

    onArtistSelected(artistId) {
        this.setState({artistSelected:artistId});
    }

    onPhotoEditorCancel() {
        this.setState({ selectedImg: null, selectedImgOrientation: null, photoPreviewOpen: false });
    }

    onUploadStart() {
        this.setState({ uploadInProgress: true });
    }

    onUploadComplete(artworkId) {
        history.push(`/artStudio/${artworkId}/justAdded`);
    }

    render() {
        const { width, height, selectedArtistId, userId, cuttingBoardData } = this.props;
        const { selectedImg, selectedImgOrientation, photoPreviewOpen, uploadInProgress } = this.state;

        const tempOpen = cuttingBoardData || photoPreviewOpen;

        return (
            <div className={'newArtwork'}>
                <div className={'newArtwork--content'}>


                    {!tempOpen &&
                    <SelectPhotoButton
                        uid={'new-artwork-selector'}
                        onPhotoSelect={this.onPhotoSelected}/>
                    }

                    <p>Add an artwork for:</p>
                    <ArtistSelector initialArtistId={selectedArtistId}
                                    labelText={''}
                                    onArtistSelected={this.onArtistSelected}
                                    onInitialArtistSelected={this.onArtistSelected}/>

                    {tempOpen &&
                    <PhotoUploader img={selectedImg}
                                   cuttingBoardData={cuttingBoardData}
                                   isNewImage={true}
                                   initialOrientation={selectedImgOrientation}
                                   userId={userId}
                                   artistId={selectedArtistId}
                                   onEdit={this.onPhotoUploaderEdit}
                                   onCancel={this.onPhotoEditorCancel}
                                   onUploadStart={this.onUploadStart}
                                   onUploadComplete={this.onUploadComplete}/>
                    }

                </div>
                <EmptyArtwork width={width} height={height}/>
            </div>
        );
    }
}

export default UploadPhoto;
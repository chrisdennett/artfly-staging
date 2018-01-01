// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './pictureMakerStyles.css';
// actions
import { updateArtworkImage, updateArtworkThumbnail } from '../../../../actions/UserDataActions';
// helpers
import * as ImageHelper from "../../ImageHelper";
// components
import PictureMakerControls from "./PictureMakerControls";
import ArtistUpdater from '../ArtistUpdater';
import ArtworkDeleter from "./ArtworkDeleter";
import history from "../../../global/history";
import ArtworkPreview from "./ArtworkPreview/ArtworkPreview";
import PhotoSelector from "./PhotoSelector/PhotoSelector";
import CropAndRotate from "./CropAndRotate/CropAndRotate";

class ArtMaker extends Component {

    constructor() {
        super();

        this.showArtworkInEditing = this.showArtworkInEditing.bind(this);
        this.showArtworkInGallery = this.showArtworkInGallery.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.updateArtworkState = this.updateArtworkState.bind(this);
        this.onCropAndRotateDone = this.onCropAndRotateDone.bind(this);

        this.masterCanvas = document.createElement('canvas');
        this.largeCanvas = document.createElement('canvas');
        this.thumbCanvas = document.createElement('canvas');

        this.state = { editedArtwork: null, sourceImg: null };
    }

    componentWillMount() {
        this.updateArtworkState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const { artwork } = this.props;

        if (artwork !== nextProps.artwork) {
            this.updateArtworkState(nextProps)
        }
    }

    updateArtworkState(props) {
        const { artwork, isNewArtwork } = props;

        console.log("artwork: ", artwork);

        if (artwork) {
            // set up for existing artwork

            ImageHelper.GetImageFromUrl(artwork.url, (img, widthToHeightRatio, heightToWidthRatio) => {

                this.setState({ sourceImg:img });

                ImageHelper.drawToCanvas({
                    sourceCanvas: img,
                    outputCanvas: this.masterCanvas,
                    maxOutputCanvasWidth: 960,
                    maxOutputCanvasHeight: 960
                });


                // draw to master canvas
                ImageHelper.drawToCanvas({
                    sourceCanvas: img,
                    outputCanvas: this.testCanvas,
                    maxOutputCanvasWidth: 150,
                    maxOutputCanvasHeight: 150
                });

                // const editedArtwork = { randomThing:'hello' };
                // this.setState({ selectedImg: img, selectedImgOrientation: imgOrientation, editedArtwork });
            });

        }
        else if (isNewArtwork) {
            const newArtwork = {};
            this.setState({ editedArtwork: newArtwork });
        }
    }

    getCanvasBlobData(canvas, callback) {
        canvas.toBlob((canvasBlobData) => {
            callback(canvasBlobData);
        }, 'image/jpeg', 0.95)
    }

    onCropAndRotateDone() {
        // ImageHelper.drawToCanvas({ sourceCanvas: img, outputCanvas: masterCanvas, orientation, cropPercents }, (widthToHeightRatio, heightToWidthRatio) => {
        // onCanvasInit(this.canvas, widthToHeightRatio, heightToWidthRatio);

        //source:   3000x3000 (max)
        //large:    960x960
        //medium:   640x640 // created using cloud functions
        //thumb:    150x150

        ImageHelper.drawToCanvas({
            sourceCanvas: this.masterCanvas,
            outputCanvas: this.largeCanvas,
            maxOutputCanvasWidth: 960,
            maxOutputCanvasHeight: 960
        }, () => {
            ImageHelper.drawToCanvas({
                sourceCanvas: this.masterCanvas,
                outputCanvas: this.thumbCanvas,
                maxOutputCanvasWidth: 150,
                maxOutputCanvasHeight: 150
            }, () => {
                ImageHelper.drawToCanvas({
                    sourceCanvas: this.masterCanvas,
                    outputCanvas: this.testCanvas,
                    maxOutputCanvasWidth: 150,
                    maxOutputCanvasHeight: 150
                }, (widthToHeightRatio, heightToWidthRatio) => {

                    let masterCanvasBlob, largeCanvasBlob, thumbCanvasBlob;

                    this.getCanvasBlobData(this.masterCanvas, (masterCanvasData) => {
                        masterCanvasBlob = masterCanvasData;

                        this.getCanvasBlobData(this.thumbCanvas, (thumbCanvasData) => {
                            thumbCanvasBlob = thumbCanvasData;

                            const {artwork, artist} = this.props;

                            this.props.updateArtworkImage(artwork.artworkId, artist.artistId, masterCanvasBlob, widthToHeightRatio, heightToWidthRatio, (saveProgressData) => {
                                if (saveProgressData.status === 'complete') {
                                    this.props.updateArtworkThumbnail(artwork.artworkId, artist.artistId, thumbCanvasBlob, (thumbSaveProgress) => {
                                        if (thumbSaveProgress.status === 'complete') {
                                            console.log("thumbSaveProgress.status: ", thumbSaveProgress.status);
                                        }
                                    })
                                }
                            });
                        })

                    });


                    // this.props.updateArtworkImage(artwork.artworkId, artist.artistId);
                });
            });
        });
    }

    onPhotoSelected(imgFile) {
        ImageHelper.GetImage(imgFile, (img, imgOrientation) => {

            // draw to master canvas
            ImageHelper.drawToCanvas({
                sourceCanvas: img,
                outputCanvas: this.masterCanvas,
                orientation: imgOrientation,
                maxOutputCanvasWidth: 150,
                maxOutputCanvasHeight: 150
            });


            // const editedArtwork = { randomThing:'hello' };

            // this.setState({ selectedImg: img, selectedImgOrientation: imgOrientation, editedArtwork });
        });
    }

    showArtworkInEditing() {
        history.push(`/artStudio/${this.props.artworkId}`);
    }

    showArtworkInGallery() {
        history.push(`/gallery/${this.props.artist.artistId}`);
    }

    /*onPhotoEditorDone(newData) {
        if (this.props.artworkId === 'new') {
            // send to photo uploader with new flag
            this.setState({ cuttingBoardData: newData }, () => {
                history.push(`/artStudio/${this.props.artworkId}/uploadPhoto`);
            });
        }
        else {
            this.setState({ cuttingBoardData: newData }, () => {
                history.push(`/artStudio/${this.props.artworkId}/uploadPhoto`);
            });
        }
    }*/

    render() {
        let { userId, isNewArtwork, windowSize, artworkId, currentEditScreen, artist } = this.props;
        const { editedArtwork, selectedImg, selectedImgOrientation } = this.state;

        const maxWidth = windowSize ? windowSize.windowWidth : 0;
        const maxHeight = windowSize ? windowSize.windowHeight : 0;

        if (!currentEditScreen) currentEditScreen = 'artworkPreview';

        if (isNewArtwork && !selectedImg) currentEditScreen = 'uploadPhoto';
        const artistId = artist ? artist.artistId : null;

        return (
            <div className='pictureMaker'>

                <div className={'testCanvasHolder'}>
                    <canvas ref={(canvas) => this.testCanvas = canvas}
                            className={'testCanvas'}/>
                </div>

                <ArtworkPreview masterCanvas={this.masterCanvas}
                                artwork={editedArtwork}
                                selectedImgOrientation={selectedImgOrientation}
                                selectedImg={selectedImg}/>

                <div className='pictureMaker--sidebar'>
                    <PictureMakerControls artistId={artistId}
                                          isNewArtwork={isNewArtwork}
                                          artworkId={artworkId}/>
                </div>

                <div className='pictureMaker--main'>

                    {currentEditScreen === 'uploadPhoto' &&
                    <PhotoSelector
                        uid={'new-artwork-selector'}
                        onPhotoSelect={this.onPhotoSelected}/>
                    }

                    {/*{currentEditScreen === 'uploadPhoto' &&
                        <UploadPhoto width={maxWidth}
                                     height={maxHeight}
                                     userId={userId}
                                     onEdit={this.onPhotoUploaderEdit}
                                     cuttingBoardData={cuttingBoardData}
                                     selectedArtistId={selectedArtistId}
                                     onUploadComplete={this.showArtworkInEditing}/>
                        }*/}

                    {currentEditScreen === 'artworkPreview' &&
                    <div>ArtworkPreview goes here</div>
                    }

                    {/*{currentEditScreen === 'editPhoto' &&
                        <PhotoEditor isNewImage={isNewArtwork}
                                     artworkId={artworkId}
                                     userId={userId}
                                     url={artworkUrl}
                                     img={photoUploaderImg}
                                     onDone={this.onPhotoEditorDone}
                                     onCancel={this.showArtworkInEditing}/>
                        }*/}

                    {currentEditScreen === 'editPhoto' &&
                    <CropAndRotate masterCanvas={this.masterCanvas}
                                   sourceImg={this.state.sourceImg}
                                   onCancel={this.showArtworkInEditing}
                                   onDone={this.onCropAndRotateDone}
                                   width={maxWidth}
                                   height={maxHeight}/>
                    }

                    {currentEditScreen === 'deleteArtwork' &&
                    <ArtworkDeleter artworkId={artworkId}
                                    artist={artist}
                                    onDeleteArtworkComplete={this.showArtworkInGallery}
                                    onDeleteArtworkCancel={this.showArtworkInEditing}/>
                    }

                    {currentEditScreen === 'editArtist' &&
                    <ArtistUpdater artworkId={artworkId}
                                   initialArtistId={editedArtwork.artistId}
                                   manageUpload={true}
                                   onCancel={this.showArtworkInEditing}
                                   onUpdateComplete={this.showArtworkInEditing}/>
                    }
                </div>

            </div>

        )
    }
}

const mapActionsToProps = { updateArtworkImage, updateArtworkThumbnail };
export default connect(null, mapActionsToProps)(ArtMaker);

/*
return (
    <div>

        {artworkId === 'new' &&
        <AddPicture userId={userId}
                    selectedArtistId={selectedArtistId}/>
        }

        {artworkId !== 'new' && artwork &&
        <EditPicture currentEditScreen={currentEditScreen}
                     windowSize={windowSize}
                     userId={userId}
                     artist={artist}
                     artworkId={artworkId}
                     artwork={artwork}/>
        }

    </div>
)
 */
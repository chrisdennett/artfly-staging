import React, { Component } from 'react';
import { connect } from 'react-redux';
// styles
import './artwork_styles.css';
// helpers
import DefaultArtworkDataGenerator from "./DefaultArtworkDataGenerator";
import * as ImageHelper from "../global/ImageHelper";
//actions
import { getArtworkDataOnce, updateArtwork, addArtwork } from "../../actions/UserDataActions";
//comps
import QuickArtworkMaker from '../QuickArtworkMaker/QuickArtworkMaker';
import QuickArtwork from "../QuickArtworkMaker/quickArtwork/QuickArtwork";
import ScrollbarRemover from "../global/ScrollbarRemover";
// Constants
const defaultArtworkData = DefaultArtworkDataGenerator();

class Artwork extends Component {

    constructor(props) {
        super(props);

        this.updateMasterCanvas = this.updateMasterCanvas.bind(this);
        this.loadArtwork = this.loadArtwork.bind(this);
        this.onArtworkEditorDataChange = this.onArtworkEditorDataChange.bind(this);
        this.onArtworkEditorSave = this.onArtworkEditorSave.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onCanvasOrientationChange = this.onCanvasOrientationChange.bind(this);

        this.state = { currentTool: 'upload', artworkData: {}, unsavedArtworkData: {} };
    }

    componentWillMount() {
        const { artworkId, artworks } = this.props;
        if (!artworkId) {
            this.setState({ unsavedArtworkData: defaultArtworkData });
        }
        // If there's an artwork id in the url, load in the artwork
        else if (artworks[artworkId]) {
            // if the artworkData is already available use it
            this.loadArtwork(artworks[artworkId]);
        }
        else {
            // otherwise load it in once
            this.props.getArtworkDataOnce(artworkId, (artworkData) => {
                this.loadArtwork(artworkData);
            })
        }
    }

    onPhotoSelected(imgFile) {
        ImageHelper.GetImage(imgFile,
            (sourceImg, imgOrientation) => {
                this.updateMasterCanvas(sourceImg, imgOrientation);
            });
    }

    onCanvasOrientationChange(newData) {
        this.updateMasterCanvas(this.state.sourceImg, newData.orientation, newData.cropData);
    }

    loadArtwork(artworkData) {
        this.setState({ artworkData }, () => {
            let img = new Image();
            img.setAttribute('crossOrigin', 'anonymous'); //
            img.src = artworkData.url;
            img.onload = () => {
                this.updateMasterCanvas(img, artworkData.orientation)
            }
        })
    }

    updateMasterCanvas(sourceImg, orientation, cropData = {}) {
        const masterCanvas = this.state.masterCanvas || document.createElement('canvas');

        ImageHelper.drawImageToCanvas({ sourceImg, outputCanvas: masterCanvas, orientation },
            (widthToHeightRatio, heightToWidthRatio) => {
                this.setState((state) => {
                    const newCropData = { ...state.artworkData.cropData, ...cropData };
                    const newArtworkData = { ...state.artworkData, cropData: newCropData, orientation, widthToHeightRatio, heightToWidthRatio };

                    return {
                        sourceImg,
                        masterCanvas,
                        artworkData: newArtworkData
                    }
                });
            })
    }

    onArtworkEditorDataChange(updatedData) {
        this.setState((state) => {
            return {
                unsavedArtworkData: { ...state.unsavedArtworkData, ...updatedData }
            }
        })
    }

    onArtworkEditorSave() {
        // combined saved and unsaved data and update artwork.
        const { artworkData, unsavedArtworkData, sourceImg } = this.state;
        const { artworkId, user } = this.props;
        const newArtworkData = { ...artworkData, ...unsavedArtworkData };

        if (artworkId) {
            this.props.updateArtwork(artworkId, newArtworkData);
        }
        else {
            this.getImageBlob(sourceImg, 3000, (blobData) => {
                this.props.addArtwork(user.uid, blobData, newArtworkData);
            })
        }
    }

    getImageBlob(sourceImg, maxSize, callback) {
        const canvas = document.createElement('canvas');

        // not providing crop data and orientation because now keeping source as is
        // instead the crop data and orientation is being saved with artwork data
        // and applied each time artwork viewed
        // This way edits are non-destructive.

        ImageHelper.drawToCanvas({
            sourceCanvas: sourceImg,
            outputCanvas: canvas,
            maxOutputCanvasWidth: maxSize,
            maxOutputCanvasHeight: maxSize
        }, (widthToHeightRatio, heightToWidthRatio) => {

            canvas.toBlob((canvasBlobData) => {
                callback(canvasBlobData, widthToHeightRatio, heightToWidthRatio)
            }, 'image/jpeg', 0.95);

        });
    }

    render() {
        const { width, height, user, artworkId } = this.props;
        const { artworkData, unsavedArtworkData, masterCanvas, sourceImg } = this.state;
        const currentArtworkData = { ...artworkData, ...unsavedArtworkData };
        const allowEditing = user.uid && user.uid === artworkData.adminId;
        const isNewArtwork = !artworkId;

        return (
            <ScrollbarRemover showScrollbars={false}>

                {(isNewArtwork || allowEditing) &&
                <QuickArtworkMaker artworkData={currentArtworkData}
                                   onPhotoSelected={this.onPhotoSelected}
                                   onArtworkDataChange={this.onArtworkEditorDataChange}
                                   onCanvasOrientationChange={this.onCanvasOrientationChange}
                                   onArtworkSave={this.onArtworkEditorSave}
                                   sourceImg={sourceImg}
                                   masterCanvas={masterCanvas}/>
                }

                {!allowEditing &&
                <QuickArtwork height={height}
                              width={width}
                              isFixed={true}
                              artworkData={currentArtworkData}
                              masterCanvas={masterCanvas}
                />
                }
            </ScrollbarRemover>
        )
    }
}

const mapStateToProps = (state) => {
    let width = 100, height = 100;
    if (state.ui.windowSize) {
        width = state.ui.windowSize.windowWidth;
        height = state.ui.windowSize.windowHeight;
    }

    return {
        artworks: state.artworks,
        user: state.user,
        width,
        height
    }
};

const mapActionsToProps = { getArtworkDataOnce, updateArtwork, addArtwork };

export default connect(mapStateToProps, mapActionsToProps)(Artwork);

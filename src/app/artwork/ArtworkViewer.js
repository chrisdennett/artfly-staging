import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarIcon } from 'rmwc/Toolbar';
import { SimpleDialog } from 'rmwc/Dialog';
import { Button } from 'rmwc/Button';
// styles
import './artworkViewer_styles.css';
// helpers
import DefaultArtworkDataGenerator from "./DefaultArtworkDataGenerator";
import * as ImageHelper from "../global/ImageHelper";
//actions
import {
    getArtworkDataOnce,
    updateArtwork,
    addArtwork,
    deleteArtwork,
    sendNotification,
    endNotification
} from "../../actions/UserDataActions";
// images
import IconFrameSize from './../images/icons/frame-size.png';
import IconFrameColour from './../images/icons/frame-colour.png';
import IconPeople from './../images/icons/people.png';
import IconCropRotate from './../images/icons/crop-rotate.png';
//comps
import history from './../global/history';
import ArtworkOptions from '../artworkOptions/ArtworkOptions';
import Link from "../global/Butt/Link";
import IconLogo from "../global/icon/icons/IconLogo";
// import SignInOut from '../SignInOut/SignInOut';
import ArtworkContainer from "./ArtworkContainer";
import ArtworkOptionsToolBar from "../artworkOptions/artworkOptionsToolBar/ArtworkOptionsToolBar";
import ArtworkViewerToolbar from "./ArtworkViewerToolbar";
// Constants
const defaultArtworkData = DefaultArtworkDataGenerator();

const artworkOptions = {
    frame: {
        index: 0,
        name: 'Frame Size',
        icon: IconFrameSize
    },
    frameColour: {
        index: 1,
        name: 'Frame Colour',
        icon: IconFrameColour
    },
    people: {
        index: 2,
        name: 'People',
        icon: IconPeople
    },
    crop: {
        index: 3,
        name: 'Crop & Rotate',
        useFullPage: true,
        icon: IconCropRotate
    }
};

class ArtworkViewer extends Component {

    constructor(props) {
        super(props);

        this.updateMasterCanvas = this.updateMasterCanvas.bind(this);
        this.loadArtwork = this.loadArtwork.bind(this);
        this.onArtworkEditorDataChange = this.onArtworkEditorDataChange.bind(this);
        this.onArtworkEditorSave = this.onArtworkEditorSave.bind(this);
        this.onArtworkUndoChanges = this.onArtworkUndoChanges.bind(this);
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
        this.onCanvasOrientationChange = this.onCanvasOrientationChange.bind(this);
        this.onArtworkDeleteConfirm = this.onArtworkDeleteConfirm.bind(this);
        this.onToolSelect = this.onToolSelect.bind(this);
        this.onEditOpenChange = this.onEditOpenChange.bind(this);

        this.state = {
            artworkData: {},
            unsavedArtworkData: {},
            currentOptionIndex: 0,
            isEditOpen: false
        };
    }

    // Loads artwork or configures for adding new artwork.
    componentWillMount() {
        const { artworkId, artworks } = this.props;
        // If there's no artworkId it's been opened to add a new artwork
        if (!artworkId) {
            this.setState({ unsavedArtworkData: defaultArtworkData });
        }
        // If there's an artwork id in the url, load in the artwork
        else if (artworks[artworkId]) {
            // if the artworkData is already available use it
            this.loadArtwork(artworks[artworkId]);
        }
        // otherwise load the artwork data from the server
        else {
            this.props.getArtworkDataOnce(artworkId, (artworkData) => {
                this.loadArtwork(artworkData);
            }, () => {
                // artwork not found
                history.push('/');
            }, () => {
                // error loading the artwork
                console.log("error loading that not found");
            })
        }
    }

    // Draw uploaded images to the master canvas
    // NB: Crop data isn't reset so will use any existing crop data
    onPhotoSelected(imgFile) {
        ImageHelper.GetImage(imgFile,
            (sourceImg, imgOrientation) => {
                this.updateMasterCanvas(sourceImg, imgOrientation);
            });
    }

    // The source image remains at its original orientation
    // it is draw to the master canvas with the updated orientation
    onCanvasOrientationChange(newData) {
        this.setState((state) => {
            return {
                unsavedArtworkData: { ...state.unsavedArtworkData, ...newData }
            }
        }, () => {
            this.updateMasterCanvas(this.state.sourceImg, newData.orientation, newData.cropData);
        })
    }

    // Loads in artwork Image from the server using the saved url
    // NB Currently loading in the source image - should use a smaller image
    loadArtwork(artworkData) {
        this.props.sendNotification("Loading image...", (timeStamp) => {

            this.setState({ artworkData }, () => {
                let img = new Image();
                img.setAttribute('crossOrigin', 'anonymous'); //
                img.src = artworkData.url;
                img.onload = () => {
                    this.updateMasterCanvas(img, artworkData.orientation);

                    this.props.endNotification(timeStamp);
                }
            })
        });
    }

    // Draws the selected or loaded image to an off-screen canvas
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

    // TODO REVERSE THE EMPHASIS OF THIS - updateContainsChanges
    updateWillNotChangeData(existingObject, objectContainingChanges) {
        // for each key of obj2 exists in obj1 and the value is the same
        let doesMatch = true;
        if (!objectContainingChanges || Object.keys(objectContainingChanges).length < 1) {
            return doesMatch;
        }

        const objectContainingChangesKeys = Object.keys(objectContainingChanges);
        const existingObjectKeys = Object.keys(existingObject);

        // if number of keys don't match a change must have happend
        if (objectContainingChangesKeys.length !== existingObjectKeys.length) {
            doesMatch = false;
            return doesMatch;
        }

        for (let key of objectContainingChangesKeys) {
            if (existingObject.hasOwnProperty(key) === false) {
                doesMatch = false;
                break;
            }
            else {
                const currExistingProp = existingObject[key];
                const currChangedProp = objectContainingChanges[key];

                if (Array.isArray(currChangedProp)) {
                    // as each thing in the array could be an array or an object
                    // need to recursively call self for each
                    for (let i = 0; i < currChangedProp.length; i++) {
                        doesMatch = this.updateWillNotChangeData({ testProp: currExistingProp[i] }, { testProp: currChangedProp[i] });
                        if (!doesMatch) break;
                    }
                }
                else if (typeof currExistingProp === 'object') {
                    doesMatch = this.updateWillNotChangeData(currExistingProp, currChangedProp);
                }
                else if (currExistingProp !== currChangedProp) {
                    doesMatch = false;
                }
                if (!doesMatch) break;
            }
        }

        return doesMatch;
    }

    // Keeps any changes from the editor in state.
    onArtworkEditorDataChange(updatedData) {
        this.setState((state) => {
                return {
                    unsavedArtworkData: { ...state.unsavedArtworkData, ...updatedData }
                }
            },
            () => {
                // if orientation has changed need to redraw canvas
                if (updatedData.hasOwnProperty('orientation')) {
                    const { cropData: currentCropData } = this.state.artworkData;
                    const { cropData: unsavedCropData } = this.state.unsavedArtworkData;
                    const latestCropData = { ...currentCropData, ...unsavedCropData };

                    this.updateMasterCanvas(this.state.sourceImg, updatedData.orientation, latestCropData);
                }
            }
        )
    }

    // Clears local state changes - reverting to last saved data
    onArtworkUndoChanges() {
        this.setState({ unsavedArtworkData: {} });
        // if the artwork orientation has changed, need to redraw the master canvas
        this.updateMasterCanvas(this.state.sourceImg, this.state.artworkData.orientation, this.state.artworkData.cropData);
    }

    // Updates existing artwork data with the unsaved data
    onArtworkEditorSave() {
        // combined saved and unsaved data and update artwork.
        const { artworkData, unsavedArtworkData, sourceImg } = this.state;
        const { artworkId, user } = this.props;

        let newArtworkData = { ...artworkData, ...unsavedArtworkData };

        this.props.sendNotification('Saving artwork...', (timeStamp) => {
            // if editing an artwork, just update the data
            if (artworkId) {
                this.props.updateArtwork(artworkId, newArtworkData, () => {
                    this.props.endNotification(timeStamp);
                });
            }
            // otherwise add a new artwork including the image.
            else {
                this.getImageBlob(sourceImg, 3000, (blobData) => {
                    this.props.addArtwork(user.uid, blobData, newArtworkData, () => {
                        this.props.endNotification(timeStamp);
                    });
                })
            }

            this.setState({ artworkData: newArtworkData, unsavedArtworkData: {} });
        })
    }

    // Deletes artwork and navigates back to the home screen
    onArtworkDeleteConfirm() {
        const { artworkId } = this.state.artworkData;

        this.props.sendNotification("Deleting artwork...", (timeStamp) => {
            this.props.deleteArtwork(artworkId, () => {
                history.push('/');
                this.props.endNotification(timeStamp);
            });
        })
    }

    // Gets blob from canvas for saving.
    getImageBlob(sourceImg, maxSize, callback) {
        const canvas = document.createElement('canvas');

        // not providing crop data and orientation because keeping source as is
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

    // Coordinates the current tool
    onToolSelect(selectedIndex) {
        this.setState({ currentOptionIndex: selectedIndex })
    }

    // Opens and closes the editor
    onEditOpenChange(isEditOpen) {
        if (isEditOpen) {
            this.setState({ isEditOpen })
        }
        // if closing the editor need to ensure the option selected doesn't require the full screen
        else {
            this.setState({ isEditOpen, currentOptionIndex: 0 })
        }
    }

    render() {
        const { user, artworkId } = this.props;
        const { artworkData, unsavedArtworkData, masterCanvas, sourceImg, currentOptionIndex, isEditOpen } = this.state;
        const currentArtworkData = { ...artworkData, ...unsavedArtworkData };

        const isNewArtwork = !artworkId;
        const userIsAdmin = isNewArtwork || (user.uid && user.uid === artworkData.adminId);

        const isNewArtworkWithoutImage = isNewArtwork && !sourceImg;
        const hasUnsavedChanges = !isNewArtworkWithoutImage && userIsAdmin && !this.updateWillNotChangeData(artworkData, unsavedArtworkData);

        const currentEditingOptionKey = Object
            .keys(artworkOptions)
            .find(key => {
                const opt = artworkOptions[key];
                return opt.index === currentOptionIndex
            });
        const currentArtworkOption = artworkOptions[currentEditingOptionKey];
        const { useFullPage: editingOptionUsesFullPage } = currentArtworkOption;

        let optionStyle = editingOptionUsesFullPage ? { flex: 1, display: 'flex', flexDirection: 'column' } : optionStyle;

        return (
            <div className={'artworkViewer'}>
                <ArtworkViewerToolbar isEditOpen={isEditOpen}
                                      hasUnsavedChanges={hasUnsavedChanges}
                                      onEditOpenChange={this.onEditOpenChange}
                                      onArtworkEditorSave={this.onArtworkEditorSave}
                                      onArtworkUndoChanges={this.onArtworkUndoChanges}
                                      onArtworkDeleteConfirm={this.onArtworkDeleteConfirm}
                />

                {!editingOptionUsesFullPage &&
                <ArtworkContainer onPhotoSelected={this.onPhotoSelected}
                                  isNewArtwork={isNewArtwork}
                                  artworkData={currentArtworkData}
                                  masterCanvas={masterCanvas}
                />
                }

                {userIsAdmin && isEditOpen &&
                <ArtworkOptions artworkData={currentArtworkData}
                                style={optionStyle}
                                artworkOptions={artworkOptions}
                                currentOptionIndex={currentOptionIndex}
                                onToolSelect={this.onToolSelect}
                                onArtworkDataChange={this.onArtworkEditorDataChange}
                                onCanvasOrientationChange={this.onCanvasOrientationChange}
                                onArtworkSave={this.onArtworkEditorSave}
                                sourceImg={sourceImg}
                                masterCanvas={masterCanvas}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artworks: state.artworks,
        user: state.user
    }
};
const mapActionsToProps = { getArtworkDataOnce, updateArtwork, addArtwork, deleteArtwork, sendNotification, endNotification };
export default connect(mapStateToProps, mapActionsToProps)(ArtworkViewer);
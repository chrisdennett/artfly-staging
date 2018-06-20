import React, { Component } from 'react';
import { connect } from 'react-redux';
// styles
import './artworkViewer_styles.css';
// helpers
import DefaultArtworkDataGenerator from "./DefaultArtworkDataGenerator";
import * as ImageHelper from "../global/ImageHelper";
//actions
import { listenForIndividualArtworkChanged } from '../../actions/GetArtworkActions';
import { deleteArtwork } from '../../actions/DeleteArtworkActions';
// import { addArtwork, updateArtwork } from '../../actions/SaveArtworkActions';
import { updateArtwork } from '../../actions/SaveArtworkActions';
// images
import IconFrameSize from './../images/icons/frame-size.png';
import IconFrameColour from './../images/icons/frame-colour.png';
import IconPeople from './../images/icons/people.png';
import IconCropRotate from './../images/icons/crop-rotate.png';
//comps
import history from './../global/history';
import ArtworkOptions from '../artworkOptions/ArtworkOptions';
import ArtworkContainer from "./ArtworkContainer";
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
        this.setup = this.setup.bind(this);

        this.state = {
            unsavedArtworkData: {},
            currentOptionIndex: 0,
            isEditOpen: false,
            masterCanvas: document.createElement('canvas')
        };
    }

    // Loads artwork or configures for adding new artwork.
    componentWillReceiveProps(props){
        this.setup(props);
    }

    componentWillMount(){
        this.setup(this.props);
    }

    setup(props) {
        const { artworkId, currentArtworkData } = props;
        // If there's no artworkId it's been opened to add a new artwork
        if (!artworkId) {
            this.setState({ unsavedArtworkData: defaultArtworkData });
        }
        // If there's an artwork id in the url, load in the artwork
        else if (currentArtworkData) {
            // if the artworkData is already available use it
            this.loadArtwork(currentArtworkData);
        }
        // otherwise load the artwork data from the server
        else {
            this.props.listenForIndividualArtworkChanged(artworkId, (artworkData) => {
                this.loadArtwork(artworkData);
            }, () => {
                // artwork not found - may have been deleted or incorrect url
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
            (sourceImg, orientation) => {
                this.updateMasterCanvas(sourceImg, orientation, (widthToHeightRatio, heightToWidthRatio) => {
                    this.setState({
                        sourceImg,
                        unsavedArtworkData: {
                            ...this.state.unsavedArtworkData,
                            widthToHeightRatio, heightToWidthRatio,
                            orientation
                        }
                    });
                });
            });
    }

    // The source image remains at its original orientation
    // it is draw to the master canvas with the updated orientation
    onCanvasOrientationChange(newData) {
        // update the state and canvas
        const { sourceImg, unsavedArtworkData } = this.state;

        this.updateMasterCanvas(sourceImg, newData.orientation, (widthToHeightRatio, heightToWidthRatio) => {
            this.setState({
                unsavedArtworkData: { ...unsavedArtworkData, ...newData, widthToHeightRatio, heightToWidthRatio }
            });
        });
    }

    // Loads in artwork Image from the server using the saved url
    // NB Currently loading in the source image - should use a smaller image
    loadArtwork(artworkData) {
        if(this.state.sourceImg) return;

        this.setState({ artworkData }, () => {
            let sourceImg = new Image();
            sourceImg.setAttribute('crossOrigin', 'anonymous'); //
            sourceImg.src = artworkData.largeUrl ? artworkData.largeUrl : artworkData.sourceUrl;
            sourceImg.onload = () => {
                this.updateMasterCanvas(sourceImg, artworkData.orientation, () => {
                    this.setState({
                        sourceImg
                    });
                });
            }
        })
    }

    // Draws the selected or loaded image to an off-screen canvas
    // In doing so, generates new width to height ratios
    updateMasterCanvas(sourceImg, orientation, callback) {
        ImageHelper.drawImageToCanvas({ sourceImg, outputCanvas: this.state.masterCanvas, orientation },
            (widthToHeightRatio, heightToWidthRatio) => {
                if (callback) callback(widthToHeightRatio, heightToWidthRatio);
            })
    }

    // TODO REVERSE THE EMPHASIS OF THIS - updateContainsChanges
    updateWillNotChangeData(existingObject, objectContainingChanges) {
        // if there's no change object or it has not properties there can't be changes
        let doesMatch = true;
        /*if (!objectContainingChanges || Object.keys(objectContainingChanges).length < 1) {
            return doesMatch;
        }*/

        // if the object being tested doesn't exist and there are changes it must be a change
        if (!existingObject && objectContainingChanges ) {
            doesMatch = false;
            return doesMatch;
        }
        else if (!objectContainingChanges) {
            doesMatch = false;
            return doesMatch;
        }

        // loop through the change properties to see if they exist and if there are
        // the same in the existing object
        const objectContainingChangesKeys = Object.keys(objectContainingChanges);
        for (let key of objectContainingChangesKeys) {
            // if the existing object doesn't contain the property, there must be a change
            if (existingObject.hasOwnProperty(key) === false) {
                doesMatch = false;
                break;
            }
            else {
                const currExistingProp = existingObject[key];
                const currChangedProp = objectContainingChanges[key];

                // Don't think I'm using arrays any more, but left this in just in case
                // I want to add them.
                if (Array.isArray(currChangedProp)) {
                    // as each thing in the array could be an array or an object
                    // need to recursively call self for each
                    for (let i = 0; i < currChangedProp.length; i++) {
                        doesMatch = this.updateWillNotChangeData({ testProp: currExistingProp[i] }, { testProp: currChangedProp[i] });

                        if (!doesMatch) break;
                    }
                }
                // if the property is an object use recursion to check all its properties
                else if (typeof currExistingProp === 'object') {
                    doesMatch = this.updateWillNotChangeData(currExistingProp, currChangedProp);
                }
                // check the value
                else if (currExistingProp !== currChangedProp) {
                    doesMatch = false;
                }
                // only care if there's at least one change so break out if doesn't match
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
                    const { cropData: currentCropData } = this.props.currentArtworkData;
                    const { cropData: unsavedCropData } = this.state.unsavedArtworkData;
                    const latestCropData = { ...currentCropData, ...unsavedCropData };

                    this.updateMasterCanvas(this.state.sourceImg, updatedData.orientation, (widthToHeightRatio, heightToWidthRatio) => {
                        this.setState({
                            unsavedArtworkData: { ...this.state.unsavedArtworkData, cropData: latestCropData, widthToHeightRatio, heightToWidthRatio }
                        });
                    });
                }
            }
        )
    }

    // Clears local state changes - reverting to last saved data
    onArtworkUndoChanges() {
        this.setState({ unsavedArtworkData: {} });
        // if the artwork orientation has changed, need to redraw the master canvas
        this.updateMasterCanvas(this.state.sourceImg, this.props.currentArtworkData.orientation);
    }

    // Updates existing artwork data with the unsaved data
    // Images are all made with the source image so all usage of
    // saved images will need to implement the crop and rotation
    // saved in the data.
    onArtworkEditorSave() {
        // combined saved and unsaved data and update artwork.
        const { unsavedArtworkData } = this.state;
        const { artworkId, currentArtworkData } = this.props;
        const newArtworkData = { ...currentArtworkData, ...unsavedArtworkData };

        // if editing an artwork, just update the data
        this.props.sendNotification('Saving artwork...', (timeStamp) => {
            if (artworkId) {
                this.props.updateArtwork(artworkId, newArtworkData, () => {
                    this.props.endNotification(timeStamp);
                });
            }
            // otherwise add a new artwork including the image.
            else {
                /*this.props.addArtwork(
                    user.uid, newArtworkData, sourceImg
                    ,
                    (artworkId) => {
                        this.props.endNotification(timeStamp);

                        // clear unsaved data otherwise otherwise it won't re-render and
                        // will continue to show the save and undo buttons.
                        this.setState({unsavedArtworkData:{}});

                        history.push(`/artwork/${artworkId}`);
                    });*/
            }
        });

        this.setState({ unsavedArtworkData: {} });
    }

    // Deletes artwork and navigates back to the home screen
    onArtworkDeleteConfirm() {
        const { currentArtworkData } = this.props;

        this.props.sendNotification("Deleting artwork...", (timeStamp) => {
            this.props.deleteArtwork(currentArtworkData, true, () => {
                history.push('/');
                this.props.endNotification(timeStamp);
            });
        })
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
        const { user, artworkId, currentArtworkData } = this.props;
        const { unsavedArtworkData, masterCanvas, sourceImg, currentOptionIndex, isEditOpen } = this.state;
        const combinedArtworkData = { ...currentArtworkData, ...unsavedArtworkData };

        const isNewArtwork = !artworkId || !currentArtworkData;
        const userIsAdmin = isNewArtwork || (user.uid && user.uid === currentArtworkData.adminId);

        const isNewArtworkWithoutImage = isNewArtwork && !sourceImg;
        const hasUnsavedChanges = !isNewArtworkWithoutImage && userIsAdmin && !this.updateWillNotChangeData(currentArtworkData, unsavedArtworkData);

        const currentEditingOptionKey = Object
            .keys(artworkOptions)
            .find(key => {
                const opt = artworkOptions[key];
                return opt.index === currentOptionIndex
            });
        const currentArtworkOption = artworkOptions[currentEditingOptionKey];
        const { useFullPage: editingOptionUsesFullPage } = currentArtworkOption;

        let optionStyle = editingOptionUsesFullPage ? { flex: 1, display: 'flex', flexDirection: 'column' } : {};

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
                                  isNewArtworkWithoutImage={isNewArtworkWithoutImage}
                                  artworkData={combinedArtworkData}
                                  masterCanvas={masterCanvas}
                />
                }

                {userIsAdmin && isEditOpen && currentArtworkData &&
                <ArtworkOptions artworkData={combinedArtworkData}
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

const mapStateToProps = (state, props) => {
    const { artworkId } = props;
    let currentArtworkData = artworkId ? state.artworks[artworkId] : null;
    // initially an empty object is set up, but it's easier to treat that as null.
    if (currentArtworkData && Object.keys(currentArtworkData).length === 0) {
        currentArtworkData = null;
    }

    return {
        artworks: state.artworks,
        user: state.user,
        currentArtworkData: currentArtworkData
    }
};
// const mapActionsToProps = { listenForIndividualArtworkChanged, updateArtwork, addArtwork, deleteArtwork, sendNotification, endNotification };
const mapActionsToProps = { listenForIndividualArtworkChanged, updateArtwork, deleteArtwork, sendNotification, endNotification };
export default connect(mapStateToProps, mapActionsToProps)(ArtworkViewer);
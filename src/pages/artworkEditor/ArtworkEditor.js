import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './artworkEditor_styles.css';
// actions
import { UpdateUrl } from "../../actions/UrlActions";
// helpers
import {
    createMaxSizeCanvas,
    createEditedCanvas
} from "../../editors/canvasCreators";
import { getAllEditOptions, getOrderedEditArray } from "../../editors/EditUtils";
import { getEdit } from '../../EDITS';
// comps
import LoadingThing from "../../components/loadingThing/LoadingThing";
import ArtworkEditorAppBar from "./artworkEditorAppBar/ArtworkEditorAppBar";
import { MAX_IMG_SIZE } from "../../GLOBAL_CONSTANTS";
import EditSideSelector from "./EditSideSelector";
import Editor from "../../editors/editor/Editor";
import EditMiniNav from "../../editors/editMiniNav/EditMiniNav";
import { ARTWORK_PATH, loadImage } from "../../components/global/UTILS";
//
import fancyFrameSpriteSheet from "../../editors/frameEditor/spritesheet.png";

class ArtworkEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentEditKey: null,
            isShowingEditSideBar: !props.isNewArtwork,
            newSourceCanvas: null,
            unsavedEdits: null,
            newEditOrder: null,
            unsavedEditData: null,
            frameAssetsLoaded: false,
        };

        this.onClose = this.onClose.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.createCurrentCanvas2 = this.createCurrentCanvas2.bind(this);
        this.onEditDashboardChange = this.onEditDashboardChange.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.onSelectEdit = this.onSelectEdit.bind(this);
        this.onNewSourceImageSelected = this.onNewSourceImageSelected.bind(this);
    }

    componentDidMount() {
        document.body.classList.toggle('no-scroll-bars', true);

        if (this.props.sourceCanvas) {

            if (this.props.isNewArtwork) {
                this.setState({ currentEditKey: this.props.editData.editOrder[0] }, () => this.createCurrentCanvas())
            }
            else {
                this.createCurrentCanvas();
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.sourceCanvas !== this.props.sourceCanvas) {
            this.createCurrentCanvas();
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll-bars');
    }

    createCurrentCanvas() {
        if (this.state.frameAssetsLoaded) {
            this.createCurrentCanvas2();
        }
        else {
            loadImage(fancyFrameSpriteSheet, (img) => {
                this.setState({ frameSpriteSheet: img, frameAssetsLoaded: true }, () => {
                    this.createCurrentCanvas2();
                })
            })
        }

    }

    createCurrentCanvas2() {
        const { frameSpriteSheet } = this.state;
        const { sourceCanvas: originalSourceCanvas, editData, isNewArtwork } = this.props;
        const { newSourceCanvas, currentEditKey: _currentEditKey, unsavedEdits, unsavedEditData, newEditOrder } = this.state;

        // use the new source canvas if it has been changed otherwise use the original.
        const sourceCanvas = newSourceCanvas ? newSourceCanvas : originalSourceCanvas;

        if (!sourceCanvas) {
            return;
        }

        const mergedEditData = { ...editData.edits, ...unsavedEdits, ...unsavedEditData };
        const editOrder = newEditOrder ? newEditOrder : editData.editOrder;

        const editIndex = isNewArtwork ? 0 : editOrder.length - 1;
        const currentEditKey = _currentEditKey ? _currentEditKey : editOrder[editIndex];
        const editsArray = getOrderedEditArray(mergedEditData, editOrder);
        let editsBeforeCurrent = [];

        for (let edit of editsArray) {
            if (edit.key !== currentEditKey) {
                editsBeforeCurrent.push(edit);
            }
            else {
                break;
            }
        }

        const canvasEditedUpToCurrent = createEditedCanvas(editsBeforeCurrent, sourceCanvas, frameSpriteSheet);
        const currentCanvas = createMaxSizeCanvas(canvasEditedUpToCurrent, 900, 900);
        this.setState({ currentCanvas });
    }

    onClose() {
        const { galleryId, artworkId, artistId } = this.props;
        this.props.UpdateUrl(ARTWORK_PATH(artworkId, galleryId, artistId));
    }

    onSave() {
        const { unsavedEdits, unsavedEditData, newEditOrder, newSourceCanvas, frameSpriteSheet } = this.state;
        const { onSaveEditData, editData } = this.props;

        const dataChangeOnly = isDataChangeOnly(unsavedEdits, unsavedEditData);

        const mergedEdits = { ...editData.edits, ...unsavedEdits, ...unsavedEditData };
        const editOrder = newEditOrder ? newEditOrder : editData.editOrder;
        // we only want to store the edits referenced in the edit order and so ignoring any that
        // have been deleted
        let updatedEdits = {};
        for (let id of editOrder) {
            updatedEdits[id] = mergedEdits[id];
        }
        const newEditData = { ...editData, edits: updatedEdits, editOrder };

        onSaveEditData(newEditData, editOrder, newSourceCanvas, dataChangeOnly, frameSpriteSheet);
    }

    onNewSourceImageSelected(img) {
        const newSourceCanvas = createMaxSizeCanvas(img, MAX_IMG_SIZE, MAX_IMG_SIZE);
        this.setState({ newSourceCanvas }, () => {
            this.createCurrentCanvas();
        });
    }

    onEditDashboardChange({ newEditOrder, newEdits, currentEditKey }) {
        let newState = { newEditOrder };

        if (newEdits) {
            newState.unsavedEdits = { ...this.state.unsavedEdits, ...newEdits };
        }

        if (currentEditKey) {
            newState.currentEditKey = currentEditKey;
        }

        this.setState(newState, () => {
            this.createCurrentCanvas()
        });
    }

    onEditChange(newEditData) {
        let updatedEdits = { ...this.state.unsavedEditData };
        updatedEdits[newEditData.key] = newEditData;

        this.setState({ unsavedEditData: updatedEdits });
    }

    onSelectEdit(editKey) {
        this.setState({ currentEditKey: editKey }, () => this.createCurrentCanvas())
    }

    onCancel() {
        if (this.props.isNewArtwork) {
            this.props.onCancelNewArtwork();
        }
        else {
            // if the currentEditKey exists in the previously saved data
            // keep it selected, otherwise set it to null.
            const { editData } = this.props;
            const { currentEditKey } = this.state;
            const editKey = editData.editOrder.indexOf(currentEditKey) !== -1 ? currentEditKey : null;

            this.setState({ unsavedEditData: null, newEditOrder: null, newSourceCanvas: null, unsavedEdits: null, currentEditKey: editKey }, () => {
                this.createCurrentCanvas();
            });
        }
    }

    render() {
        const { editData, isNewArtwork } = this.props;

        if (!editData) return null;

        const { unsavedEdits, newEditOrder, currentEditKey: _currentEditKey, unsavedEditData, currentCanvas, newSourceCanvas } = this.state;

        const hasChanges = !!unsavedEditData || !!unsavedEdits || isNewArtwork || newSourceCanvas || newEditOrder;
        const mergedEditData = { ...editData.edits, ...unsavedEdits, ...unsavedEditData };
        const currEditOrder = newEditOrder ? newEditOrder : editData.editOrder;

        const editIndex = isNewArtwork ? 0 : currEditOrder.length - 1;

        const currentEditKey = _currentEditKey ? _currentEditKey : currEditOrder[editIndex];
        const currentEditValue = mergedEditData[currentEditKey];
        const editors = getAllEditOptions();

        const currentEditIndex = currEditOrder.indexOf(currentEditKey);
        const totalEdits = currEditOrder.length;

        const { editFunction, Controls, CustomEditor } = getEdit(currentEditValue.type);

        return (
            <EditSideSelector editors={editors}
                isOpen={this.state.isShowingEditSideBar}
                edits={mergedEditData}
                editOrder={currEditOrder}
                currentEditKey={currentEditKey}
                onEditSelect={editKey => this.onSelectEdit(editKey)}
                onEditsChange={this.onEditDashboardChange}>

                <div className={'labApp artworkEditorBg'}>
                    <ArtworkEditorAppBar hasChanges={hasChanges}
                        isOpen={this.state.isShowingEditSideBar}
                        onNavToggle={() => this.setState({ isShowingEditSideBar: !this.state.isShowingEditSideBar })}
                        onCloseClick={this.onClose}
                        onSaveClick={this.onSave}
                        onCancelClick={this.onCancel} />

                    {!currentCanvas &&
                        <LoadingThing />
                    }

                    {CustomEditor &&
                        <CustomEditor editData={currentEditValue}
                            frameSpriteSheet={this.state.frameSpriteSheet}
                            sourceCanvas={currentCanvas}
                            editFunction={editFunction}
                            onNewSourceImageSelected={this.onNewSourceImageSelected}
                            onChange={this.onEditChange}
                        />
                    }

                    {!CustomEditor &&
                        <Editor editData={currentEditValue}
                            frameSpriteSheet={this.state.frameSpriteSheet}
                            sourceCanvas={currentCanvas}
                            editFunction={editFunction}
                            Controls={Controls}
                            onNewSourceImageSelected={this.onNewSourceImageSelected}
                            onChange={this.onEditChange}
                        />
                    }

                    <EditMiniNav
                        onNext={() => this.onSelectEdit(currEditOrder[currentEditIndex + 1])}
                        onPrevious={() => this.onSelectEdit(currEditOrder[currentEditIndex - 1])}
                        onFinish={() => hasChanges ? this.onSave() : this.onClose()}
                        hasChanges={hasChanges}
                        isOpen={this.state.isShowingEditSideBar}
                        onNavToggle={() => this.setState({ isShowingEditSideBar: !this.state.isShowingEditSideBar })}
                        showFinishButton={currentEditIndex === totalEdits - 1}
                        disablePrevious={currentEditIndex === 0} />

                </div>
            </EditSideSelector>
        )
    }
}

export default connect(null, { UpdateUrl })(ArtworkEditor);


const isDataChangeOnly = (unsavedEdits, unsavedEditData) => {

    // if the only change is the label it's only a data change
    let constainsNewImageEdit = false;
    let constainsImageEditChange = false;

    if (unsavedEdits) {
        constainsNewImageEdit = Object.keys(unsavedEdits).filter(editId =>
            unsavedEdits[editId].type !== 'label'
        ).length > 0;
    }

    if (unsavedEditData) {
        constainsImageEditChange = Object.keys(unsavedEditData).filter(editId =>
            unsavedEditData[editId].type !== 'label'
        ).length > 0;
    }

    if (constainsNewImageEdit || constainsImageEditChange) {
        return false;
    }
    else {
        return true;
    }
}
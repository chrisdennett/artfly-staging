import React, { Component } from "react";
// styles
import './editDashboard_styles.css';
// ui
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Elevation } from '@rmwc/elevation';
import { Icon } from '@rmwc/icon';
import { IconButton } from '@rmwc/icon-button';
// helpers
import { generateUID } from "../../../components/global/UTILS";
import EditOptionButton from "./EditOptionButton";
import { Typography } from "@rmwc/typography";

const EDIT_ID_PREFIX = '_current';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getListStyle = isDraggingOver => ({
    height: '100%',
    overflow: 'auto',
    background: isDraggingOver ? 'lightblue' : 'whitesmoke'
});

const getBinDropStyle = isDraggingOver => ({
    background: isDraggingOver ? '#982020' : 'whitesmoke',
    color: '#982020',
    minHeight: 60,
    borderTop: '1px solid rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

class EditDashboard extends Component {
    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // deleting it
        if (destination.droppableId === 'deleteBox') {
            this.onDeleteEdit(result.draggableId);
            return;
        }

        // if it's a new edit, change order and edits
        if (source.droppableId === 'newEditOptions') {
            const newEditKey = result.draggableId;
            const editOption = this.props.editors[`${newEditKey}`];
            const newEditId = generateUID();
            const editToAddWithKey = { ...editOption, key: newEditId };
            const newEdits = { [newEditId]: editToAddWithKey };

            const newEditOrder = [...this.props.editOrder];

            const numberOfLockedInitialEdits = 1;
            const insertIndex = destination.index + numberOfLockedInitialEdits;
            newEditOrder.splice(insertIndex, 0, newEditId);

            this.props.onEditsChange({ newEditOrder, newEdits, currentEditKey: newEditId });
            return;
        }

        // otherwise they are just changing the current edit order
        if (source.droppableId === 'currentEdits') {
            const newEditOrder = reorder(
                this.props.editOrder,
                source.index,
                destination.index
            );

            this.props.onEditsChange({ newEditOrder });
        }
    };

    onDeleteEdit = editIdToDelete => {
        // remove from the edits order - save is based on order not edits
        const idWithoutPrefix = editIdToDelete.split(EDIT_ID_PREFIX)[0];
        const newEditOrder = this.props.editOrder.filter(id => id !== idWithoutPrefix);

        // if selected/current edit has been deleted changed to last edit
        const currentEditDeleted = newEditOrder.indexOf(this.props.currentEditKey) === -1;
        if (currentEditDeleted) {
            const currentEditKey = currentEditDeleted ? newEditOrder[newEditOrder.length - 1] : this.props.currentEditKey;
            this.props.onEditsChange({ newEditOrder, currentEditKey });
        }
        // otherwise keep it the same and just change the order
        else {
            this.props.onEditsChange({ newEditOrder });
        }
    };

    render() {
        const { editors, edits, editOrder, showAdd = false } = this.props;

        const containsLabelEdit = editOrder.filter(key => edits[key].type === 'label').length > 0;
        const containsFrameEdit = editOrder.filter(key => edits[key].type === 'frame').length > 0;

        // Don't allow multiple label or frame edits.
        const allEditKeys = Object.keys(editors);
        const allowedEditKeys = allEditKeys.filter(editKey => {
            if (containsLabelEdit && editors[editKey].type === 'label') {
                return false;
            }
            else if (containsFrameEdit && editors[editKey].type === 'frame') {
                return false;
            }

            return true;
        });

        return (
            <div className={`editDashboard ${showAdd ? 'editDashboard--withBg' : ''}`}>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className={'editDashboard--currentEditList'}>
                        <Droppable droppableId="currentEdits">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>
                                    {editOrder.map((key, index) => {

                                        // don't include the add pic in the draggable set
                                        if (index === 0) {
                                            return (
                                                <div key={key + EDIT_ID_PREFIX}
                                                    style={{ padding: 5, background: 'rgba(0,0,0,.1)', cursor: 'pointer' }}>
                                                    <EditOptionButton
                                                        editType={edits[key].type}
                                                        isSelected={key === this.props.currentEditKey}
                                                        onClick={() => this.props.onEditSelect(key)} />
                                                </div>
                                            )
                                        }

                                        return (
                                            <Draggable
                                                key={key + EDIT_ID_PREFIX}
                                                draggableId={key + EDIT_ID_PREFIX}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div

                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{ ...provided.draggableProps.style, padding: 5 }}>
                                                        <EditOptionButton
                                                            editType={edits[key].type}

                                                            isDragging={snapshot.isDragging}
                                                            isSelected={key === this.props.currentEditKey}
                                                            onClick={() => this.props.onEditSelect(key)} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    }
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId="deleteBox">
                            {
                                (provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getBinDropStyle(snapshot.isDraggingOver)}>

                                        {!snapshot.isDraggingOver &&
                                            <Icon icon="delete_forever" />
                                        }

                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    </div>

                    {showAdd &&
                        <Droppable droppableId="newEditOptions"
                            isDropDisabled={true}>
                            {(provided) => (
                                <div className={'editDashboard--addEditList'}>
                                    <Elevation z={14}
                                        className={'editDashboard--addEditList--panel'}>

                                        <div
                                            className={'editDashboard--addEditList--panel--header'}>
                                            <Typography use={'button'}>
                                                Drag to add
                                            </Typography>
                                            <IconButton icon="close"
                                                label="close add edit panel"
                                                onClick={() => this.props.onClose()}
                                            />
                                        </div>

                                        <div ref={provided.innerRef}
                                            className={'editDashboard--addEditList--panel--content'}>

                                            {allowedEditKeys.map((key, index) => (
                                                <Draggable
                                                    key={key}
                                                    draggableId={key}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ ...provided.draggableProps.style, padding: 5, display: 'flex' }}>

                                                            <EditOptionButton
                                                                editType={editors[key].type}
                                                                isDragging={snapshot.isDragging}
                                                                isSelected={true} />

                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </Elevation>
                                </div>
                            )}
                        </Droppable>
                    }
                </DragDropContext>
            </div>
        );
    }
}

export default EditDashboard;
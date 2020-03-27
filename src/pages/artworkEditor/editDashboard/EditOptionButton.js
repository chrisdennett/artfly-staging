import React from 'react';
// styles
import './editOptionButton_styles.css';
import { getEditIcon, getEditName } from "../../../EDITS";

const EditOptionButton = ({ editType, editId, onClick, isSelected, isDragging }) => {
    const EditIcon = getEditIcon(editType);
    const name = getEditName(editType);
    const classes = isSelected ? 'edit-menu-item edit-menu-item--selected' : 'edit-menu-item';
    const style = isDragging ? { boxShadow: '5px 5px 10px rgba(0,0,0,0.3)', background:'#22666d', color:'whitesmoke' } : {};

    return (
        <div key={editId}
             className={classes}
             onClick={onClick}
             style={style}
        >

            <EditIcon />

            <div className={'edit-menu-item--label'}>
                {name}
            </div>

        </div>
    )
};

export default EditOptionButton;
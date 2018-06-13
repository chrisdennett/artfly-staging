import React from 'react';
// ui
import { TextField, TextFieldHelperText } from 'rmwc/TextField';

const GalleryHomeEditor = () => {
    const style = {backgroundColor: '#fff', padding: '0 15px'};

    return (
        <div style={style}>
            <TextField fullwidth label="Gallery title..." />
            <TextFieldHelperText>Optional help text.</TextFieldHelperText>

            <TextField fullwidth label="Gallery subtitle..." />
            <TextFieldHelperText>Optional help text.</TextFieldHelperText>
        </div>
    )
};

export default GalleryHomeEditor;
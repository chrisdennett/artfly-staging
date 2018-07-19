import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from "lodash/isEqual";
// ui
import { TextField, TextFieldHelperText } from 'rmwc/TextField';
// styles
import './galleryEditor_styles.css';
// actions
import { updateGallery } from '../../actions/GalleryDataActions';
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import { EditAppBar } from "../appBar/AppBar";
import LoadingThing from "../loadingThing/LoadingThing";
// constants
import { MAX_GALLERY_TITLE_LENGTH, MAX_GALLERY_SUBTITLE_LENGTH } from '../global/GLOBAL_CONSTANTS';

class GalleryEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { unsavedGalleryData: {} };

        this.onGalleryTitleChange = this.onGalleryTitleChange.bind(this);
        this.onGallerySubtitleChange = this.onGallerySubtitleChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        if (this.textInput) this.textInput.focus();
    }

    onGalleryTitleChange(newTitle) {
        if (newTitle.length >= 0 && newTitle.length <= MAX_GALLERY_TITLE_LENGTH) {
            let updatedData = { ...this.state.unsavedGalleryData, title: newTitle };
            this.setState({ unsavedGalleryData: updatedData });
        }
    }

    onGallerySubtitleChange(newSubtitle) {
        if (newSubtitle.length >= 0 && newSubtitle.length <= MAX_GALLERY_SUBTITLE_LENGTH) {
            let updatedData = { ...this.state.unsavedGalleryData, subtitle: newSubtitle };
            this.setState({ unsavedGalleryData: updatedData });
        }
    }

    onSave() {
        const { currentGallery, updateGallery, onClose } = this.props;
        const { unsavedGalleryData } = this.state;
        const newGalleryData = { ...currentGallery, ...unsavedGalleryData };

        updateGallery(currentGallery.galleryId, newGalleryData);

        onClose();
    }

    render() {
        const { currentGallery, onClose } = this.props;

        const { unsavedGalleryData } = this.state;
        const mergedData = { ...currentGallery, ...unsavedGalleryData };
        const hasChanges = currentGallery && !isEqual(mergedData, currentGallery);

        const titleCharacters = mergedData.title ? mergedData.title.length : '...';
        const titleHelperText = `${titleCharacters} of ${MAX_GALLERY_TITLE_LENGTH}`;

        const subtitleCharacters = mergedData.subtitle ? mergedData.subtitle.length : '...';
        const subtitleHelperText = `${subtitleCharacters} of ${MAX_GALLERY_SUBTITLE_LENGTH}`;

        const helperTextStyle = { margin: 0 };

        return (
            <div>
                <EditAppBar title={'Edit Gallery'}
                            fixed={true}
                            hasChanges={hasChanges}
                            onSaveClick={this.onSave}
                            onCancelClick={() => this.setState({ unsavedGalleryData: {} })}
                            onCloseClick={onClose}
                />

                {!currentGallery &&
                <div className={'gallery--loader'}>
                    <LoadingThing/>
                </div>
                }

                {currentGallery &&
                <div className={'gallery--header'} style={{ backgroundColor: 'white' }}>

                    <TextField className={'gallery--title'}
                               inputRef={(input) => { this.textInput = input }}
                               fullwidth
                               onChange={(e) => this.onGalleryTitleChange(e.target.value)}
                               value={mergedData.title}/>
                    <TextFieldHelperText style={helperTextStyle}>
                        {titleHelperText}
                    </TextFieldHelperText>

                    <TextField className={'gallery--subtitle'}
                               fullwidth
                               value={mergedData.subtitle}
                               onChange={(e) => this.onGallerySubtitleChange(e.target.value)}/>
                    <TextFieldHelperText style={helperTextStyle}>
                        {subtitleHelperText}
                    </TextFieldHelperText>
                </div>
                }
            </div>
        )
    }
}

export default connect(null, { updateGallery, UpdateUrl })(GalleryEditor);
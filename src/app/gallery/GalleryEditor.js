import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from "lodash/isEqual";
// ui
import { TextField, TextFieldHelperText } from 'rmwc/TextField';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
// styles
import './galleryEditor_styles.css';
// actions
import { updateGallery } from '../../actions/GalleryDataActions';
import { UpdateUrl } from "../../actions/UrlActions";
// comps
import { getGallery } from "../../selectors/Selectors";
import { EditAppBar } from "../appBar/AppBar";
import LoadingThing from "../loadingThing/LoadingThing";
import GalleryTitles from "./GalleryTitles";
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

    onGalleryTitleChange(newTitle) {
        if (newTitle.length > 0 && newTitle.length <= MAX_GALLERY_TITLE_LENGTH) {
            let updatedData = { ...this.state.unsavedGalleryData, title: newTitle };
            this.setState({ unsavedGalleryData: updatedData });
        }
    }

    onGallerySubtitleChange(newSubtitle) {
        if (newSubtitle.length > 0 && newSubtitle.length <= MAX_GALLERY_SUBTITLE_LENGTH) {
            let updatedData = { ...this.state.unsavedGalleryData, subtitle: newSubtitle };
            this.setState({ unsavedGalleryData: updatedData });
        }
    }

    onSave() {
        const { currentGallery, updateGallery } = this.props;
        const { unsavedGalleryData } = this.state;
        const newGalleryData = { ...currentGallery, ...unsavedGalleryData };

        updateGallery(currentGallery.galleryId, newGalleryData);
    }

    render() {
        const { currentGallery, UpdateUrl } = this.props;
        const { unsavedGalleryData } = this.state;
        const mergedData = { ...currentGallery, ...unsavedGalleryData };
        const hasChanges = currentGallery && !isEqual(mergedData, currentGallery);

        const titleCharacters = mergedData.title ? mergedData.title.length : '...';
        const titleHelperText = `${titleCharacters} of ${MAX_GALLERY_TITLE_LENGTH}`;

        const subtitleCharacters = mergedData.subtitle ? mergedData.subtitle.length : '...';
        const subtitleHelperText = `${subtitleCharacters} of ${MAX_GALLERY_SUBTITLE_LENGTH}`;

        return (
            <div className={'galleryEditor'}>
                <EditAppBar title={'Edit Gallery'}
                            hasChanges={hasChanges}
                            onSaveClick={this.onSave}
                            onCancelClick={() => this.setState({ unsavedGalleryData: {} })}
                            onCloseClick={() => UpdateUrl(`/gallery/galleryId_${currentGallery.galleryId}_galleryId`)}
                />

                {!currentGallery &&
                <LoadingThing/>
                }

                <div className={'galleryEditor--titlesHolder'}>
                    <GalleryTitles title={mergedData.title}
                                   subtitle={mergedData.subtitle}/>
                </div>

                {currentGallery &&
                <div className={'galleryEditor--controls'}>

                    <Typography theme={'secondary'}
                                use={'button'}
                                tag={'div'}
                                className={'galleryEditor--controls--title'}>
                        <Icon use={'edit'}/>
                        Edit Gallery titles:
                    </Typography>

                    <div className={'galleryEditor--textFieldHolder'}>
                        <TextField placeholder="Title..."
                                   required
                                   fullwidth
                                   value={mergedData.title}
                                   onChange={(e) => this.onGalleryTitleChange(e.target.value)}
                        />
                    </div>
                    <TextFieldHelperText persistent
                                         className={'galleryEditor--textFieldHelper'}
                    >
                        {titleHelperText}
                    </TextFieldHelperText>

                    <div className={'galleryEditor--textFieldHolder'}>
                        <TextField placeholder="Subtitle..."
                                   fullwidth
                                   value={mergedData.subtitle}
                                   onChange={(e) => this.onGallerySubtitleChange(e.target.value)}
                        />
                    </div>
                    <TextFieldHelperText persistent
                                         className={'galleryEditor--textFieldHelper'}
                    >
                        {subtitleHelperText}
                    </TextFieldHelperText>

                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentGallery: getGallery(state, props)
    }
};
export default connect(mapStateToProps, { updateGallery, UpdateUrl })(GalleryEditor);
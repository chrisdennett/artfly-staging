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
// comps
import { getGallery } from "../../selectors/Selectors";
import { EditAppBar } from "../appBar/AppBar";
import LoadingThing from "../loadingThing/LoadingThing";
import GalleryTitles from "./GalleryTitles";
import { goToGallery } from "../../AppNavigation";
import GalleryEditorSavingProgress from "./GalleryEditorSavingProgress";

class GalleryEditor extends Component {

    constructor(props) {
        super(props);

        this.state = { unsavedGalleryData: {} };

        this.onGalleryDataChange = this.onGalleryDataChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onGalleryDataChange(newdata) {
        const updatedData = { ...this.state.unsavedGalleryData, ...newdata };
        this.setState({ unsavedGalleryData: updatedData });
    }

    onSave() {
        const {currentGallery, updateGallery} = this.props;
        const {unsavedGalleryData} = this.state;
        const newGalleryData = { ...currentGallery, ...unsavedGalleryData };

        updateGallery(currentGallery.galleryId, newGalleryData);
    }


    render() {
        const { currentGallery } = this.props;
        const { unsavedGalleryData } = this.state;
        const mergedData = { ...currentGallery, ...unsavedGalleryData };
        const hasChanges = currentGallery && !isEqual(mergedData, currentGallery);

        const titleCharacters = mergedData.title ? mergedData.title.length : '...';
        const titleHelperText = `${titleCharacters} of 42 chars`;

        return (
            <div className={'galleryEditor'}>
                <EditAppBar title={'Edit Gallery'}
                            hasChanges={hasChanges}
                            onSaveClick={this.onSave}
                            onCancelClick={() => this.setState({ unsavedGalleryData: {} })}
                            onCloseClick={() => goToGallery(currentGallery.galleryId)}
                />

                {currentGallery &&
                <GalleryEditorSavingProgress status={currentGallery.status}
                                             redirectTo={`/gallery/galleryId_${currentGallery.galleryId}_galleryId`}/>
                }

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
                                   onChange={(e) => this.onGalleryDataChange({ title: e.target.value })}
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
                                   onChange={(e) => this.onGalleryDataChange({ subtitle: e.target.value })}
                        />
                    </div>
                    <TextFieldHelperText persistent
                                         className={'galleryEditor--textFieldHelper'}
                    >
                        Optional help text.
                    </TextFieldHelperText>

                </div>
                }


            </div>
        )
    }
};

const mapStateToProps = (state, props) => {
    return {
        currentGallery: getGallery(state, props)
    }
};
export default connect(mapStateToProps, { updateGallery })(GalleryEditor);
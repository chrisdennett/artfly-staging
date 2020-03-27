import React, { Component } from "react";
import { connect } from 'react-redux';
import { getCurrentArtwork, getArtworkEdits, getUserArtists, getCurrentGalleryIdParam, getCurrentArtistParam, getCurrentArtworkIdParam, getNewArtworkParam } from "../../selectors/Selectors";
// actions
import { updateUserAccount } from '../../actions/UserAccountActions';
import {
    updateArtworkAndImage,
    addNewArtwork,
    updateArtworkData,
    updateArtworkAndSourceImage
} from '../../actions/SaveArtworkActions';
import { UpdateUrl } from "../../actions/UrlActions";
// helpers
import {
    createEditedCanvas,
    createMaxSizeCanvas
} from "../../editors/canvasCreators";
import { getOrderedEditArray } from "../../editors/EditUtils";
import {
    ARTWORK_PATH,
    GALLERY_PATH,
    loadImage,
    getDimensionRatios,
    containsNonBlankText
} from "../../components/global/UTILS";
// constants
import { LARGE_IMG_SIZE, MAX_IMG_SIZE } from "../../GLOBAL_CONSTANTS";
// comps
import NewArtworkCreator from "../newArtworkCreator/NewArtworkCreator";
import ArtworkEditor from "../artworkEditor/ArtworkEditor";

class ArtworkMaker extends Component {

    constructor(props) {
        super(props);

        this.state = { sourceCanvas: null, newArtworkEditData: null };

        this.setupSourceCanvas = this.setupSourceCanvas.bind(this);
        this.onCreateNewArtwork = this.onCreateNewArtwork.bind(this);
        this.onSaveEditData = this.onSaveEditData.bind(this);
        this.onNewArtworkCancel = this.onNewArtworkCancel.bind(this);
        this.onEditorCancel = this.onEditorCancel.bind(this);
    }

    componentDidMount() {
        if (this.props.artworkData) {
            this.setupSourceCanvas();
        };
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (!prevProps.artworkData && this.props.artworkData) {
            this.setupSourceCanvas();
        }
    }

    setupSourceCanvas() {
        const { artworkData } = this.props;
        const { sourceUrl } = artworkData;
        loadImage(sourceUrl, img => {
            const sourceCanvas = createMaxSizeCanvas(img, MAX_IMG_SIZE, MAX_IMG_SIZE);
            this.setState({ sourceCanvas });
        });
    }

    onCreateNewArtwork(img, editData) {
        const sourceCanvas = createMaxSizeCanvas(img, MAX_IMG_SIZE, MAX_IMG_SIZE);
        this.setState({ sourceCanvas, newArtworkEditData: editData });
    }

    onNewArtworkCancel() {
        const { galleryId, artistId } = this.props;
        this.props.UpdateUrl(GALLERY_PATH(galleryId, null, artistId));
    }

    onSaveEditData(newEditData, editOrder, newSourceCanvas, dataChangeOnly, frameSpriteSheet) {
        const { isNewArtwork } = this.props;
        const { sourceCanvas: originalCanvas } = this.state;

        const sourceCanvas = newSourceCanvas ? newSourceCanvas : originalCanvas;

        const editsAsArray = getOrderedEditArray(newEditData.edits, editOrder);
        const artworkCanvas = createEditedCanvas(editsAsArray, sourceCanvas, frameSpriteSheet);
        const largeImgCanvas = createMaxSizeCanvas(artworkCanvas, LARGE_IMG_SIZE, LARGE_IMG_SIZE);
        const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(artworkCanvas.width, artworkCanvas.height);

        /*
        * If the newEditData contains label data
        * overwrite the title, description and artistId in artwork data.
        */
        let labelDataToAdd = {};
        let artworkArtist = this.props.artistId;
        const labelEdit = Object.keys(newEditData.edits).filter(editId =>
            newEditData.edits[editId].type === 'label'
        )[0];

        if (labelEdit) {
            const { age, artist, title } = newEditData.edits[labelEdit];
            labelDataToAdd = {};
            if (age && containsNonBlankText(age + '')) {
                labelDataToAdd.age = age;
            }

            if (title && containsNonBlankText(title)) {
                labelDataToAdd.title = title;
            }

            if (artist && containsNonBlankText(artist)) {
                labelDataToAdd.artist = artist;
                artworkArtist = artist;

                // check artist name in accounts
                const { artists } = this.props;
                const artistAlreadyListed = artists.filter(currentArtist => currentArtist.name === artist).length > 0;

                // if it isn't... add it
                if (artistAlreadyListed === false) {
                    let updatedArtists = [...artists];
                    updatedArtists.push({ name: artist });

                    this.props.updateUserAccount(null, { artists: updatedArtists })
                }
            }
            else {
                // the artist may have been removed
                labelDataToAdd.artist = null;
                artworkArtist = null;
            }
        }
        // no label edit may mean it has beed deleted
        else {
            labelDataToAdd.artist = null;
            labelDataToAdd.title = null;
            labelDataToAdd.age = null;
            artworkArtist = null;
        }

        const newArtworkData = {
            editData: newEditData,
            outputWidthToHeightRatio: widthToHeightRatio,
            outputHeightToWidthRatio: heightToWidthRatio,
            ...labelDataToAdd
        };

        if (isNewArtwork) {
            this.props.addNewArtwork(sourceCanvas, largeImgCanvas, newArtworkData, (artworkId) => {
                this.props.UpdateUrl(ARTWORK_PATH(artworkId, this.props.galleryId, artworkArtist));
            })
        }
        else {
            const { artworkData } = this.props;
            const { artworkId } = artworkData;
            const updatedArtworkData = { ...artworkData, ...newArtworkData };

            if (newSourceCanvas) {
                this.props.updateArtworkAndSourceImage(sourceCanvas, largeImgCanvas, updatedArtworkData, artworkId, () => {
                    this.props.UpdateUrl(ARTWORK_PATH(artworkId, this.props.galleryId, artworkArtist));
                })
            }
            else if (dataChangeOnly) {
                this.props.updateArtworkData(artworkId, updatedArtworkData, () => {
                    this.props.UpdateUrl(ARTWORK_PATH(artworkId, this.props.galleryId, artworkArtist));
                })
            }
            else {
                this.props.updateArtworkAndImage(largeImgCanvas, updatedArtworkData, artworkId, () => {
                    this.props.UpdateUrl(ARTWORK_PATH(artworkId, this.props.galleryId, artworkArtist));
                })
            }
        }
    }

    onEditorCancel() {
        this.setState({ sourceCanvas: null, newArtworkEditData: null })
    }

    render() {
        const { galleryId, artworkId, editData: currentEditData, artistId, isNewArtwork } = this.props;
        const { newArtworkEditData } = this.state;
        const { sourceCanvas } = this.state;


        const editData = currentEditData ? currentEditData : newArtworkEditData;
        const editorProps = { galleryId, artworkId, sourceCanvas, editData, isNewArtwork, artistId };

        const showNewArtworkOptions = isNewArtwork && !newArtworkEditData;

        return (
            <div>
                {showNewArtworkOptions &&
                    <NewArtworkCreator galleryId={galleryId}
                        artistId={artistId}
                        onCreateNewArtwork={this.onCreateNewArtwork}
                        onCancel={this.onNewArtworkCancel}
                    />
                }

                {!showNewArtworkOptions &&
                    <ArtworkEditor {...editorProps}
                        onCancelNewArtwork={this.onEditorCancel}
                        onSaveEditData={this.onSaveEditData}
                    />
                }
            </div>
        );
    }
}

// TODO: CONSIDER including the edits in artwork. Or not getting artwork data at all
// and just updating edits object.
const mapStateToProps = state => {
    return {
        artworkData: getCurrentArtwork(state),
        editData: getArtworkEdits(state),
        artists: getUserArtists(state),
        galleryId: getCurrentGalleryIdParam(state),
        artworkId: getCurrentArtworkIdParam(state),
        isNewArtwork: getNewArtworkParam(state),
        artistId: getCurrentArtistParam(state),
    }
};

const mapActionsToProps = {
    updateUserAccount,
    updateArtworkAndImage,
    updateArtworkAndSourceImage,
    updateArtworkData,
    addNewArtwork,
    UpdateUrl
}

export default connect(mapStateToProps, mapActionsToProps)(ArtworkMaker);
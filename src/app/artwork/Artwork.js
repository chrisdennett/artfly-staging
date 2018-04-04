import React, { Component } from 'react';
import { connect } from 'react-redux';
//
import './artwork_styles.css';
//
import QuickArtworkMaker from '../QuickArtworkMaker/QuickArtworkMaker';
import QuickArtwork from "../QuickArtworkMaker/quickArtwork/QuickArtwork";
import * as ImageHelper from "../global/ImageHelper";
import DefaultArtworkDataGenerator from "../QuickArtworkMaker/DefaultArtworkDataGenerator";
import { getArtworkDataOnce, updateArtwork } from "../../actions/UserDataActions";
import ScrollbarRemover from "../global/ScrollbarRemover";
// Constants
const defaultArtworkData = DefaultArtworkDataGenerator();

class Artwork extends Component {

    constructor(props) {
        super(props);

        this.updateMasterCanvas = this.updateMasterCanvas.bind(this);
        this.loadArtwork = this.loadArtwork.bind(this);
        this.onArtworkEditorDataChange = this.onArtworkEditorDataChange.bind(this);
        this.onArtworkEditorSave = this.onArtworkEditorSave.bind(this);

        this.state = { currentTool: 'upload', artworkData: defaultArtworkData, unsavedArtworkData: {} };
    }

    componentWillMount() {
        const { artworkId, artworks } = this.props;
        if (!artworkId) return;

        // If there's an artwork id in the url, load in the artwork
        if (artworks[artworkId]) {
            // if the artworkData is already available use it
            this.loadArtwork(artworks[artworkId]);
        }
        else {
            // otherwise load it in once
            this.props.getArtworkDataOnce(artworkId, (artworkData) => {
                this.loadArtwork(artworkData);
            })
        }
    }

    loadArtwork(artworkData) {
        this.setState({ artworkData }, () => {
            let img = new Image();
            img.setAttribute('crossOrigin', 'anonymous'); //
            img.src = artworkData.url;
            img.onload = () => {
                this.updateMasterCanvas(img, artworkData.orientation)
            }
        })
    }

    updateMasterCanvas(sourceImg, orientation) {
        const masterCanvas = document.createElement('canvas');

        ImageHelper.drawImageToCanvas({ sourceImg, outputCanvas: masterCanvas, orientation },
            (widthToHeightRatio, heightToWidthRatio) => {

                this.setState((state) => {
                    return {
                        sourceImg,
                        masterCanvas,
                        artworkData: { ...state.artworkData, widthToHeightRatio, heightToWidthRatio }
                    }
                });
            })
    }

    onArtworkEditorDataChange(updatedData) {
        this.setState((state) => {
            return {
                unsavedArtworkData: { ...state.unsavedArtworkData, ...updatedData }
            }
        })
    }

    onArtworkEditorSave() {
        // combined saved and unsaved data and update artwork.
        const { artworkData, unsavedArtworkData } = this.state;
        const { artworkId } = this.props;

        if (artworkId) {
            const newArtworkData = {...artworkData, ...unsavedArtworkData};

            this.props.updateArtwork(artworkId, newArtworkData, (returnData) => {
                // console.log("update artwork returnData: ", returnData);
            });
        }
        else {
            console.log("save new artwork");
        }
    }

    render() {
        const { width, height, user } = this.props;
        const { artworkData, unsavedArtworkData, masterCanvas, sourceImg } = this.state;
        const currentArtworkData = { ...artworkData, ...unsavedArtworkData };
        const allowEditing = user.uid && user.uid === artworkData.adminId;

        return (
            <ScrollbarRemover showScrollbars={false}>

                {allowEditing &&
                <QuickArtworkMaker artworkData={currentArtworkData}
                                   onArtworkDataChange={this.onArtworkEditorDataChange}
                                   onArtworkSave={this.onArtworkEditorSave}
                                   sourceImg={sourceImg}
                                   masterCanvas={masterCanvas}/>
                }

                {!allowEditing &&
                <QuickArtwork height={height}
                              width={width}
                              isFixed={true}
                              artworkData={currentArtworkData}
                              masterCanvas={masterCanvas}
                />
                }
            </ScrollbarRemover>
        )
    }
}

const mapStateToProps = (state) => {
    let width = 100, height = 100;
    if (state.ui.windowSize) {
        width = state.ui.windowSize.windowWidth;
        height = state.ui.windowSize.windowHeight;
    }

    return {
        artworks: state.artworks,
        user: state.user,
        width,
        height
    }
};

const mapActionsToProps = { getArtworkDataOnce, updateArtwork };

export default connect(mapStateToProps, mapActionsToProps)(Artwork);

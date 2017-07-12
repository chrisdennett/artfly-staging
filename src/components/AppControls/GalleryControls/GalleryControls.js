import React, { Component } from "react";
import { connect } from 'react-redux';

import { setArtworkToEdit } from '../../Settings/ArtworkEditor/ArtworkEditorActions';

class GalleryControls extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nextArtworkId: null,
            prevArtworkId: null
        };

    }

    componentWillMount(){
        this.setNextAndPreviousIds(this.props);
    }

    // Works out where we are in the gallery so as to set up the next and prev buttons correctly
    componentWillReceiveProps(nextProps) {
        this.setNextAndPreviousIds(nextProps);
    }

    setNextAndPreviousIds(nextProps){
        if (nextProps.artworkIds) {
            const currId = nextProps.artworkId;
            const allIds = Object.keys(nextProps.artworkIds);

            const currIdIndex = allIds.indexOf(currId);
            let prevId = null;
            let nextId = null;

            if (currIdIndex > 0) {
                prevId = allIds[currIdIndex - 1];
            }

            if (allIds.length - 1 > currIdIndex) {
                nextId = allIds[currIdIndex + 1];
            }

            this.setState({ nextArtworkId: nextId, prevArtworkId: prevId })
        }
    }

    onPrevClick() {
        this.goToArtwork(this.state.prevArtworkId);
    }

    onNextClick() {
        this.goToArtwork(this.state.nextArtworkId);
    }

    goToArtwork(artworkId) {
        if (artworkId) {
            this.props.history.push(`/gallery/${this.props.galleryId}/artwork/${artworkId}`);
        }
        else if (!this.state.prevArtworkId) {
            // we're back to the start, go to the entrance
            this.goToGalleryEntrance();
        }
        else if (!this.state.nextArtworkId) {
            // go to exit if we make one, but for now go back the entrance
            this.goToGalleryEntrance();
        }
    }

    goToGalleryEntrance() {
        this.props.history.push(`/gallery/${this.props.galleryId}`);
    }

    onEditArtworkClick(){
        // set artwork to edit id to current artwork id
        //this.props.artworkId
        this.props.setArtworkToEdit(this.props.artworkId);
        this.props.history.push(`/artwork-editor`);
    }

    renderControls() {
        let nextButtonLabel = 'next';
        let prevButtonLabel = 'prev';
        let prevButtonStyles = {};
        let nextButtonStyles = {};
        let galleryButtonStyles = {};
        let editArtworkButtonStyles = { display: 'none'};
        
        if(!this.props.galleryId){
            // only show the next a previous controls inside a gallery
            prevButtonStyles.display = 'none';
            nextButtonStyles.display = 'none';
        }
        else if (!this.props.artworkId) {
            nextButtonLabel = "Enter >";
            prevButtonStyles.display = 'none';
        }
        else {
            if (!this.state.nextArtworkId) {
                nextButtonLabel = 'exit >';
            }
            if (!this.state.prevArtworkId) {
                prevButtonLabel = '< entrance';
            }
        }

        if(this.props.allowArtworkEditing){
            editArtworkButtonStyles = {};
        }

        if(!this.props.galleryId){
            galleryButtonStyles.display = 'none';
        }

        return (
            <span>
                <button style={galleryButtonStyles}
                        onClick={this.goToGalleryEntrance.bind(this)}>Gallery Home</button>

                <button style={prevButtonStyles}
                        onClick={this.onPrevClick.bind(this)}>{prevButtonLabel}</button>

                <button style={nextButtonStyles}
                        onClick={this.onNextClick.bind(this)}>{nextButtonLabel}</button>

                <button style={editArtworkButtonStyles}
                        onClick={this.onEditArtworkClick.bind(this)}>Edit artwork</button>
            </span>
        )
    }

    render() {
        return this.renderControls();
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, { setArtworkToEdit })(GalleryControls);
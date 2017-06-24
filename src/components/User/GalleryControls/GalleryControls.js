import React, { Component } from "react";
import { connect } from 'react-redux';

class GalleryControls extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nextArtworkId: null,
            prevArtworkId: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gallery && nextProps.gallery.artworks) {
            const currId = nextProps.artworkId;
            const allIds = Object.keys(nextProps.gallery.artworks);

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
            this.props.history.push(`/gallery/${this.props.currentGalleryId}/artwork/${artworkId}`);
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
        let galleryId = this.props.galleryId;
        if(!galleryId){
            galleryId = this.props.currentGalleryId;
        }
        this.props.history.push(`/gallery/${galleryId}`);
    }

    renderControls() {
        let nextButtonLabel = 'next';
        let prevButtonLabel = 'prev';
        let prevButtonStyles = {};
        let nextButtonStyles = {};
        let galleryButtonStyles = {};

        if(!this.props.currentGalleryId){
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

        if(!this.props.galleryId){
            galleryButtonStyles.display = 'none';
        }

        return (
            <span>
                <button style={galleryButtonStyles}
                        onClick={this.goToGalleryEntrance.bind(this)}>My Gallery</button>
                <button style={prevButtonStyles}
                        onClick={this.onPrevClick.bind(this)}>{prevButtonLabel}</button>
                <button style={nextButtonStyles}
                        onClick={this.onNextClick.bind(this)}>{nextButtonLabel}</button>
            </span>
        )
    }

    render() {
        return this.renderControls();
    }
}

function mapStateToProps(state) {
    return {
        galleryControls: state.galleryControls,
        gallery: state.gallery
    }
}

export default connect(mapStateToProps, {})(GalleryControls);
// externals
import React, { Component } from 'react';
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges } from '../../actions/UserDataActions';
// helpers
import { calculateArtworkSizes } from './assets/ArtworkCalculations';
// components
import Artwork from './Artwork';

class ArtworkHolder extends Component {

    constructor() {
        super();

        this.state = { imageLoading: true };

        // this.loadImage = this.loadImage.bind(this);
        this.setupArtwork = this.setupArtwork.bind(this);
        this.calculateArtworkData = this.calculateArtworkData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.artworkId !== nextProps.artworkId) {
            this.props.listenForArtworkChanges(nextProps.artworkId);
        }

        if (nextProps.artwork) {
            this.setupArtwork(nextProps.artwork);
        }
    }

    componentDidMount() {
        this.props.listenForArtworkChanges(this.props.artworkId);
        if (this.props.artwork) {
            this.setupArtwork(this.props.artwork);
        }
    }

    setupArtwork(artwork) {
        if (artwork.artistId !== this.state.currentArtworkId) {
            this.setState({ imageLoading: true }, () => {
                // this.loadImage(nextProps.artwork.url);
                this.calculateArtworkData(artwork);
            });
        }
    }

    calculateArtworkData(artwork) {
        const { width, height } = this.props;
        const { widthToHeightRatio, heightToWidthRatio } = artwork;

        let artworkData = calculateArtworkSizes(width, height, widthToHeightRatio, heightToWidthRatio)

        //source:   3000x3000 (max)
        //large:    960x960
        //medium:   640x640
        //thumb:    150x150
        const { url, url_large, url_med, thumb_url } = artwork;
        let artworkUrl;
        const largestImgEdge = artworkData.imgWidth > artworkData.imgHeight ? artworkData.imgWidth : artworkData.imgHeight;
        if (largestImgEdge <= 150 && thumb_url) {
            artworkUrl = thumb_url;
        }
        else if (largestImgEdge <= 640 && url_med) {
            artworkUrl = url_med;
        }
        else if (largestImgEdge <= 960 && url_large) {
            artworkUrl = url_large;
        }
        else {
            artworkUrl = url;
        }
        let img = new Image();
        img.src = artworkUrl;
        img.onload = (e) => {
            artworkData.imgSrc = e.target.src;
            this.setState({ artworkData, imageLoading: false, currentArtworkId: artwork.artworkId })
        }
    }

    render() {
        const { artwork, width, height, allowScrollbars } = this.props;
        if (!artwork || !width || !height) {
            return <div>Artwork Loading...</div>
        }

        const { artworkData, imageLoading } = this.state;

        return <Artwork artwork={artwork}
                        width={width}
                        height={height}
                        artworkData={artworkData}
                        allowScrollbars={allowScrollbars}
                        imageLoading={imageLoading}/>;
    }
}

// Map state to props maps to the intermediary component which uses or passes them through
const mapStateToProps = (state, ownProps) => {
    let width, height;
    if (state.ui.windowSize) {
        width = ownProps.width ? ownProps.width : state.ui.windowSize.windowWidth;
        height = ownProps.height ? ownProps.height : state.ui.windowSize.windowHeight;
    }

    return {
        artwork: state.artworks[ownProps.artworkId],
        width: width,
        height: height
    }
};
const mapActionsToProps = { listenForArtworkChanges };

export default connect(mapStateToProps, mapActionsToProps)(ArtworkHolder);

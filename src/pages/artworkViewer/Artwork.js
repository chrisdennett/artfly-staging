import React from 'react';
import ImageLoader from '../gallery/ImageLoader';
import ArtworkLabel from '../../components/artworkLabel/ArtworkLabel';

class Artwork extends React.Component {

    constructor(props) {
        super(props);

        this.state = { loadedImageHeight: null, loadedImageWidth: null };
    }

    render() {
        const { dimensions, artwork } = this.props;
        const { loadedImageHeight, loadedImageWidth } = this.state;

        if (!artwork || !dimensions) return null;

        const imgPadding = 20;
        const { top = 0, left = 0, width, height } = dimensions;

        let showLabel = artwork.artist || artwork.title || artwork.age;
        let labelHeight = showLabel ? height * 0.17 : 0;

        const { outputHeightToWidthRatio, outputWidthToHeightRatio } = artwork;
        const { w, h, x, y } = getArtworkDimensions({
            loadedImageWidth,
            loadedImageHeight,
            availableHeight: height - labelHeight - (imgPadding * 2),
            availableWidth: width - (imgPadding * 2),
            hToWRatio: outputHeightToWidthRatio,
            wToHRatio: outputWidthToHeightRatio,
        });

        const imgStyle = {
            position: 'absolute',
            top: top + y + imgPadding,
            left: left + x + imgPadding,
            height: h,
            width: w,
            textAlign: 'center',
        }

        return <div>
            <div style={imgStyle}>

                <ImageLoader url={artwork ? artwork.largeUrl : null}
                    onImgLoaded={({ w, h }) => this.setState({ loadedImageHeight: h, loadedImageWidth: w })}
                />

                {
                    showLabel &&
                    <div className={'artworkLabelHolder'}>
                        <ArtworkLabel artist={artwork.artist}
                            age={artwork.age}
                            title={artwork.title} />
                    </div>
                }
            </div>
        </div>
    }
}

export default Artwork;

const getArtworkDimensions = ({ availableHeight, availableWidth, hToWRatio, wToHRatio, loadedImageHeight, loadedImageWidth }) => {

    const maxW = loadedImageWidth ? Math.min(availableWidth, loadedImageWidth) : availableWidth;
    const maxH = loadedImageHeight ? Math.min(availableHeight, loadedImageHeight) : availableHeight;

    let w = maxW;
    let h = w * wToHRatio;

    if (h > maxH) {
        h = maxH;
        w = h * hToWRatio;
    }

    const x = (availableWidth - w) / 2;
    const y = (availableHeight - h) / 2;

    return { w, h, x, y };
}
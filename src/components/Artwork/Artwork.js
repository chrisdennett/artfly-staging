import React, { Component } from "react";
import PropTypes from 'prop-types';

class Artwork extends Component {

    constructor(props) {
        super(props);
        this.state = { imageLoading: false };
    }

    componentWillMount() {
        this.setState({ imageLoading: true });
    }

    onImageLoad() {
        this.setState({ imageLoading: false });
    }

    render() {
        const { artwork } = this.props;

        let imgStyle = {
            width: '100%',
            height: 'auto'
        };

        if (this.state.imageLoading) {
            imgStyle.display = 'none';
        }

        // const { url, url_large, url_med, url_thumb } = artwork;
        const { url, url_large } = artwork;
        // set the image url to the full sized source image
        let artworkUrl = url;
        // if the large one has been created use that instead
        // TODO if the image area is smaller than the medium sized image use that instead
        if (url_large) {
            artworkUrl = url_large;
        }

        return (
            <div>
                <h1>Artwork</h1>
                {this.state.imageLoading
                    ? <div>Loading artwork...</div>
                    : ""
                }

                <img alt="user artwork" onLoad={this.onImageLoad.bind(this)} style={imgStyle} src={artworkUrl}/>
            </div>
        )
    }
}

Artwork.propTypes = {
    artwork: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
};

export default Artwork;
import React, { Component } from "react";
import PropTypes from 'prop-types';

class Artwork extends Component {

    constructor(props){
        super(props);
        this.state = {imageLoading:false};
    }

    componentWillMount() {
        this.setState({imageLoading:true});
    }

    componentWillReceiveProps(nextProps) {
        const currentArtwork = this.props.artwork;
        const nextArtwork = nextProps.artwork;

        if (currentArtwork !== nextArtwork) {
            this.setState({imageLoading:true});
        }
    }

    onImageLoad() {
        this.setState({imageLoading:false});
    }

    render() {
        const {artwork} = this.props;

        let imgStyle = {
            width: '100%',
            height: 'auto'
        };

        if(!artwork || this.state.imageLoading){
            imgStyle.display = 'none';
        }

        return (
            <div>
                <h1>Artwork</h1>
                {!artwork || this.state.imageLoading
                    ? <div>Loading artwork...</div>
                    : ""
                }

                {!artwork
                    ? ""
                    : <img alt="user artwork" onLoad={this.onImageLoad.bind(this)} style={imgStyle} src={artwork.url}/>
                }
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchArtwork } from '../actions';

class Artwork extends Component {

    componentDidMount() {
        const { artworkId } = this.props.match.params;
        this.props.fetchArtwork(artworkId);
    }

    componentWillReceiveProps(nextProps) {
        const { artworkId } = this.props.match.params;
        const nextArtworkId = nextProps.match.params.artworkId;

        if (artworkId !== nextArtworkId) {
            this.props.fetchArtwork(nextArtworkId);
        }
    }

    render() {
        const { currentArtwork } = this.props;


        if (!currentArtwork || !currentArtwork.imgRef) {
            return <div>Loading currentArtwork...</div>
        }

        let rotation = currentArtwork.rotation;
        let scaleFactor, scaledHeight, scaledWidth, imgWAfterRotation, imgHAfterRotation;
        if (!rotation) rotation = 0;
        if (rotation === 0 || rotation === 180) {
            imgWAfterRotation = currentArtwork.imgWidth;
            imgHAfterRotation = currentArtwork.imgHeight;
        }
        else {
            imgWAfterRotation = currentArtwork.imgHeight;
            imgHAfterRotation = currentArtwork.imgWidth;
        }

        scaleFactor = window.innerWidth / imgWAfterRotation;
        scaledHeight = imgHAfterRotation * scaleFactor;
        if (scaledHeight > window.innerHeight) scaleFactor = window.innerHeight / imgHAfterRotation;

        scaledWidth = Math.round(imgWAfterRotation * scaleFactor);
        scaledHeight = Math.round(imgHAfterRotation * scaleFactor);

        // let imgUrl = "https://firebasestorage.googleapis.com/v0/b/art-blam.appspot.com/o/userContent%2FRAj7f1WqphUMntmK2ar6wfzEFxe2%2F465962744.jpg?alt=media&token=944265d2-84a6-441d-a9f2-e0d96abb849b";
        const imgUrl = encodeURIComponent(currentArtwork.url);

        /*
         Build url ref: http://cloudinary.com/documentation/image_transformation_reference
         http://res.cloudinary.com/demo/image/upload/
         w_220,h_140,c_fill/l_brown_sheep,w_220,h_140,c_fill,x_220/l_horses,w_220,h_140,c_fill,y_140,x_-110/l_white_chicken,w_220,h_140,c_fill,y_70,x_110/l_butterfly.png,h_200,x_-10,a_10/w_400,h_260,c_crop,r_20/l_text:Parisienne_35_bold:Memories from our trip,co_rgb:990C47,y_155/e_shadow/yellow_tulip.jpg

         effects:
         e_cartoonify:20:60
         e_negate
         e_vibrance:70
         e_auto_brightness
         e_auto_color
         e_auto_contrast
         */

        return (
            <div>
                <h1>Artwork</h1>
                <img
                    src={`https://res.cloudinary.com/artfly/image/fetch/w_${scaledWidth},h_${scaledHeight},a_${rotation}/${imgUrl}`}
                    alt="artist Holly"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentArtwork: state.currentArtwork
    }
}

export default connect(mapStateToProps, { fetchArtwork })(Artwork);
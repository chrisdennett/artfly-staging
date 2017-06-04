import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchArtwork } from '../actions';

class ArtworkEditing extends Component {

    componentDidMount() {
        const { artworkId } = this.props.match.params;
        console.log("artworkId: ", artworkId);
        this.props.fetchArtwork(artworkId, () => {
            console.log("this.props: ", this.props);
        });
    }

    render() {
        const { artwork } = this.props;

        // Wait for the artwork data to be in state
        if (!artwork || !artwork.imgRef) {
            return <div>Loading artwork...</div>
        }

        // if the artwork owner doesn't match the user id redirect to the artwork
        const { userAuth } = this.props;
        if(!userAuth || artwork.owner !== userAuth.uid){

            const { artworkId } = this.props.match.params;

            return (
                <div>
                    return (<Redirect to={`/artwork/${artworkId}`}/>)
                </div>
            )
        }

        return (
            <div>
                <h1>Artwork Editing Authorised</h1>
                <div>
                    <img src={`https://res.cloudinary.com/artfly/image/upload/w_${300},h_${300}/${artwork.imgRef}.jpg`}
                         alt="artist Holly"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        artwork: state.currentArtwork,
        userAuth: state.userAuth
    }
}

export default connect(mapStateToProps, { fetchArtwork })(ArtworkEditing);
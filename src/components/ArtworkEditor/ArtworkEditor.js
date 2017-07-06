import React, { Component } from "react";
import { connect } from 'react-redux';

class ArtworkEditor extends Component {

    render() {
        const { id } = this.props.artworkToEdit;
        let imgUrl = "";
        let altText = "";

        if (id) {
            if (this.props.artworks[id]) {
                // TODO: The artist here is just the id, need to get the artists list as well.
                const { url, artist } = this.props.artworks[id];

                imgUrl = url;
                altText = `Artwork by ${artist}`
            }
        }


        return (
            <div>
                <h1>ArtworkEditor</h1>
                <p>Artwork to edit: {this.props.artworkToEdit.id}</p>
                <div style={{width:'50%'}}>
                    <img style={{width:'100%'}} src={imgUrl} alt={altText}/>
                </div>
                <button>Edit Image</button>
                <hr />
                <button>DONE</button>
                <button>Cancel changes</button>
                <button>Delete Image</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        artworkToEdit: state.artworkToEdit,
        artworks: state.artworks
    }
}

export default connect(mapStateToProps, {})(ArtworkEditor);
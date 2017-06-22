import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

            if(currIdIndex > 0){
                prevId = allIds[currIdIndex-1];
            }

            if(allIds.length-1 > currIdIndex){
                nextId = allIds[currIdIndex+1];
            }

            this.setState({nextArtworkId:nextId, prevArtworkId:prevId})
        }
    }

    getNav(){
        let prevLink = <span>Prev</span>;
        let nextLink = <span>Next</span>;

        if(this.state.prevArtworkId){
            prevLink = <Link to={`${this.state.prevArtworkId}`}>Prev</Link>
        }

        if(this.state.nextArtworkId){
            nextLink = <Link to={`${this.state.nextArtworkId}`}>Next</Link>
        }

        return (
            <span>
                {prevLink}
                {nextLink}
            </span>
        )
    }

    render() {
        return this.getNav();
    }
}

function mapStateToProps(state) {
    return {
        galleryControls: state.galleryControls,
        gallery: state.gallery
    }
}

export default connect(mapStateToProps, {})(GalleryControls);
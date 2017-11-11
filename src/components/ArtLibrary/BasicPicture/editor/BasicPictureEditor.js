// externals
import React, { Component } from "react";
import { connect } from 'react-redux';
// actions
import { listenForArtworkChanges, listenForArtistChanges } from '../../../../actions/UserDataActions';
import Butt from "../../../global/Butt";

class BasicPictureEditor extends Component {

    constructor(){
        super();

        this.onDone = this.onDone.bind(this);
        this.onCancelChanges = this.onCancelChanges.bind(this);
        this.onDeleteArtwork = this.onDeleteArtwork.bind(this);
        this.onEditArtist = this.onEditArtist.bind(this);
        this.onEditPhoto = this.onEditPhoto.bind(this);

        this.state = {editingPhoto:false, editingArtist:false}
    }

    componentDidMount() {
        this.props.listenForArtworkChanges(this.props.artworkId);
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps: ", nextProps);
        if(!this.props.artist && nextProps.artwork){
            this.props.listenForArtistChanges(nextProps.artwork.artistId);
        }
    }

    onEditPhoto(){
        this.setState({editingPhoto:true});
    }

    onEditArtist(){
        this.setState({editingArtist:true});
    }

    onDone(){

    }

    onCancelChanges(){

    }


    onDeleteArtwork(){

    }

    render() {
        if(!this.props.artwork || !this.props.artist) return null;
        console.log("this.props.artwork: ", this.props.artwork);


        const {thumb_url} = this.props.artwork;
        const {artist} = this.props;
        console.log("thumb_url: ", thumb_url);

        return (
            <div>
                <h3>Basic Picture Editor</h3>
                <img src={thumb_url} alt={'Current artwork thumb'} />
                <Butt label={'Edit Photo'} onClick={this.onEditPhoto}/>
                <p>artist: {`${artist.firstName} ${artist.lastName}` }</p>

                <Butt label={'Edit Artist'} onClick={this.onEditArtist}/>
                <hr/>
                <Butt label={'Done'} onClick={this.onDone}/>
                <Butt label={'Cancel'} onClick={this.onCancelChanges}/>
                <Butt label={'Delete Artwork'}
                      backgroundColour={'#920000'}
                      shadowColour={'#540000'}
                      onClick={this.onDeleteArtwork}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentArtwork = state.artworks[ownProps.artworkId];
    let artist;
    if(currentArtwork){
        artist = state.artists[currentArtwork.artistId]
    }

    return {
        artwork: currentArtwork,
        artist: artist
    }
};

const mapActionsToProps = { listenForArtworkChanges, listenForArtistChanges };

export default connect(mapStateToProps, mapActionsToProps)(BasicPictureEditor);
// externals
import React, { Component } from "react";
// components
import ArtistSelector from "../ArtistSelector/ArtistSelector";
import Butt from "../global/Butt";

/*
* Display the current artist name
* - have a button to edit
* - save edit on change
* - display a saving message
* - display the updated value
*/

class InlineArtistUpdater extends Component {

    constructor() {
        super();

        this.onEditArtist = this.onEditArtist.bind(this);
        this.onArtistSelected = this.onArtistSelected.bind(this);

        this.state = { inEditMode: false }
    }


    onEditArtist() {
        this.setState({ inEditMode: true });
    }

    onArtistSelected(artistSelected){
        // show saving message first, then show the updated artist
        console.log("artistSelected: ", artistSelected);
        this.setState({ inEditMode: false });
    }

    render() {
        const { artist } = this.props;

        if(this.state.inEditMode){
            return (
                <div>
                    <h5>Inline Artist Updater</h5>
                    <ArtistSelector initialArtistId={artist.artistId} onArtistSelected={this.onArtistSelected}/>
                </div>
            )
        }

        return (
            <div>
                <h5>Inline Artist Updater</h5>
                <p>artist: {`${artist.firstName} ${artist.lastName}`}</p>

                <Butt label={'Edit Artist'} onClick={this.onEditArtist}/>
            </div>
        );
    }
}

export default InlineArtistUpdater;
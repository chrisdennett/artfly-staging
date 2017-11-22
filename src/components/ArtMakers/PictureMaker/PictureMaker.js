// externals
import React, { Component } from "react";
// components
import EditPicture from "./EditPicture";
import AddPicture from "./AddPicture";

class ArtMaker extends Component {

    constructor() {
        super();

        this.getCurrentView = this.getCurrentView.bind(this);

        this.state = { isSaving: false, isLoading: false };
    }

    getCurrentView() {
        const { userId, artwork, artworkId, selectedArtistId, currentEditScreen, artist } = this.props;
        const { isSaving, isLoading, hasError } = this.state;

        let view = null;

        // If id is 'new' set up to add a new artwork
        if (isSaving) {
            view = (<div>Saving artwork...</div>)
        }
        else if (isLoading) {
            view = <div>Loading artwork</div>
        }
        else if (hasError) {
            view = <div>Sorry, there's been an error: [put error message here...]</div>
        }
        else if (artworkId === 'new') {
            view = <AddPicture userId={userId}
                               selectedArtistId={selectedArtistId}/>
        }
        else if (artwork) {
            view = <EditPicture currentEditScreen={currentEditScreen}
                                userId={userId}
                                artist={artist}
                                artworkId={artworkId}
                                artwork={artwork}/>;
        }
        return view;
    }

    render() {
        return this.getCurrentView();
    }
}


export default ArtMaker;
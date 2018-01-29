import React, { Component } from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/fontawesome-free-solid';
// comps
import Butt from "../global/Butt/Butt";
import ArtistEditorContainer from "../ArtistEditor/ArtistEditorContainer";

class AddNewArtist extends Component {

    constructor(props) {
        super(props);

        this.onAddNewArtistClick = this.onAddNewArtistClick.bind(this);
        this.onAddNewArtistComplete = this.onAddNewArtistComplete.bind(this);
        this.onAddNewArtistCancel = this.onAddNewArtistCancel.bind(this);

        this.state = { isOpen: false };
    }

    onAddNewArtistClick() {
        this.setState({ isOpen: true });
    }

    onAddNewArtistComplete(){
        this.setState({ isOpen: false });
    }

    onAddNewArtistCancel() {
        this.setState({ isOpen: false });
    }

    render() {
        const { isOpen } = this.state;

        return (
            <div>
                {!isOpen &&
                <Butt onClick={this.onAddNewArtistClick}
                      svgIcon={<FontAwesomeIcon icon={faPlusSquare}/>}>
                    Add New Artist
                </Butt>
                }

                {isOpen &&
                <div>
                    <h3>Add new artist:</h3>
                    <ArtistEditorContainer onComplete={this.onAddNewArtistComplete}
                                           onCancel={this.onAddNewArtistCancel}/>
                </div>
                }
            </div>
        );
    }
}

export default AddNewArtist;
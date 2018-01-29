import React, { Component } from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAddressCard, faBuilding } from '@fortawesome/fontawesome-free-solid';
// comps
import Link from "../global/Butt/Link";
import Butt from "../global/Butt/Butt";
import ArtistEditorContainer from "../ArtistEditor/ArtistEditorContainer";

class ArtistCard extends Component {

    constructor(props) {
        super(props);

        this.state = { editorIsOpen: false };

        this.onEditArtistClick = this.onEditArtistClick.bind(this);
        this.onArtistEditorComplete = this.onArtistEditorComplete.bind(this);
        this.onArtistEditorCancel = this.onArtistEditorCancel.bind(this);
    }

    onEditArtistClick(){
        this.setState({editorIsOpen:true})
    }

    onArtistEditorComplete(){
        this.setState({editorIsOpen:false})
    }

    onArtistEditorCancel(){
        this.setState({editorIsOpen:false})
    }

    render() {
        const {artist} = this.props;
        const { editorIsOpen } = this.state;

        return (
            <div className='yourArtists--artistCard'
                 style={{ display: 'inline-block' }}>

                {!editorIsOpen &&
                <div className={'yourArtists--artistCard--artistInfo'}>
                    <div className='yourArtists--artistCard--nameBox'>
                        {artist.firstName} {artist.lastName}
                    </div>

                    <Link linkTo={`/gallery/${artist.artistId}`}>
                        <Butt yellow svgIcon={<FontAwesomeIcon icon={faBuilding}/>}>
                            Open Gallery
                        </Butt>
                    </Link>

                    <Butt onClick={this.onEditArtistClick} blue svgIcon={<FontAwesomeIcon icon={faAddressCard}/>}>
                        Edit Artist
                    </Butt>

                    <p>Total artworks: {artist.totalArtworks}</p>
                </div>
                }

                {editorIsOpen &&
                <ArtistEditorContainer artist={artist}
                                       onComplete={this.onArtistEditorComplete}
                                       onCancel={this.onArtistEditorCancel}/>
                }

            </div>
        );
    }
}

export default ArtistCard;
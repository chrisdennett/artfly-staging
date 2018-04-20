import React, { Component } from "react";
import * as faTrashAlt from "@fortawesome/fontawesome-pro-solid/faTrashAlt";
// styles
import './deleteArtworkPanel_styles.css';
import FontAwesomeButt from "../../global/Butt/FontAwesomeButt";

class DeleteArtworkPanel extends Component {

    render() {
        const {artworkId, onArtworkDelete, onArtworkDeleteCancel} = this.props;

        return (
            <div className={'deleteArtworkPanel'}>
                <div className={'deleteArtworkPanel--box'}>
                    <p>Are you super duper sure you want to delete this artwork?</p>
                    <div className={'deleteArtworkPanel--box--buttons'}>
                        <FontAwesomeButt icon={faTrashAlt}
                                         onClick={() => {onArtworkDelete(artworkId)}}
                                         style={{ flex:1, backgroundColor: '#ac364c', marginRight: 10, color:'white', border: '2px solid rgba(0, 0, 0, 0.5)' }}
                                         label={'Delete'}/>
                        <FontAwesomeButt icon={faTrashAlt}
                                         onClick={onArtworkDeleteCancel}
                                         style={{ flex:1, backgroundColor: '#ffffff', border: '2px solid rgba(0, 0, 0, 0.5)' }}
                                         label={'Keep'}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteArtworkPanel;